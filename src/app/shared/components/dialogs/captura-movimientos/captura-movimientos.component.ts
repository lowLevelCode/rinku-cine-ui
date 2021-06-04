import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize, map, startWith } from 'rxjs/operators';
import { EmployeeRolEnum } from 'src/app/enums/employee-rol.emun';
import { Pagination } from 'src/app/interfaces/pagination';
import { BitacoraEntregas, updateBitacoraEntregas } from 'src/app/models/bitacora-entregas';
import { Employee } from 'src/app/models/employee';
import { EmployeeRol } from 'src/app/models/employee-rol';
import { EmployeeType } from 'src/app/models/employee-type';
import { BitacoraEntregasService } from 'src/app/services/bitacora-entregas.service';
import { EmployeeRolService } from 'src/app/services/employee-rol.service';
import { EmployeeTypeService } from 'src/app/services/employee-type.service';
import { PopupDialogsService } from 'src/app/services/popup.dialogs.service';
import { SweetAlertResult } from 'sweetalert2';
import * as moment from 'moment';

export interface Month {
  number:number;
  text:string;
}
@Component({
  selector: 'app-captura-movimientos',
  templateUrl: './captura-movimientos.component.html',
  styleUrls: ['./captura-movimientos.component.scss']
})
export class CapturaMovimientosComponent implements OnInit {  
  displayedColumns: string[] = ['folio','fecha','cantidadEntregas','rol','tipo','cubrioTurno','actions'];
  dataSource!:MatTableDataSource<any>;
  meses:Month[]= [
    {number:0, text:"Enero"},
    {number:1, text:"Febrero"},
    {number:2, text:"Marzo"},
    {number:3, text:"Abril"},
    {number:4, text:"Mayo"},
    {number:5, text:"Junio"},
    {number:6, text:"Julio"},
    {number:7, text:"Agosto"},
    {number:8, text:"Septiembre"},
    {number:9, text:"Octubre"},
    {number:10, text:"Noviembre"},
    {number:11, text:"Diciembre"},
  ];

  mesControl:FormControl = new FormControl();

  employeesRol$!:Observable<EmployeeRol[]>;
  employeesType$!:Observable<EmployeeType[]>;
  employees$!:Observable<Partial<Employee>[]>;  

  form!:FormGroup;
  hayMovimientos!:boolean;
  isAuxiliar!:boolean;
  rowSelected:any;
  onModificarMovimiento!:boolean;
  mesSelected!:string;

  constructor(
    public dialogRef: MatDialogRef<CapturaMovimientosComponent>,
    private readonly _fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public employee: Employee,
    private readonly _employeeRolService:EmployeeRolService,
    private readonly _employeeTypeService:EmployeeTypeService,    
    private readonly _bitacoraEntregasService:BitacoraEntregasService,
    private readonly _spinner: NgxSpinnerService,
    private readonly _popupService:PopupDialogsService,) {}

  ngOnInit(): void {
    this.dialogRef.disableClose= true;
    this.employeesRol$ = this._employeeRolService.getAllRols().pipe(map(result => result));
    this.employeesType$ = this._employeeTypeService.getAllTypes().pipe(map(result => result));     

    this.form = this._fb.group({
      rol:[''],
      tipo:[''],
      fechaMovimiento:['', Validators.required],
      cantidadEntregas:['',Validators.required],
      cubrioTurno:[''],
    });    

    this._getLastMovimientos();    

    this.isAuxiliar = this.employee.employeeRol.id === EmployeeRolEnum.AUXILIAR;

    this.mesControl.valueChanges.subscribe(data=>{      
      const mes = this.meses.find(m=>m.number == data);
      this.mesSelected = mes?.text || '';
    });

    this.mesControl.setValue(moment().month());
  }

  private _getLastMovimientos(){
    this._bitacoraEntregasService.getBitacoraByEmployeeId(this.employee.id)
    .subscribe((pagination:Pagination<BitacoraEntregas[]>)=>{
      this.hayMovimientos = pagination.items.length > 0;  
      this.dataSource = new MatTableDataSource(pagination.items);      
    });
  }

  /** Funcion para darle displayWith al autocomplete */
  getOptionText(employee:Employee) {
    return employee?.nombre; 
  }

  onSelectRow(row:BitacoraEntregas){
    this.form.get("fechaMovimiento")?.setValue(row.fechaCaptura);
    this.form.get("cantidadEntregas")?.setValue(row.cantidadEntregas);
    this.rowSelected = row;
    this.onModificarMovimiento = true;
  }

  onDeshacer() {
    this._cleanInputs();
    this.rowSelected = null;
    this.onModificarMovimiento = false;
  }

  onCalcularSalario() {
    
  }

  onSubmit() {
    const isNotDirty = this.form.pristine;

    if(this.form.invalid) {
      this._popupService.topEndError("Fomulario invalido");
      return;
    }

    if(isNotDirty) {
      this._popupService.topEndWarn("El formulario no ha sido modificado");
      return;
    }

    const movimiento:Partial<BitacoraEntregas> = {
      idEmployee: this.employee.id,
      rolId:this.employee.employeeRolId, 
      tipoId: this.employee.employeeTypeId,
      cantidadEntregas : this.form.get("cantidadEntregas")?.value,
      fechaCaptura : this.form.get("fechaMovimiento")?.value,
    };
    
    if(this.onModificarMovimiento ){
      const id = this.rowSelected.id;

      const updateBitacora:updateBitacoraEntregas = {
        cantidadEntregas: this.form.get("cantidadEntregas")?.value
      }
      
      this._modificarMovimiento(id,updateBitacora) 
    }else{
      this._createMovimento(movimiento);
    }

  }

  async onDeleteMovimiento(id:number){
    const result:SweetAlertResult = await this._popupService.confirmWarnDelete("Este movimiento de eliminará de manera definitiva");
    if(result.isConfirmed) {
      this._bitacoraEntregasService.deleteMovimiento(id)
      .pipe(finalize(()=>{ this._spinner.hide(); }))
      .subscribe(
        async (result) => {
          await this._popupService.topEndSuccess("Movimiento Eliminado definitivamente");
          this._refreshDataTable();
        },
        err=>{
          const {error:{message}} = err;
          this._popupService.topEndError(message);        
        }
      );
    }
  }

  private _createMovimento(movimiento:Partial<BitacoraEntregas>){
    this._spinner.show();
    this._bitacoraEntregasService.createMovimiento(movimiento)
    .pipe(finalize(()=>{ this._spinner.hide(); }))
    .subscribe(
      async (result) => {
        await this._popupService.topEndSuccess("Movimiento Creado");
        this._refreshDataTable();
      },
      err=>{
        const {error:{message}} = err;
        this._popupService.topEndError(message);        
      }
    );
  }

  private _modificarMovimiento(id:number,updateBitacora:updateBitacoraEntregas){
    this._spinner.show();
    this._bitacoraEntregasService.updateMovimiento(id,updateBitacora)
    .pipe(finalize(()=>{ this._spinner.hide(); }))
    .subscribe(
      async (result) => {
        await this._popupService.topEndSuccess("Movimiento editado");
        this._refreshDataTable();
      },
      async (err)=>{
        const {error:{message}} = err;
        await this._popupService.topEndError(message);

      }
    );
  }
  
  private _cleanInputs() {
    this.form.reset();
    this.form.markAsPristine();
  }
  private _refreshDataTable() {
    this._getLastMovimientos();
    this._cleanInputs();
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
import { EmployeesService } from 'src/app/services/employees.service';
import { PopupDialogsService } from 'src/app/services/popup.dialogs.service';

@Component({
  selector: 'app-captura-movimientos',
  templateUrl: './captura-movimientos.component.html',
  styleUrls: ['./captura-movimientos.component.scss']
})
export class CapturaMovimientosComponent implements OnInit {
  displayedColumns: string[] = ['folio','fecha','cantidadEntregas','rol','tipo','cubrioTurno'];
  dataSource!:MatTableDataSource<any>;

  employeesRol$!:Observable<EmployeeRol[]>;
  employeesType$!:Observable<EmployeeType[]>;
  employees$!:Observable<Partial<Employee>[]>;  

  form!:FormGroup;
  hayMovimientos!:boolean;
  isAuxiliar!:boolean;
  rowSelected:any;
  onModificarMovimiento!:boolean;
  
  constructor(
    private readonly _fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public employee: Employee,
    private readonly _employeeRolService:EmployeeRolService,
    private readonly _employeeTypeService:EmployeeTypeService,
    private readonly _employee:EmployeesService,
    private readonly _bitacoraEntregasService:BitacoraEntregasService,
    private readonly _spinner: NgxSpinnerService,
    private readonly _popupService:PopupDialogsService,) {}

  ngOnInit(): void {
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

    // this._bitacoraEntregasService.getBitacoraByEmployeeIdAndDateRange(id)
    // .subscribe((bitacora:BitacoraEntregas[]) => {
    //   this.hayMovimientos = bitacora.length > 0;  
    //   this.dataSource = new MatTableDataSource(bitacora);      
    // });


    this.isAuxiliar = this.employee.employeeRol.id === EmployeeRolEnum.AUXILIAR;

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

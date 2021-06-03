import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime, finalize, map } from 'rxjs/operators';
import { DialogEnum } from 'src/app/enums/dialog.enum';
import { EditCreateDialogData } from 'src/app/interfaces/edit-create-dialog-data';
import { Pagination } from 'src/app/interfaces/pagination';
import { Employee } from 'src/app/models/employee';
import { EmployeesService } from 'src/app/services/employees.service';
import { PopupDialogsService } from 'src/app/services/popup.dialogs.service';
import { CapturaMovimientosComponent } from 'src/app/shared/components/dialogs/captura-movimientos/captura-movimientos.component';
import { EditCreateEmployeeComponent } from 'src/app/shared/components/dialogs/edit-create-employee/edit-create-employee.component';
import { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  filter:FormControl = new FormControl();  
  paginationData!:Pagination<Partial<Employee>[]>;

  displayedColumns: string[] = ['empleado','rol','tipo', 'actions'];
  data!:MatTableDataSource<any>;

  constructor(
    private readonly _employeesService:EmployeesService,
    private readonly _dialog:MatDialog,
    private readonly _spinner: NgxSpinnerService,
    private readonly _popupService:PopupDialogsService) { }

  ngOnInit(): void {

    this._getAndSetEmployees();

    this.filter.valueChanges
    .pipe(debounceTime(500)) // consulta 500 milisegungos despues de que deja de teclear el usuario
    .subscribe(data => {      
      this._getAndSetEmployees(data);
    });
  }

  private _getAndSetEmployees(keyword:string = ""){
    this._spinner.show();
    this._employeesService.getEmployees().pipe(
      finalize(()=>{ this._spinner.hide(); })
    ).subscribe((pagination:Pagination<Partial<Employee>[]>) => {
      const employees = pagination.items;      
      this.data = new MatTableDataSource(employees);      
    });
  }

  private _refreshData() {
    this._getAndSetEmployees();
    this.filter.setValue('', { emitEvent:false });
  }


  addNewEmployee() {
    const dialog = this._dialog.open(EditCreateEmployeeComponent,{
      width:"55%",
      height:"95%",
      data:<EditCreateDialogData>{
        title:"Nuevo Empleado"
      }
    });

    dialog.beforeClosed().subscribe(result=>{ 
      if(result === DialogEnum.ON_REFRESH_BY_DIALOG)
        this._refreshData();
     });
  }

  deleteSelectedEmployees(){
    alert("elimina varios empleados");
  }

  async deleteEmployeeById(employee:Employee) {    
    const result:SweetAlertResult = 
    await this._popupService.confirmWarnDelete(`Se eliminará el empleado: ${employee.nombre}`);

    if(result.isConfirmed){
      this._spinner.show();
      this._employeesService.deleteEmployeeById(employee.id).pipe(
        finalize(()=>{ this._spinner.hide(); })
      ).subscribe(
        async (result) =>{
          await this._popupService.topEndSuccess("Empleado Eliminado");
          this._refreshData();
        },
        err => {
          const {error:{message}} = err
          this._popupService.topEndError(message);
        }
      );
    }
  }

  editEmployeeById(employee:Employee){
    const dialog = this._dialog.open(EditCreateEmployeeComponent,{
      width:"55%",
      height:"95%",
      data:<EditCreateDialogData>{
        title:"Editar Empleado",
        employee
      }
    });

    dialog.beforeClosed().subscribe(result=>{            
      if(result === DialogEnum.ON_REFRESH_BY_DIALOG){
        this._refreshData();
      }
    });
  }

  onMovimientos(employee:Employee){
    this._dialog.open(CapturaMovimientosComponent,{
      width:"55%",
      height:"95%",
      data:employee
    });
  }
}
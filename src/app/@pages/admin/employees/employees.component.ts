import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, map } from 'rxjs/operators';
import { EditCreateDialogData } from 'src/app/interfaces/edit-create-dialog-data';
import { Employee } from 'src/app/models/employee';
import { EmployeesService } from 'src/app/services/employees.service';
import { EditCreateEmployeeComponent } from 'src/app/shared/components/dialogs/edit-create-employee/edit-create-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  filter:FormControl = new FormControl();
  employees!:Employee[];

  displayedColumns: string[] = ['empleado','rol','tipo', 'actions'];
  data!:MatTableDataSource<any>;

  constructor(
    private readonly _employeesService:EmployeesService,
    private readonly _dialog:MatDialog) { }

  ngOnInit(): void {

    this._getAndSetEmployees();

    this.filter.valueChanges
    .pipe(debounceTime(500)) // consulta 500 milisegungos despues de que deja de teclear el usuario
    .subscribe(data => {
      this._getAndSetEmployees(data);
    });
  }

  private _getAndSetEmployees(keyword:string = ""){
    this._employeesService.getEmployees().subscribe((employees:Partial<Employee>[]) => {
      this.data = new MatTableDataSource(employees);
    });
  }


  addNewEmployee() {
    this._dialog.open(EditCreateEmployeeComponent,{
      width:"55%",
      height:"95%",
      data:<EditCreateDialogData>{
        title:"Nuevo Empleado"
      }
    });
  }

  deleteSelectedEmployees(){
    alert("elimina varios empleados");
  }

  deleteEmployeeById(id:number){
    alert("delete employee "+id);
  }

  editEmployeeById(id:number){
    alert("edit employee "+id);
  }

  onMovimientos(){
    alert("on movimientos");
  }
}
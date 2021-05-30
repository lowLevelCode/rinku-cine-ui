import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime, map } from 'rxjs/operators';
import { EditCreateDialogData } from 'src/app/interfaces/edit-create-dialog-data';
import { Employee } from 'src/app/models/employee';
import { EmployeesService } from 'src/app/services/employees.service';
import { EditCreateEmployeeComponent } from 'src/app/shared/components/dialogs/edit-create-employee/edit-create-employee.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  filter:FormControl = new FormControl();
  employees!:Employee[];

  displayedColumns: string[] = ['nombre', 'actions'];
  data!:MatTableDataSource<Employee>;

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
    this._employeesService.getEmployees().subscribe((employees:Employee[]) => {
      this.data = new MatTableDataSource(employees);
    });
  }


  addNewEmployee() {
    this._dialog.open(EditCreateEmployeeComponent,{
      width:"55%",
      height:"90%",
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

}
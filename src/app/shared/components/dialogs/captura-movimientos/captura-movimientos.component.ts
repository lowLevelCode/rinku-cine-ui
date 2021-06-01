import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EmployeeRol } from 'src/app/models/employee-rol';
import { EmployeeType } from 'src/app/models/employee-type';
import { EmployeeRolService } from 'src/app/services/employee-rol.service';
import { EmployeeTypeService } from 'src/app/services/employee-type.service';


export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

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
  selector: 'app-captura-movimientos',
  templateUrl: './captura-movimientos.component.html',
  styleUrls: ['./captura-movimientos.component.scss']
})
export class CapturaMovimientosComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  employeesRol$!:Observable<EmployeeRol[]>;
  employeesType$!:Observable<EmployeeType[]>;

  myControl = new FormControl();
  options: string[] = ['One',];
  filteredOptions!: Observable<string[]>;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private readonly _employeeRolService:EmployeeRolService,
    private readonly _employeeTypeService:EmployeeTypeService,) {}

  ngOnInit(): void {
    this.employeesRol$ = this._employeeRolService.getAllRols().pipe(map(result => result));
    this.employeesType$ = this._employeeTypeService.getAllTypes().pipe(map(result => result));

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  onAgregarCaptura(){
    alert("agregar captura");
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EmployeeRolEnum } from 'src/app/enums/employee-rol.emun';
import { Pagination } from 'src/app/interfaces/pagination';
import { BitacoraEntregas } from 'src/app/models/bitacora-entregas';
import { Employee } from 'src/app/models/employee';
import { EmployeeRol } from 'src/app/models/employee-rol';
import { EmployeeType } from 'src/app/models/employee-type';
import { BitacoraEntregasService } from 'src/app/services/bitacora-entregas.service';
import { EmployeeRolService } from 'src/app/services/employee-rol.service';
import { EmployeeTypeService } from 'src/app/services/employee-type.service';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-captura-movimientos',
  templateUrl: './captura-movimientos.component.html',
  styleUrls: ['./captura-movimientos.component.scss']
})
export class CapturaMovimientosComponent implements OnInit {
  displayedColumns: string[] = ['folio','fecha','cantidadEntregas','cubrioTurno'];
  dataSource!:MatTableDataSource<any>;

  employeesRol$!:Observable<EmployeeRol[]>;
  employeesType$!:Observable<EmployeeType[]>;
  employees$!:Observable<Partial<Employee>[]>;  

  myControl = new FormControl();
  
  form!:FormGroup;
  hayMovimientos!:boolean;
  isAuxiliar!:boolean;
  
  constructor(
    private readonly _fb:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public employee: Employee,
    private readonly _employeeRolService:EmployeeRolService,
    private readonly _employeeTypeService:EmployeeTypeService,
    private readonly _employee:EmployeesService,
    private readonly _bitacoraEntregasService:BitacoraEntregasService) {}

  ngOnInit(): void {
    this.employeesRol$ = this._employeeRolService.getAllRols().pipe(map(result => result));
    this.employeesType$ = this._employeeTypeService.getAllTypes().pipe(map(result => result));    

    const {id} = this.employee;

    this.myControl.valueChanges.pipe(startWith('')).subscribe(value => {
      this._filter(value);
    });

    this.form = this._fb.group({
      rol:[''],
      tipo:[''],
      fechaMovimiento:['', Validators.required],
      cantidadEntregas:['',Validators.required],
      cubrioTurno:[''],
    });

    this._bitacoraEntregasService.getBitacoraByEmployeeId(id)
    .subscribe((pagination:Pagination<BitacoraEntregas[]>)=>{
      this.hayMovimientos = pagination.items.length > 0;  
      this.dataSource = new MatTableDataSource(pagination.items);      
    });

    this.isAuxiliar = this.employee.employeeRol.id === EmployeeRolEnum.AUXILIAR;

  }

  private _filter(value: string) {    
    this.employees$ =  this._employee.getEmployees()
    .pipe(map((result:Pagination<Partial<Employee>[]>) => result.items));
  }

  /** Funcion para darle displayWith al autocomplete */
  getOptionText(employee:Employee) {
    return employee?.nombre; 
  }

  onSubmit() {
    alert("ubmi");
  }
}

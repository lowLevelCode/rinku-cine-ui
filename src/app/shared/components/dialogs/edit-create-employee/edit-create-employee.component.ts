import { BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { EditCreateDialogData } from 'src/app/interfaces/edit-create-dialog-data';
import { Employee } from 'src/app/models/employee';
import { EmployeeRol } from 'src/app/models/employee-rol';
import { EmployeeType } from 'src/app/models/employee-type';
import { EmployeeRolService } from 'src/app/services/employee-rol.service';
import { EmployeeTypeService } from 'src/app/services/employee-type.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { ResponsiveService } from 'src/app/services/responsive.service';
import { NgxSpinnerService } from "ngx-spinner";
import { PopupDialogsService } from 'src/app/services/popup.dialogs.service';

@Component({
  selector: 'app-edit-create-employee',
  templateUrl: './edit-create-employee.component.html',
  styleUrls: ['./edit-create-employee.component.scss']
})
export class EditCreateEmployeeComponent {
  
  selectedValue!: string;
  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  form!:FormGroup;
  imgFile!:string;
  employeesRol$!:Observable<EmployeeRol[]>;
  employeesType$!:Observable<EmployeeType[]>;

  constructor(
    public dialogRef: MatDialogRef<EditCreateEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: EditCreateDialogData,
    private readonly _fb:FormBuilder,
    private readonly _responsiveService:ResponsiveService,
    private readonly _employeeRolService:EmployeeRolService,
    private readonly _employeeTypeService:EmployeeTypeService,
    private readonly _employeesService:EmployeesService,
    private readonly _spinner: NgxSpinnerService,
    private readonly _popupService:PopupDialogsService) {}

  ngOnInit():void {    
    const employee = this.userData.employee;
    this.dialogRef.disableClose = true;
    this.form = this._fb.group({      
      firstName: new FormControl(employee?.nombre, Validators.required),
      lastName: new FormControl(employee?.apellidos, Validators.required),
      birthdate: new FormControl({value:null,disabled:true}, Validators.required),
      phone: new FormControl(employee?.telefono, Validators.required),
      email: new FormControl(employee?.email, Validators.compose([Validators.required, Validators.email])),
      curp: new FormControl(employee?.curp, Validators.required),
      rfc: new FormControl(employee?.rfc, Validators.required),
      rol: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required),
    });

    this._responsiveService.getMobileSizeState().subscribe((state:BreakpointState)=>{
      if(state.breakpoints[Breakpoints.XSmall] || state.breakpoints[Breakpoints.Small])
        this.dialogRef.updateSize("90%");
    });  

    this.employeesRol$ = this._employeeRolService.getAllRols().pipe(map(result => result))
    this.employeesType$ = this._employeeTypeService.getAllTypes().pipe(map(result => result))
  }

  onSubmit() {    
    if(this.form.invalid){      
      this._popupService.topEndError("Formulario invalido");
      return;
    }

    const isDirty = !this.form.pristine; // true si el form no se le ha modificado nada.

    const employee:Partial<Employee> = {
      nombre: this.form.get("firstName")?.value,
      apellidos: this.form.get("lastName")?.value,
      fechaNacimiento: this.form.get("birthdate")?.value,
      telefono: this.form.get("phone")?.value,
      email: this.form.get("email")?.value,
      curp: this.form.get("curp")?.value,
      rfc: this.form.get("rfc")?.value,
      idEmployeeRol: this.form.get("rol")?.value,
      idEmployeeType: this.form.get("rol")?.value
    };
    
    this._spinner.show();
    this._employeesService.create(employee).pipe(      
      finalize(()=>{
        this.dialogRef.close();
        this._spinner.hide();
      })
    ).subscribe();

  }

  onUploadImageToBrowser(e:any) {
    const reader = new FileReader();
    
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imgFile = reader.result as string;        
      };
    }    
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCreateEmployeeComponent } from './edit-create-employee.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AvatarModule } from '../../avatar/avatar.module';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask'
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeeRolService } from 'src/app/services/employee-rol.service';
import { EmployeeTypeService } from 'src/app/services/employee-type.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    EditCreateEmployeeComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule, 
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    AvatarModule,
    MatSelectModule,
    NgxMaskModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,    
    NgxSpinnerModule
  ],
  exports:[EditCreateEmployeeComponent],
  providers:[
    EmployeeRolService,
    EmployeeTypeService,
  ]
})
export class EditCreateEmployeeModule { }

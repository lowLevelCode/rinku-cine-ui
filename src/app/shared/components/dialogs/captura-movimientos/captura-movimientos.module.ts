import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapturaMovimientosComponent } from './captura-movimientos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderCloseDialogModule } from '../header-close-dialog/header-close-dialog.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AvatarModule } from '../../avatar/avatar.module';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { EmployeeRolService } from 'src/app/services/employee-rol.service';
import { EmployeeTypeService } from 'src/app/services/employee-type.service';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AvatarWithTextModule } from '../../avatar-with-text/avatar-with-text.module';
import { NgxMaskModule } from 'ngx-mask';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { EmployeesService } from 'src/app/services/employees.service';


@NgModule({
  declarations: [
    CapturaMovimientosComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    HeaderCloseDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    AvatarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatButtonModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AvatarWithTextModule,
    NgxMaskModule,
    MatAutocompleteModule
  ],
  exports: [CapturaMovimientosComponent],
  providers:[
    EmployeeRolService, 
    EmployeeTypeService,
    EmployeesService
  ]
})
export class CapturaMovimientosModule { }

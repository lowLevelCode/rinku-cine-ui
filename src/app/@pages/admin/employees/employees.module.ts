import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AvatarModule } from 'src/app/shared/components/avatar/avatar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeesService } from 'src/app/services/employees.service';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { EditCreateEmployeeModule } from 'src/app/shared/components/dialogs/edit-create-employee/edit-create-employee.module';
import { MatChipsModule } from '@angular/material/chips';
import { CapturaMovimientosModule } from 'src/app/shared/components/dialogs/captura-movimientos/captura-movimientos.module';

@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MatCardModule,
    MatTableModule,
    FlexLayoutModule,
    AvatarModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    EditCreateEmployeeModule,
    MatChipsModule,
    CapturaMovimientosModule
  ],
  providers:[EmployeesService]
})
export class EmployeesModule { }

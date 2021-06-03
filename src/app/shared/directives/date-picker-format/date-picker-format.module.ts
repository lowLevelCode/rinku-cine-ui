import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePickerFormatDirective } from './date-picker-format.directive';



@NgModule({
  declarations: [
    DatePickerFormatDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [DatePickerFormatDirective]
})
export class DatePickerFormatModule { }

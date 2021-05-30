import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EchoRoutingModule } from './echo-routing.module';
import { EchoComponent } from './echo.component';


@NgModule({
  declarations: [
    EchoComponent
  ],
  imports: [
    CommonModule,
    EchoRoutingModule
  ]
})
export class EchoModule { }

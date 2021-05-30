import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { NgFallimgModule } from 'ng-fallimg';


@NgModule({
  declarations: [
    AvatarComponent
  ],
  imports: [
    CommonModule,
    NgFallimgModule
  ],
  exports:[AvatarComponent]
})
export class AvatarModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarWithTextComponent } from './avatar-with-text.component';
import { AvatarModule } from '../avatar/avatar.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    AvatarWithTextComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    FlexLayoutModule
  ],
  exports: [AvatarWithTextComponent]
})
export class AvatarWithTextModule { }

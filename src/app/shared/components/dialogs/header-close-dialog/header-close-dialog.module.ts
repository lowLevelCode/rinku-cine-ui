import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderCloseDialogComponent } from './header-close-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    HeaderCloseDialogComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [HeaderCloseDialogComponent]
})
export class HeaderCloseDialogModule { }

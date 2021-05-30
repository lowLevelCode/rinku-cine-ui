import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatSidenavModule  } from "@angular/material/sidenav";
import { MatToolbarModule  } from "@angular/material/toolbar";
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AdminComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ]
})
export class AdminModule { }

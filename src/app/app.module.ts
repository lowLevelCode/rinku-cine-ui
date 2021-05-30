import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgFallimgModule } from 'ng-fallimg';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

const imgs = {
  default:"",
  profile:  'assets/img/profile.png',
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig),
    NgFallimgModule.forRoot(imgs),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

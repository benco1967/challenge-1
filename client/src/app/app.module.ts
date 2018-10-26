import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { PoisComponent } from './pois/pois.component';
import { WarningComponent } from './warning/warning.component';
import { StarsComponent } from './stars/stars.component';

@NgModule({
  declarations: [
    AppComponent,
    PoisComponent,
    WarningComponent,
    StarsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }

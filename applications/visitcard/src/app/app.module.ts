import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'libraries/ui/src/lib/button/button.module';
import { CardModule } from 'libraries/ui/src/lib/card/card.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ButtonModule, CardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

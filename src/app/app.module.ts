import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { GroupedSetComponent } from './grouped-set/grouped-set.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    GroupedSetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

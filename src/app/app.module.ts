import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GroupedSetComponent, GroupedSetService } from './grouped-set';
import { SearchPageComponent } from './search-page/search-page.component';


@NgModule({
  declarations: [
    AppComponent,
    GroupedSetComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GroupedSetService],
  bootstrap: [AppComponent]
})
export class AppModule { }

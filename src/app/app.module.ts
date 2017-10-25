import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GroupedSetComponent, GroupedSetService } from './grouped-set';
import { SearchPageService } from './search-page/search-page.service';
import { SearchPageComponent } from './search-page/search-page.component';
import { SearchInputComponent } from './search-page/search-input/search-input.component';

const appRoutes: Routes = [
  { path: 'search/:search', component: SearchPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GroupedSetComponent,
    SearchPageComponent,
    SearchInputComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    ),
    BrowserModule
  ],
  providers: [GroupedSetService, SearchPageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

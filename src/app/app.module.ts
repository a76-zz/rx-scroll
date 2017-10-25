import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { GroupedSetComponent, GroupedSetService } from './grouped-set';
import { SearchPageComponent } from './search-page/search-page.component';

const appRoutes: Routes = [
  { path: 'search', component: SearchPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GroupedSetComponent,
    SearchPageComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule
  ],
  providers: [GroupedSetService],
  bootstrap: [AppComponent]
})
export class AppModule { }

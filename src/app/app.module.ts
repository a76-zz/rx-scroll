import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GroupedSetComponent } from './grouped-set/grouped-set.component';
import { GroupedSetService } from './grouped-set.service';

@NgModule({
  declarations: [
    AppComponent,
    GroupedSetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GroupedSetService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { GroupedSetService } from './grouped-set.service';
import { Initialize, InitialState, Group, Action } from './model';

const initializeAction = new Initialize({
  allItems: {
      first: {
          count: 10
      },
      second: {
          count: 100
      }
  },
  itemHeight: 20,
  headerHeight: 30,
  containerHeight: 100
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private service: GroupedSetService) {
  }

  ngOnInit() {
    this.service.actions.next(initializeAction);
  }

  onHandleActions(action: Action<Group>) {
    this.service.actions.next(action);
  }
}

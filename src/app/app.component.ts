import { Component, OnInit } from '@angular/core';
import { GroupedSetService, Initialize, InitialState, Action } from './grouped-set';

const initializeAction = new Initialize({
  allItems: {
      first: {
        count: 10
      },
      second: {
        count: 100
      },
      third: {
        count: 1000
      },
      forth: {
        count: 10000
      },
      fifth: {
        count: 100000
      },
      sixth: {
        count: 1000000
      }
  },
  itemHeight: 20,
  headerHeight: 30,
  containerHeight: 500
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

  onHandleActions(action: Action) {
    this.service.actions.next(action);
  }
}

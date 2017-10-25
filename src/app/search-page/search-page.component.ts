import { Component, OnInit } from '@angular/core';
import { GroupedSetService, Initialize, InitialState, Action } from '../grouped-set';
import { SearchPageService  } from './search-page.service';

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
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  constructor(private service: GroupedSetService, private service2: SearchPageSerive) { }

  ngOnInit() {
    this.service.actions.next(initializeAction);
  }

  onHandleActions(action: Action) {
    this.service.actions.next(action);
  }

}

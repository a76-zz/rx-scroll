import { Component, OnInit } from '@angular/core';
import { GroupedSetService, Initialize, InitialState, Action } from '../grouped-set';
import { SearchPageService  } from './search-page.service';
import { ActivatedRoute } from '@angular/router';
import { Search } from './model';

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

  constructor(private service: GroupedSetService, private searchService: SearchPageService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.service.actions.next(initializeAction);
    this.searchService.route.next(this.activatedRoute);
  }

  onHandleActions(action: Action) {
    this.service.actions.next(action);
  }

  onHandleSearch(value: string) {
    this.searchService.actions.next(new Search(value));
  }
}

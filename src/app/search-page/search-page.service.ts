import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';

import { Query, Action, Search } from './model';
import { toBehavior } from '../_rx';

@Injectable()
export class SearchPageService {
  // inputs
  route: Subject<ActivatedRoute> = new Subject();
  actions: Subject<Action> = new Subject();

  // outputs
  query: Observable<Query>;
  search: Observable<string>;

  constructor(private router: Router) {
    this.query = toBehavior(this.route.switchMap(route => route.params.map(params => params as Query)));
    this.search = this.query.pluck('search');

    this.actions.filter(action => action instanceof Search).subscribe(action => {
      this.router.navigate(['search', action.value]);
    });
  }
}

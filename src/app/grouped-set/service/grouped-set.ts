import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { Action, State, Group } from '../model';
import { groupedSetStateFunc } from '../logic';

import { toBehavior } from '../../_rx';

@Injectable()
export class GroupedSetService {
    actions: Subject<Action> = new Subject<Action>();
    state: Observable<State>;

    constructor() {
        this.state = toBehavior(this.actions.scan<Action, State>(
            (state, action) => groupedSetStateFunc(state, action),
            undefined
        ));
    }
}

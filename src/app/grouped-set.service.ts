import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { Action, State, Group } from './model';
import { groupedSetStateFunc } from './grouped-set';

function toBehavior<T>(input: Observable<T>) {
    const result = input.shareReplay(1);
    result.subscribe();
    return result;
}


@Injectable()
export class GroupedSetService {
    actions: Subject<Action<Group>> = new Subject<Action<Group>>();
    state: Observable<State<Group>>;

    constructor() {
        this.state = toBehavior(this.actions.scan<Action<Group>, State<Group>>(
            (state, action) => groupedSetStateFunc<Group>(state, action),
            undefined
        ));
    }
}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { Action, State, Group } from '../model';
import { groupedSetStateFunc } from '../logic';

function toBehavior<T>(input: Observable<T>) {
    const result = input.shareReplay(1);
    result.subscribe();
    return result;
}


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

import { Observable } from 'rxjs/Rx';

export function toBehavior<T>(input: Observable<T>) {
    const result = input.shareReplay(1);
    result.subscribe();
    return result;
}
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, DoCheck } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { State, Group, Action, Scroll, Toggle, IteratorResult } from '../model';
import { createIterator } from '../grouped-set-iterator';
import { generateArray } from '../generate-array';

@Component({
  selector: 'app-grouped-set',
  templateUrl: './grouped-set.component.html',
  styleUrls: ['./grouped-set.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupedSetComponent implements OnChanges {
  @Input() state: State<Group>;
  @Output() actions: EventEmitter<Action<Group>> = new EventEmitter();
  items: any = [];

  ngOnChanges(changes) {
    console.log(this.state);
    if (this.state) {
      this.items = createIterator(this.state, group => generateArray(group.count, index => index));
    }
  }

  scroll(e) {
    const { scrollTop } = e.target;
    this.actions.next(new Scroll(scrollTop));
  }

  toggle(item) {
    const id = this.state.reverseMap.get(item);
    this.actions.emit(new Toggle(id));
  }
}

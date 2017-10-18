import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, DoCheck } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { State, Group, Action, Scroll, Toggle } from '../model';
import { createIterator } from '../grouped-set-iterator';
import { generateArray } from '../generate-array';



@Component({
  selector: 'app-grouped-set',
  templateUrl: './grouped-set.component.html',
  styleUrls: ['./grouped-set.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupedSetComponent implements OnChanges, DoCheck {
  @Input() state: State<Group>;
  @Output() actions: EventEmitter<Action<Group>> = new EventEmitter();

  ngOnChanges(changes) {
    // console.log(changes);
  }

  ngDoCheck() {
    // console.log('do check');
  }

  get Items() {
    if (this.state) {
      const items = createIterator(this.state, group => generateArray(group.count, index => index));
      return items;
    } else {
      return [];
    }
  }

  scroll(e) {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const position = scrollTop / (scrollHeight - clientHeight);
    this.actions.next(new Scroll(position));
  }

  toggle(item) {
    const id = this.state.reverseMap.get(item);
    this.actions.emit(new Toggle(id));
  }
}

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, DoCheck } from '@angular/core';
import { OnChanges, OnInit, OnDestroy, ElementRef  } from '@angular/core';

import { Subject, Observable, Subscription } from 'rxjs/Rx';
import { State, Action, Scroll, Toggle, IteratorResult, Resize } from '../model';
import { createIterator, generateArray } from '../logic';

@Component({
  selector: 'app-grouped-set',
  templateUrl: './grouped-set.html',
  styleUrls: ['./grouped-set.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupedSetComponent implements OnChanges, OnInit, OnDestroy {
  @Input() state: State;
  @Output() actions: EventEmitter<Action> = new EventEmitter();
  items: IteratorResult<number>[] = [];
  private subscription: Subscription;

  constructor(private container: ElementRef) {
  }

  get containerHeight(): number {
    return this.container.nativeElement.firstElementChild.clientHeight;
  }

  ngOnInit() {
    this.updateHeight();
    this.subscription = Observable.fromEvent(window, 'resize').subscribe(
      () => { this.updateHeight(); }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes) {
    // console.log(this.state);
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

  private updateHeight() {
    if (this.state && this.state.containerHeight !== this.containerHeight) {
      this.actions.next(new Resize(this.containerHeight));
    }
  }
}

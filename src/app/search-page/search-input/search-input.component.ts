import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchInputComponent {

  constructor() { }
  @Input() search: string;
  @Output() nextSearch: EventEmitter<string> = new EventEmitter();

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.nextSearch.emit(input.value);
  }
}



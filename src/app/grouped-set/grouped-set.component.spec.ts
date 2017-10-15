import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedSetComponent } from './grouped-set.component';

describe('GroupedSetComponent', () => {
  let component: GroupedSetComponent;
  let fixture: ComponentFixture<GroupedSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupedSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupedSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

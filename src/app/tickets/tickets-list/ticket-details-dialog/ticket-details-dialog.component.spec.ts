import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TicketDetailsDialogComponent} from './ticket-details-dialog.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TicketDetailsDialogComponent', () => {
  let component: TicketDetailsDialogComponent;
  let fixture: ComponentFixture<TicketDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TicketDetailsDialogComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: 'some_ticket'},
      ],
      imports: [MatTableModule, HttpClientTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

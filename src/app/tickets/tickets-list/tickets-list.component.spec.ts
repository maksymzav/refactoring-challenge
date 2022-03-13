import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TicketsListComponent} from './tickets-list.component';
import {MatDialog} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TicketsListComponent', () => {
  let component: TicketsListComponent;
  let fixture: ComponentFixture<TicketsListComponent>;
  let matDialog: jasmine.SpyObj<MatDialog>;
  let titleService: jasmine.SpyObj<Title>;

  beforeEach(async(() => {
    matDialog = jasmine.createSpyObj('MatDialog spy', ['select', 'open']);
    titleService = jasmine.createSpyObj('Title', ['setTitle']);
    TestBed.configureTestingModule({
      declarations: [TicketsListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: MatDialog, useValue: matDialog},
        {provide: Title, useValue: titleService},
      ],
      imports: [MatTableModule, HttpClientTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

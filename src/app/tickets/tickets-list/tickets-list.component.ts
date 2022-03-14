import {Component, OnInit} from '@angular/core';
import {TicketState} from '../entities/ticket-state.enum';
import {TicketType} from '../entities/ticket-type.enum';
import {MatDialog} from '@angular/material/dialog';
import {FilterTicketsDialogComponent} from './filter-tickets-dialog/filter-tickets-dialog.component';
import {TicketDetailsDialogComponent} from './ticket-details-dialog/ticket-details-dialog.component';
import {TicketsDataService} from './tickets-data.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MatTableDataSource} from '@angular/material/table';
import {Ticket} from '../entities/ticket';
import {TableOperations} from './table-operations/table-operations';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'rch-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent extends TableOperations<Ticket> implements OnInit {

  override displayedColumns = ['id', 'type', 'state'];
  hasTickets = false;


  ticketState = TicketState;
  ticketType = TicketType;

  selectedType?: TicketType;
  selectedState?: TicketState;
  isAdmin = false;
  currentStore: {id?: string, name?: string} = {};
  token = '';
  apiDocsLink = '';

  constructor(
    private matDialog: MatDialog,
    private ticketsDataService: TicketsDataService,
    private httpClient: HttpClient) {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.isAdmin = true;
    this.currentStore = {id: 'someId', name: 'My Awesome Store'};
    this.token = 'I am hidden';
    this.apiDocsLink = 'https://google.com';
    this.ticketsDataService.watchUpdates().subscribe(() => {
      this.isLoadingResults = true;
      this.fetchData();
    });
  }

  openFilters() {
    this.matDialog.open(FilterTicketsDialogComponent, {
      data: {type: this.selectedType, state: this.selectedState},
    }).afterClosed().subscribe((data: { type: TicketType, state: TicketState }) => {
      if (!data) {
        return;
      }
      this.isLoadingResults = true;
      this.selectedType = data.type;
      this.selectedState = data.state;
      this.fetchData();
    });
  }

  showTicketDetails(ticketId: string) {
    this.matDialog.open(TicketDetailsDialogComponent, {data: ticketId});
  }

  goToToZapier() {
    console.log('navigated to zapier');
  }

  override fetchData() {
    const params = new HttpParams()
      .set('type', this.selectedType || TicketType.default)
      .set('state', this.selectedState || '');

    this.httpClient.get<{ _embedded: { ticket: Ticket[] } }>('http://demo5549610.mockable.io/tickets', {params}).subscribe((data) => {
      if (data?._embedded?.ticket?.length) {
        this.hasTickets = true;
        this.isLoadingResults = false;
        this.dataSource = new MatTableDataSource(data._embedded.ticket);
      }
    });
  }

  protected fetchCollection(params: { limit: number; page: number; search: string }): Observable<{ total: number; dataList: Ticket[] }> {
    return of({total: 0, dataList: []});
  }


}

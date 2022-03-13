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

@Component({
  selector: 'rch-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {

  displayedColumns = ['id', 'type', 'state'];
  hasTickets = false;
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource<Ticket>();

  ticketState = TicketState;
  ticketType = TicketType;

  selectedType?: TicketType;
  selectedState?: TicketState;

  isLoadingResults = false;
  isAdmin = true;
  currentStore = {id: 'someId', name: 'My Awesome Store'};
  token = 'I am hidden';
  apiDocsLink = 'https://google.com';

  constructor(
    private matDialog: MatDialog,
    private ticketsDataService: TicketsDataService,
    private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.fetchData();
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
    console.log('navigated to ');
  }

  private fetchData() {
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
}

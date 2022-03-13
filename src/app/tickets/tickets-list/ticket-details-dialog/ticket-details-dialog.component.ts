import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket, TicketPayload } from '../../entities/ticket';
import { TicketType } from '../../entities/ticket-type.enum';
import {HttpClient, HttpParams} from '@angular/common/http';

const basicColumns = ['id', 'marketplace', 'type'];
const shipmentColumns = ['id', 'marketplace', 'type', 'trackingNumber', 'carrier', 'trackingLink'];

@Component({
    selector: 'rch-ticket-details-dialog',
    templateUrl: './ticket-details-dialog.component.html',
    styleUrls: ['./ticket-details-dialog.component.scss']
})
export class TicketDetailsDialogComponent implements OnInit {

    displayedColumns: string[] = [];
    dataSource = new MatTableDataSource<TicketPayload>();
    ticket?: Ticket;

    constructor(@Inject(MAT_DIALOG_DATA) private ticketId: string, private httpClient: HttpClient) {
    }

    ngOnInit() {
      this.httpClient.get<Ticket>('http://demo5549610.mockable.io/ticket-details', {params: new HttpParams().set('ticketId', this.ticketId)})
        .subscribe((ticket: Ticket) => {
            this.displayedColumns = ticket.type === TicketType.shipOrder
                ? shipmentColumns
                : basicColumns;
            this.dataSource.data = [ticket.payload];
            this.ticket = ticket;
        });
    }



}

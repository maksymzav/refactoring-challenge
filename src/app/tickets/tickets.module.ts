import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { FilterTicketsDialogComponent } from './tickets-list/filter-tickets-dialog/filter-tickets-dialog.component';
import { TicketDetailsDialogComponent } from './tickets-list/ticket-details-dialog/ticket-details-dialog.component';
import { StateLabelComponent } from './tickets-list/state-label/state-label.component';
import { TypeLabelComponent } from './tickets-list/type-label/type-label.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    TicketsListComponent,
    FilterTicketsDialogComponent,
    TicketDetailsDialogComponent,
    StateLabelComponent,
    TypeLabelComponent,
  ],
  exports: [
    TicketsListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    FlexModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ]
})
export class TicketsModule {
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { TicketsService } from '../../../service/tickets/tickets.service';
import { ModalTicketsComponent } from '../../../shared/components/modal-tickets/modal-tickets.component';
import { TicketStatus } from '../../../shared/enums/ticket-status.enum';
import { Ticket, TicketList } from '../../../shared/interfaces/ticket.interface';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  public ticketStatus: { [index: number]: string };
  public page: number;
  public pageSize: number;
  public tickets: TicketList;

  constructor(public dialog: MatDialog, private ticketsService: TicketsService, private toastrService: ToastrService) {
    this.page = 1;
    this.pageSize = 20;
    this.ticketStatus = TicketStatus;
  }

  public ngOnInit(): void {
    this.getTickets();
  }
  public getTickets(): void {
    this.ticketsService.getTickets(this.page, this.pageSize).subscribe(tickets => (this.tickets = tickets));
  }

  public openTicketModal(): void {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';

    const dialogRef: MatDialogRef<ModalTicketsComponent> = this.dialog.open(ModalTicketsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result: { data: Ticket }) => {
      if (result && result.data) {
        this.ticketsService.sendTicket(result.data).subscribe(() => {
          this.toastrService.success('Ticket has been added successfully!!');
          this.getTickets();
        });
      }
    });
  }
}

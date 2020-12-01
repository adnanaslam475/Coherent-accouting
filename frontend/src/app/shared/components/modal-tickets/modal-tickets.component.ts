import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { TicketStatus } from '../../enums/ticket-status.enum';
import { Ticket, TicketList } from '../../interfaces/ticket.interface';

@Component({
  selector: 'app-modal-tickets',
  templateUrl: './modal-tickets.component.html',
  styleUrls: ['./modal-tickets.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalTicketsComponent implements OnInit {
  public ticketForm: FormGroup;
  public ticketStatus: { [index: number]: string };
  public tickets: TicketList;
  public defaultTicketFrom: Ticket = {
    title: '',
    ticketContent: ''
  };
  public savedTicket: Ticket;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ModalTicketsComponent>, @Inject(MAT_DIALOG_DATA) data: {}) {
    this.ticketStatus = TicketStatus;
  }

  public ngOnInit(): void {
    this.ticketForm = this.initForm();
  }

  public initForm(): FormGroup {
    return this.formBuilder.group({
      title: [this.defaultTicketFrom.title, Validators.compose([Validators.required])],
      ticketContent: [this.defaultTicketFrom.ticketContent, Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  public sendTicket(form: FormGroup): void {
    if (form.valid) {
      const ticket: Ticket = {
        title: form.value.title,
        ticketContent: form.value.ticketContent,
        status: TicketStatus.CREATED
      };
      this.clearForm();
      this.dialogRef.close({ data: ticket });
    }
  }

  public clearForm(): void {
    this.ticketForm.reset(this.defaultTicketFrom);
    this.ticketForm.markAsPristine();
    this.ticketForm.markAsUntouched();
    this.ticketForm.updateValueAndValidity();
  }

  public close(): void {
    this.dialogRef.close();
  }
}

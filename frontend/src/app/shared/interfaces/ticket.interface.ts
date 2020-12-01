export interface Ticket {
  title: string;
  ticketContent: string;
  status?: string;
  creationDate?: Date;
  answer?: string;
}

export interface TicketList {
  totalElements: number;
  elements: Ticket[];
}

import { Publisher, Subjects, TicketCreatedEvent } from '@cttickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}

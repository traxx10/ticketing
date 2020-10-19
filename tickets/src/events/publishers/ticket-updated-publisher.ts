import { Publisher, Subjects, TicketUpdatedEvent } from '@cttickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

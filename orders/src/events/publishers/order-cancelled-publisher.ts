import { OrderCancelledEvent, Publisher, Subjects } from '@cttickets/common';

export class OrderCancelledPublihser extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

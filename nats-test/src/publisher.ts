import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';
console.clear();

// Create a client which can be called stan
// Second args is the clientID
const stan = nats.connect('ticketing', 'abc', { url: 'http://localhost:4222' });

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);

  try {
    // Making the code asynchronous
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 150,
    });
  } catch (error) {
    console.error(error);
  }
});

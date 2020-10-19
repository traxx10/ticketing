import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      // signin(): Promise<string[]>;
      signin(userId?: string): string[];
    }
  }
}

// jest.setTimeout(30000);
jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_j4duNLsCYu6CVDmGSER1uDZu00IQ0vT4j3';

let mongo: any;

// Jest Hook to run this before running all of our tests
beforeAll(async () => {
  process.env.JWT_KEY = 'asddjdjdjf';

  mongo = new MongoMemoryServer();

  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Jest Hook to run before each of our tests
beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// Jest Hook to run after all of our tests has finished running
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (userId?: string) => {
  // Build a JWT payload. {id, email }
  const id = userId || new mongoose.Types.ObjectId().toHexString();
  const payload = {
    id,
    email: 'test@test.com',
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object {jwt: MY_JWT}
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string that is the cookie with the data
  return [`express:sess=${base64}`];
};

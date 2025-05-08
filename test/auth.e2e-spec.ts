import { MONGODB_URL_TEST, PORT, URL } from './constants';
import * as mongoose from 'mongoose';
import * as request from 'supertest';

beforeAll(async () => {
  await mongoose.connect(MONGODB_URL_TEST as string);
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('AuthController e2e', () => {
  let registeredUser = {
    username: `${Date.now()}`,
    password: `${Date.now()}`,
    region: `${Date.now()}`,
    district: `${Date.now()}`,
  };

  it('POST /auth/register (POST) - Successful Registration', async () => {
    return request(URL)
      .post(`/auth/register`)
      .set('Accept', 'application/json')
      .send(registeredUser)
      .expect(201)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toBe(registeredUser.username);
      });
  });
});

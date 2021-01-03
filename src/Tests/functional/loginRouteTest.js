/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable global-require */

const request = require('supertest');
const app = require('../../app');

describe('==> Tests on Login route', () => {
  test('should get the response with status code 400 and validaiton error', (done) => {
    request(app)
      .post('/users/login')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => expect(res.body).toHaveProperty('errors'))
      .expect(400, done);
  });

  test('should get the response with status code 400 and error message', (done) => {
    request(app)
      .post('/users/login')
      .send({ email: 'wrongemail@email.com', password: 'wrongpassword' })
      .set('Accept', 'application/json')
      .expect((res) => {
        expect(res).toHaveProperty('error');
        expect(res).toHaveProperty('text');
        expect(res.text).toBe('Invalid credentials.');
      })
      .expect(400, done);
  });

  test('should get the response with status code 200, user and token', (done) => {
    request(app)
      .post('/users/login')
      .send({ email: 'chef@chefme.com', password: 'chefme123' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toHaveProperty('user');
        expect(res.body).toHaveProperty('token');
      })
      .expect(200, done);
  });
});

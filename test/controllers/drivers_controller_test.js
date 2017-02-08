const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

describe('POST /api/drivers', () => {
  it('should create a new driver', (done) => {
    request(app)
      .post('/api/drivers')
      .send({ email: 'test@test.com' })
      .end(() => {
        done();
      });
  });
});

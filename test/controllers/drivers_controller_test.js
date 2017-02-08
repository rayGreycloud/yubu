const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
// Access model via mongoose to avoid mongoose-mocha-express bugs
const Driver = mongoose.model('driver');

describe('POST /api/drivers', () => {
  it('should create a new driver', (done) => {
    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end(() => {
          Driver.count().then(newCount => {
            assert(count + 1 === newCount);
          });
          done();
        });
    });
  });
});

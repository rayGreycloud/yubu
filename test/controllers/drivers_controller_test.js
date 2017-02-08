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
            done();
          });
        });
    });
  });
});

describe('PUT /api/drivers/:id', () => {
  it('should update a driver record', (done) => {
    const driver = new Driver({ email: 'vik@test.com', driving: false });

    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: 'vik@test.com' })
            .then(driver => {
              assert(driver.driving === true);
              done();
            });
        });
    });
  });
});

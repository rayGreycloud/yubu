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

describe('DELETE /api/drivers/:id', () => {
  it('should delete a driver record', (done) => {
    const driver = new Driver({ email: 'wizz@test.com' });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: 'wizz@test.com' })
            .then((driver) => {
              assert(driver === null);
              done();
            });
        });
    });
  });
});

describe('GET /api/drivers', () => {
  it('should find drivers near location', (done) => {
    const driverA = new Driver({
      email: 'driverA@test.com',
      // Location = Portland
      geometry: { type: 'Point', coordinates: [-122.636, 45.562] }
    });

    const driverB = new Driver({
      email: 'driverB@test.com',
      // Location = Miami
      geometry: { type: 'Point', coordinates: [-80.239, 25.73] }
    });

    Promise.all([ driverA.save(), driverB.save()])
      .then(() => {
        request(app)
        // Using Portland location for test
          .get(`/api/drivers?lng=-122&lat=45`)
          .end((err, response) => {
            console.log(response);
            done();
          });
      });
  });
});

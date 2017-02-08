const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('Express app', () => {
  it('should handle route request', (done) => {
    request(app)
      .get('/api')
      .end((err, response) => {
        assert(response.body.hi === 'there');
        done();
      });
  });
});

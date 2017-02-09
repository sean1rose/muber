const assert = require('assert');
// use supertest to make faux http requests
const request = require('supertest');
const app = require('../app');

// want to test that request handler listens for type get and that response that comes back is a specific obj
describe('The express app', () => {
  it('handles a GET request to /api', (done) => {
    // use supertest, passing in express app, then chain methods (get, post, put etc), then assert in callback
    request(app)
      .get('/api')
      .end((err, response) => {
        // want response.body and response.status
        assert(response.body.hi === 'there');
        done();
      });
  });
});
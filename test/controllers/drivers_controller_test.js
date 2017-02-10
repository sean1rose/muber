const assert = require('assert');
// use supertest to make faux http requests
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
// need to access Driver model
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('Post to /api/drivers creates a new driver', done => {
    // count # of drivers beforehand
    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'test@test.com' })
        .end((err, response) => {
          Driver.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        })
    });
  });
})
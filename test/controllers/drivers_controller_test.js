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

  it('PUT to /api/drivers/:id edits an existing driver', done => {
    // create driver, save, make put request to update, go back in and find driver and assert new prop has been updated
    const driver = new Driver({ email: 't@t.com', driving: false });
    driver.save().then(() => {
      // supertest http request 
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          // pull driver out of db and make sure flag set to true
          Driver.findOne({ email: 't@t.com' })
            .then(driver => {
              assert(driver.driving === true);
              done();
            })
        });
    })
  });

  it('DELETE to /api/drivers/:id deletes an existing driver', done => {

    const driver = new Driver({ email: 's@s.com'});
    
    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          // Driver.findOne({ email: 's@s.com'})
          //   .then((driver) => {
          //     asssert(driver === null);
          //     done();
          //   })
          Driver.findById(driver._id)
            .then(driver => {
              assert(driver === null);
              done();
            }) 
        })
    })

  });
})
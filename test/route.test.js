const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../server')


describe('Unit testing the /bussim route', function() {

    this.timeout(10000)
    it('should return OK status', function() {
      return request(app)
        .get('/bussim')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should contain id of the bus', function() {
        return request(app)
          .get('/bussim')
          .then(function(response){
              expect(response.text).to.contain('61c08e3aa44fe701c353006f');
          })
      });


});

describe('Unit testing the / route', function() {

    this.timeout(10000)
    it('should return OK status', function() {
      return request(app)
        .get('/')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should contain id of the bus', function() {
        return request(app)
          .get('/')
          .then(function(response){
              expect(response.text).to.contain('61c08e3aa44fe701c353006f');
          })
      });
});

describe('Unit testing the /busmanagement route', function() {

    this.timeout(10000)
    it('should return OK status', function() {
      return request(app)
        .get('/busmanagement')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should contain id of the bus', function() {
        return request(app)
          .get('/busmanagement')
          .then(function(response){
              expect(response.text).to.contain('61c08e3aa44fe701c353006f');
          })
      });
});

describe('Unit testing the /buses route', function() {

    this.timeout(10000)
    it('should return OK status', function() {
      return request(app)
        .get('/buses')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should contain id of the bus', function() {
        return request(app)
          .get('/buses')
          .then(function(response){
              expect(response.text).to.contain('61c08e3aa44fe701c353006f');
          })
      });
});

describe('Unit testing the /updateroutes/0 route', function() {

    this.timeout(10000)
    it('should return OK status', function() {
      return request(app)
        .get('/updateroutes/0')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should contain id of the bus', function() {
        return request(app)
          .get('/updateroutes/0')
          .then(function(response){
              expect(response.text).to.contain('61c08e3aa44fe701c353006f');
          })
      });
});

describe('Unit testing the /editbus/0 route', function() {

    this.timeout(10000)
    it('should return OK status', function() {
      return request(app)
        .get('/editbus/0')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should contain id of the bus', function() {
        return request(app)
          .get('/editbus/0')
          .then(function(response){
              expect(response.text).to.contain('61c08e3aa44fe701c353006f');
          })
      });
});

describe('Unit testing the /EditRoute?busIDNo=0&routeIDNo=0', function() {

    this.timeout(10000)
    it('should return OK status', function() {
      return request(app)
        .get('/EditRoute?busIDNo=0&routeIDNo=0')
        .then(function(response){
            assert.equal(response.status, 200)
        })
    });

    it('should contain id of the bus', function() {
        return request(app)
          .get('/EditRoute?busIDNo=0&routeIDNo=0')
          .then(function(response){
              expect(response.text).to.contain('61c08e3aa44fe701c353006f');
          })
      });
});




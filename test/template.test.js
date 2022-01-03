const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../server')

describe('Unit testing template of /bussim route', function() {

    this.timeout(10000)
    it('should contain id of the bus', function() {
        return request(app)
          .get('/bussim')
          .then(function(response){
              expect(response.text).to.contain('<a href="/" class="w3-bar-item w3-button w3-teal"><i class="fa fa-home w3-margin-right"></i>Live Bus Tracker</a>');
          })
      });


});

describe('Unit testing template of / route', function() {

    this.timeout(10000)

    it('should contain id of the bus', function() {
        return request(app)
          .get('/')
          .then(function(response){
              expect(response.text).to.contain('<a href="/" class="w3-bar-item w3-button w3-teal"><i class="fa fa-home w3-margin-right"></i>Live Bus Tracker</a>');
          })
      });
});

describe('Unit testing template of /busmanagement route', function() {

    this.timeout(10000)
    it('should contain id of the bus', function() {
        return request(app)
          .get('/busmanagement')
          .then(function(response){
              expect(response.text).to.contain('<a href="/" class="w3-bar-item w3-button w3-teal"><i class="fa fa-home w3-margin-right"></i>Live Bus Tracker</a>');
          })
      });
});


describe('Unit testing template of /updateroutes/0 route', function() {



    it('should contain id of the bus', function() {
        return request(app)
          .get('/updateroutes/0')
          .then(function(response){
              expect(response.text).to.contain('<a href="/" class="w3-bar-item w3-button w3-teal"><i class="fa fa-home w3-margin-right"></i>Live Bus Tracker</a>');
          })
      });
});

describe('Unit testing template of /editbus/0 route', function() {

    this.timeout(10000)

    it('should contain id of the bus', function() {
        return request(app)
          .get('/editbus/0')
          .then(function(response){
              expect(response.text).to.contain('<a href="/" class="w3-bar-item w3-button w3-teal"><i class="fa fa-home w3-margin-right"></i>Live Bus Tracker</a>');
          })
      });
});

describe('Unit testing template of /EditRoute?busIDNo=0&routeIDNo=0', function() {


    it('should contain id of the bus', function() {
        return request(app)
          .get('/EditRoute?busIDNo=0&routeIDNo=0')
          .then(function(response){
              expect(response.text).to.contain('<a href="/" class="w3-bar-item w3-button w3-teal"><i class="fa fa-home w3-margin-right"></i>Live Bus Tracker</a>');
          })
      });
});
const expect = require('expect');
const request = require('supertest');
var testData = require('./testData');
const addContext = require('mochawesome/addContext');
var app = require('./../../app');

describe('Registration APIS', () => {

  afterEach(function (done, res) {
    addContext(this, {
      title: 'Request',
      value: this.request
    });
    addContext(this, {
      title: 'Response',
      value: this.response
    });
    this.request = null;
    this.response = null;
    done();
  });

  it('User Registration', (done) => {
    var _it = this;
    var _requestData = testData.registerData;
    _it.request = testData.registerData;

    request(app)
      .post('/user/register')
      .set('Accept', 'application/json')
      .send(_requestData)
      .end((err, response) => {
        var _response = response.body.data;
        _it.response = response.body;

        if (err) done(err);

        expect(response.status).toBe(200);
        expect(_response.email).toBe(testData.registerData.email);
        expect(Number(_response.phoneNumber)).toBe(testData.registerData.phoneNumber);
        expect(_response.firstName).toBe(testData.registerData.firstName);
        expect(_response.lastName).toBe(testData.registerData.lastName);
        expect(_response.birthdate).toBe(testData.registerData.birthdate);
        expect(_response.gender).toBe(testData.registerData.gender);
        expect(_response.countryCode).toBe(testData.registerData.countryCode);
        done();
      });
  });

  var token = null;
  it('User Login', (done) => {
    var _it = this;
    var _requestData = {
      phoneNumber: testData.registerData.phoneNumber,
      password: '' + testData.registerData.password
    }
    _it.request = testData;

    request(app)
      .post('/user/login')
      .set('Accept', 'application/json')
      .send(_requestData)
      .end((err, response) => {
        var _response = response.body;
        _it.response = response.body;

        if (err) done(err);
        expect(response.status).toBe(200);
        expect(_response.token).toBeDefined();
        token = _response.token;
        done();
      });
  });

  it('User Set Status', (done) => {
    var _it = this;
    var _requestData = testData.statusData;
    _it.request = _requestData;

    request(app)
      .post('/status')
      .set({ authorization: token })
      .send(_requestData)
      .end((err, response) => {
        var _response = response.body.data;
        _it.response = response.body;
        
        if (err) done(err);
        expect(response.status).toBe(201);
        expect(_response.name).toBe(testData.statusData.name);
        done();
      });
  });
})
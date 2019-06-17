const expect = require('expect');
const request = require('supertest');
var testData = require('./testData');
const addContext = require('mochawesome/addContext');
var app = require('./../../app');

// describe('Test Registeration', function () {
//   afterEach(function (done, res) {
//     addContext(this, {
//       title: 'Request',
//       value: this.request
//     });
//     addContext(this, {
//       title: 'Response',
//       value: this.response
//     });
//     this.request = null;
//     this.response = null;
//     done();
//   });

//   it('user register ', function (done) {

//     // var _requestData = Object.assign(
//     //   {
//     //     email: 'hi'

//     //   },
//     // );
//     // console.log("**********",testData);
    
//     var _requestData = testData;
//     var _it = this;
//     _it.request = _requestData;
//     request(app)
//       .post('/user/register')
//       .expect(200)
//       .send(_requestData)
//       .expect(function (res) {
//         console.log("*******");

//         var _response = res.body.data;
        
//         _it.response = res.body;

//         expect(res.body.statusCode).toBe(200);
//       })
//       .end(function (err, res) {
//         if (err) { return done(err); }
//         done();
//       });
//   });
// });


describe('Product creation API', () => {
  // const util = new UtilService();
  it('should create product', (done) => {
  request(app)
  .post('/user/register')
  .set('Accept', 'application/json')
  .send(testData)
  .end((err, response) => {
    console.log("********",response);
    
  // if (err) done(err);
  // expect(response.body.success).to.equal(true);
  // expect(response.statusCode).to.equal(201);
  done();
  });
  });
})
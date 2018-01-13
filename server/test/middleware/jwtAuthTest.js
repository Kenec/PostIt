// import chai from 'chai';
// import sinon from 'sinon';
// import jwtAuth from '../../shared/middleware/jwtAuth';

// const expect = chai.expect;

// describe('jwtAuth Middleware', () => {
//   let request;
//   let response;
//   let next;

//   beforeEach(() => {
//     request = {
//       body: {
//         token: sinon.spy()
//       }
//     };
//     response = {
//       status: sinon.stub().returnsThis()
//     };
//     next = sinon.spy();
//   });
//   it('next should not be called if no token provided', () => {
//     jwtAuth(request, response, next);
//     expect(next.called).to.equal(false);
//   });

//   it('next should not be called if bad token was provided', () => {
//     jwtAuth(request, response, next);
//     expect(next.called).to.equal(false);
//   });
// });

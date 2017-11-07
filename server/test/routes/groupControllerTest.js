import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import mockData from '../mockData.json';
import { Groups, userGroups } from '../../models';
import app from '../../app';

process.env.NODE_ENV = 'test';

const server = supertest.agent(app);
const should = chai.should();

chai.use(chaiHttp);

const { group } = mockData.Groups;
const { validSigninAccount } = mockData.Users;


describe('Groups', () => {
  let token = '';
  before((done) => {
    server
      .post('/api/v1/users/signin')
      .send(validSigninAccount)
      .end((err, res) => {
        token = res.body.token;
      });
    Groups.sync({ force: true })
      .then(() => {
        userGroups.sync({ force: true });
        done();
      })
      .catch((error) => {
        done(error);
      });
  });

  describe('API Routes Test: ', () => {
    describe('POST: /api/v1/groups', () => {
      it('should create a group when all parameters are supplied',
        (done) => {
          server
            .post('/api/v1/groups')
            .send({
              token,
              groupName: group.groupName,
              createdby: group.createdby,
            })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Group group created successfully');
              res.body.should.have.property('success')
                .eql(true);
              done();
            });
        });
      it('should not create a group if any field is empty',
        (done) => {
          server
            .post('/api/v1/groups')
            .send({
              token,
              groupName: group.emptyGroupName,
              createdby: group.createdby,
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Invalid request. Some column(s) are missing');
              done();
            });
        });
      it(`should not create a group when any 
          of the required field is not available`,
        (done) => {
          server
            .post('/api/v1/groups')
            .send({

              // assuming createdby is missing
              token,
              groupName: group.groupName
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Invalid request. Some column(s) are missing');
              done();
            });
        });
      it(`should not create a group with a
          group name that already exists`,
        (done) => {
          server
            .post('/api/v1/groups')
            .send({
              token,
              groupName: group.groupName,
              createdby: group.createdby,
            })
            .end((err, res) => {
              res.should.have.status(409);
              res.body.should.be.a('object');
              res.body.should.have.property('message')
                .eql('Group already exists!');
              done();
            });
        });
    });
    describe('POST: /api/v1/groups/creator', () => {
      it('should fetch a groups by its creator id',
        (done) => {
          server
            .post('/api/v1/groups/creator')
            .send({
              token,
              userId: group.user
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body[0].should.have.property('id')
                .eql(1);
              res.body[0].should.have.property('groupName')
                .eql('Group');
              res.body[0].should.have.property('createdAt');
              done();
            });
        });
      it(`should not return a group when getting a group by
        creator and the id passed is not the creator's id`,
        (done) => {
          server
            .post('/api/v1/groups/creator')
            .send({
              token,
              userId: group.invalidUserId
            })
            .end((err, res) => {
              res.should.have.status(500);
              res.body.should.have.property('message')
                .eql('Error retrieving Groups');
              done();
            });
        });
      it('should not fetch group by creator when userId is not passed',
        (done) => {
          server
            .post('/api/v1/groups/creator')
            .send({

            // userId not passed
              token,
            })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property('message')
                .eql('Invalid request. userId is missing');
              done();
            });
        });
    });
    describe('GET: /api/v1/groups/:groupId', () => {
      it('should return groups by its id',
        (done) => {
          const groupId = group.groupId;
          server
            .get(`/api/v1/groups/${groupId}`)
            .set({ 'x-access-token': token })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body[0].should.have.property('id')
                .eql(1);
              res.body[0].should.have.property('groupName')
                .eql('Group');
              res.body[0].should.have.property('createdAt');
              done();
            });
        });
      it('should return not found when getting a group that does not exist',
        (done) => {
          const groupId = null;
          server
            .get(`/api/v1/groups/${groupId}`)
            .set({ 'x-access-token': token })
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.have.property('message')
                .eql('Group selected not found');
              done();
            });
        });
    });
  });
});

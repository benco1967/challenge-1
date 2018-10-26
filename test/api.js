const should = require('should');
const request = require('supertest');

const server = require('../app');

describe('controllers api', () => {

  describe('api unknown', () => {

    describe('GET /api/1/nawak', () => {

      it('should return an error', done => {

        request(server)
          .get('/api/1/nawak')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404)
          .end((err, res) => {
            should.not.exist(err);
            done();
          });
      });

    });

  });

  describe('api aroundme', () => {

    describe('GET /api/1/aroundme', () => {

      it('should return list of poi without pos', done => {

        request(server)
          .get('/api/1/aroundme')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);
            res.body.should.be.an.Array();
            res.body.should.containDeep([{id: "592ff81850a6f0070fd25cf5", name: "Kig"}]);
            done();
          });
      });
      it('should return list of poi with pos', done => {

        request(server)
          .get('/api/1/aroundme?pos=48.1364079,1.62038')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);
            res.body.should.be.an.Array();
            res.body.should.containDeep([{id: "4fa53738e4b02e6a552e8d24", name: "Cormainville"}]);
            done();
          });
      });

    });

  });

  describe('api poi', () => {

    describe('GET /api/1/poi/5afc0a1481635b002c430e8b', () => {

      it('should return poi details', done => {

        request(server)
          .get('/api/1/poi/5afc0a1481635b002c430e8b')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);
            res.body.should.have.properties('id', 'name', 'likes');
            res.body.id.should.be.equal("5afc0a1481635b002c430e8b");
            done();
          });

      });

    });

    describe('GET /api/1/poi/invalid_id', () => {

      it('should return error 404', done => {

        request(server)
          .get('/api/1/poi/invalid_id')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .end((err, res) => {
            should.not.exist(err);
            res.body.should.have.properties('status', 'message');
            done();
          });

      });

    });

  });

});
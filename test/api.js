const should = require('should');
const request = require('supertest');

const server = require('../app');

describe('controllers api', () => {

  describe('api aroundme', () => {

    describe('GET /api/1/aroundme', () => {

      it('should return list of poi', done => {

        request(server)
          .get('/api/1/aroundme')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end((err, res) => {
            should.not.exist(err);
            res.body.should.be.an.Array();
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
            done();
          });
      });

      describe('GET /api/1/poi/invalid_id', () => {

        it('should return error 404', done => {

          request(server)
            .get(' /api/1/poi/invalid_id')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
              should.not.exist(err);
              res.body.should.have.properties('status', 'message');
              done();
            });
        });

      });

    });

  });

});
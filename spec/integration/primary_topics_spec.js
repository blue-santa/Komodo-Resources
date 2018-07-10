const request = require('request');
const server = require('../../src/server');
const sequelize = require('../../src/db/models/index').sequelize;
const PrimaryTopic = require('../../src/db/models').PrimaryTopic;

const base = 'http://localhost:3000/primaryTopics';

describe('routes : primaryTopics', () => {

  beforeEach((done) => {
    this.primaryTopic;
    sequelize.sync({force: true}).then((res) => {

      PrimaryTopic.create({
        title: 'Hello World'
      })
      .then((primaryTopic) => {
        this.primaryTopic = primaryTopic;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });
  });

  describe('GET /primaryTopics', () => {

    it('should return a status code 200 and all primaryTopics', (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain('Primary Topics');
        expect(body).toContain('Hello World');
        done();
      });
    });

  });

});

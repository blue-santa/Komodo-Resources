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

  describe('GET /primaryTopics/new', () => {
    it("should render a new primary topic form", (done) => {
      request.get(`${base}/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Primary Topic");
        done();
      });
    });
  });

  describe('GET /primaryTopics/:id', () => {

    it('should render a view with the selected topic', (done) => {
      request.get(`${base}/${this.primaryTopic.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Hello World');
        done();
      });
    });

  });

  describe('GET /primaryTopics/:id/edit', () => {

    it('should render a view with an edit primary topic form', (done) => {
      request.get(`${base}/${this.primaryTopic.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Edit Primary Topic');
        expect(body).toContain('Hello World');
        done();
      });
    });

  });

  describe('GET /primaryTopics/:id/update', () => {

    it('should update the primary topic with the given values', (done) => {
      const options = {
        url: `${base}/${this.primaryTopic.id}/update`,
        form: {
          title: 'Hello Again, World'
        }
      };
      request.post(options,
        (err, res, body) => {
          expect(err).toBeNull();
          PrimaryTopic.findOne({
            where: { id: this.primaryTopic.id }
          })
          .then((primaryTopic) => {
            expect(primaryTopic.title).toBe('Hello Again, World');
            done();
          });
        }
      );
    });

  });

  describe('POST /primaryTopics/create', () => {
    const options = {
      url: `${base}/create`,
      form: {
        title: 'test 1 - new primary topic'
      }
    };

    it('should create a new topic and redirect', (done) => {
      request.post(options,
        (err, res, body) => {
          PrimaryTopic.findOne({where: {title: 'test 1 - new primary topic' }})
          .then((primaryTopic) => {
            expect(res.statusCode).toBe(303);
            expect(primaryTopic.title).toBe('test 1 - new primary topic');
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });

  });

  describe('POST /primaryTopics/:id/destroy', () => {

    it('should delete the primary topic with the associated ID', (done) => {
      PrimaryTopic.all()
      .then((primaryTopics) => {
        const primaryTopicCountBeforeDelete = primaryTopics.length;
        expect(primaryTopicCountBeforeDelete).toBe(1);
        request.post(`${base}/${this.primaryTopic.id}/destroy`, (err, res, body) => {
          PrimaryTopic.all()
          .then((primaryTopics) => {
            expect(err).toBeNull();
            expect(primaryTopics.length).toBe(primaryTopicCountBeforeDelete - 1);
            done();
          });
        });
      });
    });

  });

});

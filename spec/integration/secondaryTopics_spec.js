const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/primaryTopics';

const sequelize = require('../../src/db/models/index').sequelize;
const PrimaryTopic = require('../../src/db/models').PrimaryTopic;
const SecondaryTopic = require('../../src/db/models').SecondaryTopic;

describe('routes : secondaryTopics', () => {

  beforeEach((done) => {
    this.primaryTopic;
    this.secondaryTopic;
    sequelize.sync({ force: true }).then((res) => {
      PrimaryTopic.create({
        title: 'Title: Hello World - 1',
        content: 'Content: Hello World - 1'
      })
      .then((primaryTopic) => {
        this.primaryTopic = primaryTopic;
        SecondaryTopic.create({
          title: 'Title: Hello World - 2',
          content: 'Content: Hello World - 2',
          primaryTopicId: this.primaryTopic.id
        })
        .then((secondaryTopic) => {
          this.secondaryTopic = secondaryTopic;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      });
    });
  });

  describe('GET /primaryTopics/:primaryTopicId/secondaryTopics/new', () => {

    it('should render a new secondaryTopic form', (done) => {
      request.get(`${base}/${this.primaryTopic.id}/secondaryTopics/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('New Secondary Topic');
        done();
      });
    });

  });

  describe('GET /primaryTopics/:primaryTopicId/secondaryTopics/:id', () => {
    it('should render a view with the selected secondary topic', (done) => {
      request.get(`${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Hello World - 2');
        done();
      });
    });
  });

  describe('GET /primaryTopics/:primaryTopicId/secondaryTopics/:id/edit', () => {

    it('should render a view with an edit secondary topic form', (done) => {
      request.get(`${base}/${this.secondaryTopic.primaryTopicId}/secondaryTopics/${this.secondaryTopic.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Edit Secondary Topic');
        expect(body).toContain('Hello World - 2');
        done();
      });
    });

  });

  describe('POST /primaryTopics/:primaryTopicId/secondaryTopics/create', () => {

    it('should create a new secondary topic and redirect', (done) => {
      const options = {
        url: `${base}/${this.primaryTopic.id}/secondaryTopics/create`,
        form: {
          title: 'Title: Hello World - 3',
          content: 'Content: Hello World - 3'
        }
      };
      request.post(options,
        (err, res, body) => {
          SecondaryTopic.findOne({ where: { title: 'Title: Hello World - 3' }})
          .then((secondaryTopic) => {
            expect(secondaryTopic).not.toBeNull();
            expect(secondaryTopic.title).toBe('Title: Hello World - 3');
            expect(secondaryTopic.content).toBe('Content: Hello World - 3');
            expect(secondaryTopic.primaryTopicId).not.toBeNull();
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

  describe('POST /primaryTopics/:primaryTopicId/secondaryTopics/:id/update', () => {

    it('should return a status code 302', (done) => {
      request.post({
        url: `${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/update`,
        form: {
          title: 'Title: Hello World - 4',
          content: 'Content: Hello World - 4'
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(302);
        done();
      });
    });

    it('should update the secondary topic with the given values', (done) => {
      const options = {
        url: `${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/update`,
        form: {
          title: 'Title: Hello World - 5'
        }
      };
      request.post(options,
        (err, res, body) => {
          expect(err).toBeNull();
          SecondaryTopic.findOne({
            where: { id: this.secondaryTopic.id }
          })
          .then((secondaryTopic) => {
            expect(secondaryTopic.title).toBe('Title: Hello World - 5');
            done();
          });
        }
      );
    });

  });

  describe('POST /primaryTopics/:primaryTopicId/secondaryTopics/:id/destroy', () => {

    it('should delete the secondary topic with the associated id', (done) => {
      expect(this.secondaryTopic.id).toBe(1);
      request.post(`${base}/${this.secondaryTopic.primaryTopicId}/secondaryTopics/${this.secondaryTopic.id}/destroy`, (err, res, body) => {
        SecondaryTopic.findById(1)
        .then((secondaryTopic) => {
          expect(err).toBeNull();
          expect(secondaryTopic).toBeNull();
          done();
        });
      });
    });

  });

});

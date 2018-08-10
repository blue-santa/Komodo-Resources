const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/primaryTopics';

const sequelize = require('../../src/db/models/index').sequelize;
const PrimaryTopic = require('../../src/db/models').PrimaryTopic;
const SecondaryTopic = require('../../src/db/models').SecondaryTopic;
const ThirdTopic = require('../../src/db/models').ThirdTopic;
const FourthTopic = require('../../src/db/models').FourthTopic;

describe('routes : posts', () => {

  beforeEach((done) => {
    this.primaryTopic;
    this.secondaryTopic;
    this.thirdTopic;
    this.fourthTopic;

    sequelize.sync({force: true}).then((res) => {
      PrimaryTopic.create({
        title: 'Title: Primary Topic 1',
        content: 'Content: Primary Topic 1'
      })
      .then((primaryTopic) => {
        this.primaryTopic = primaryTopic;
        SecondaryTopic.create({
          title: 'Title: Secondary Topic 1',
          content: 'Content: Secondary Topic 1',
          primaryTopicId: this.primaryTopic.id
        })
        .then((secondaryTopic) => {
          this.secondaryTopic = secondaryTopic;
          ThirdTopic.create({
            title: 'Title: Third Topic 1',
            content: 'Content: Third Topic 1',
            primaryTopicId: this.primaryTopic.id,
            secondaryTopicId: this.secondaryTopic.id
          })
          .then((thirdTopic) => {
            this.thirdTopic = thirdTopic;
            FourthTopic.create({
              title: 'Title: Fourth Topic 1',
              content: 'Content: Fourth Topic 1',
              primaryTopicId: this.primaryTopic.id,
              secondaryTopicId: this.secondaryTopic.id,
              thirdTopicId: this.thirdTopic.id
            })
            .then((fourthTopic) => {
              this.fourthTopic = fourthTopic;
              done();
            })
            .catch();
          })
          .catch((err) => {
            console.error(err);
            done();
          });
        })
        .catch((err) => {
          console.error(err);
          done();
        });
      })
      .catch((err) => {
        console.error(err);
        done();
      });
    });
  });

  describe('GET /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/new', () => {
    it('should render a new fourth topic form', (done) => {
      request.get(`${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/fourthTopics/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('New Fourth Topic');
        done();
      });
    });
  });

  describe('GET /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:id', () => {

    it('should render a view with the selected fourth topic', (done) => {
      request.get(`${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/fourthTopics/${this.fourthTopic.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Title: Fourth Topic 1');
        done();
      });
    });

  });

  describe('GET /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:id/edit', () => {

    it('should render a view with an edit fourth topic form', (done) => {
      request.get(`${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/fourthTopics/${this.fourthTopic.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Edit Fourth Topic');
        expect(body).toContain('Title: Fourth Topic 1');
        done();
      });
    });

  });

  describe('POST /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/create', () => {

    it('should create a new fourth topic and redirect', (done) => {
      const options = {
        url: `${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/fourthTopics/create`,
        form: {
          title: 'Title: Fourth Topic 2',
          content: 'Content: Fourth Topic 2'
        }
      };
      request.post(options,
        (err, res, body) => {
          FourthTopic.findOne({where: {title: 'Title: Fourth Topic 2'}})
          .then((fourthTopic) => {
            expect(fourthTopic).not.toBeNull();
            expect(fourthTopic.title).toBe('Title: Fourth Topic 2');
            expect(fourthTopic.content).toBe('Content: Fourth Topic 2');
            expect(fourthTopic.primaryTopicId).not.toBeNull();
            expect(fourthTopic.secondaryTopicId).not.toBeNull();
            expect(fourthTopic.thirdTopicId).not.toBeNull();
            done();
          })
          .catch((err) => {
            console.error(err);
            done();
          });
        }
      );
    });

  });

  describe('POST /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:id/update', () => {

    it('should return a status code 302', (done) => {
      request.post({
        url: `${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/fourthTopics/${this.fourthTopic.id}/update`,
        form: {
          title: `Title: Fourth Topic 2`,
          content: `Content: Fourth Topic 2`
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(302);
        done();
      });
    });

    it('should update the fourth topic with the given values', (done) => {
      const options = {
        url: `${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/fourthTopics/${this.fourthTopic.id}/update`,
        form: {
          title: 'Title: Fourth Topic 3',
        }
      };
      request.post(options,
        (err, res, body) => {
          expect(err).toBeNull();
          FourthTopic.findOne({
            where: {id: this.fourthTopic.id}
          })
          .then((fourthTopic) => {
            expect(fourthTopic.title).toBe('Title: Fourth Topic 3');
            done();
          })
          .catch((err) => {
            console.error(err);
            done();
          });
        }
      );
    });

  });

  describe('POST /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:id/destroy', () => {

    it('should delete the fourth topic with the associated Id', (done) => {
      expect(this.fourthTopic.id).toBe(1);
      request.post(`${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/fourthTopics/${this.fourthTopic.id}/destroy`, (err, res, body) => {
        FourthTopic.findById(1)
        .then((fourthTopic) => {
          expect(err).toBeNull();
          expect(fourthTopic).toBeNull();
          done();
        });
      });
    });

  });

});

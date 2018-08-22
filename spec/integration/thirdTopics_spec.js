const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/primaryTopics';

const sequelize = require('../../src/db/models/index').sequelize;
const PrimaryTopic = require('../../src/db/models').PrimaryTopic;
const SecondaryTopic = require('../../src/db/models').SecondaryTopic;
const ThirdTopic = require('../../src/db/models').ThirdTopic;
const treeQueries = require('../../src/db/queries.tree');

describe('routes : posts', () => {

  beforeEach((done) => {
    this.primaryTopic;
    this.secondaryTopic;
    this.thirdTopic;

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
            treeQueries.buildTree((err, res) => {
              if (err) {
                console.error(err);
              }
              treeQueries.callTree((err, res) => {
                if (err) {
                  console.error(err);
                }
                console.log(res[0].secondaryTopics[0].thirdTopics[0].title);
                done();
              });
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
      })
      .catch((err) => {
        console.error(err);
        done();
      });
    });
  });

  describe('GET /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/new', () => {
    it('should render a new third topic form', (done) => {
      request.get(`${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('New Third Topic');
        done();
      });
    });
  });

  describe('GET /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:id', () => {

    it('should render a view with the selected thirdTopics', (done) => {
      request.get(`${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Title: Third Topic 1');
        done();
      });
    });

  });

  describe('GET /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:id/edit', () => {

    it('should render a view with an edit third topic form', (done) => {
      request.get(`${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Edit Third Topic');
        expect(body).toContain('Title: Third Topic 1');
        done();
      });
    });

  });

  describe('POST /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/create', () => {

    it('should create a new third topic and redirect', (done) => {
      const options = {
        url: `${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/create`,
        form: {
          title: 'Title: Third Topic 2',
          content: 'Content: Third Topic 2'
        }
      };
      request.post(options,
        (err, res, body) => {
          ThirdTopic.findOne({where: {title: 'Title: Third Topic 2'}})
          .then((thirdTopic) => {
            expect(thirdTopic).not.toBeNull();
            expect(thirdTopic.title).toBe('Title: Third Topic 2');
            expect(thirdTopic.content).toBe('Content: Third Topic 2');
            expect(thirdTopic.primaryTopicId).not.toBeNull();
            expect(thirdTopic.secondaryTopicId).not.toBeNull();
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

  describe('/primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:id/update', () => {

    it('should return a status code 302', (done) => {
      request.post({
        url: `${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/update`,
        form: {
          title: `Title: Third Topic 2`,
          content: `Content: Third Topic 2`
        }
      }, (err, res, body) => {
        expect(res.statusCode).toBe(302);
        done();
      });
    });

    it('should update the third topic with the given values', (done) => {
      const options = {
        url: `${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/update`,
        form: {
          title: 'Title: Third Topic 3',
        }
      };
      request.post(options,
        (err, res, body) => {
          expect(err).toBeNull();
          ThirdTopic.findOne({
            where: {id: this.thirdTopic.id}
          })
          .then((thirdTopic) => {
            expect(thirdTopic.title).toBe('Title: Third Topic 3');
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

  describe('POST /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/destroy', () => {
    it('should delete the third topic with the associated Id', (done) => {
      expect(this.thirdTopic.id).toBe(1);
      request.post(`${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/destroy`, (err, res, body) => {
        ThirdTopic.findById(1)
        .then((thirdTopic) => {
          expect(err).toBeNull();
          expect(thirdTopic).toBeNull();
          done();
        });
      });
    });
  });

});

const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/primaryTopics';

const sequelize = require('../../src/db/models/index').sequelize;
const PrimaryTopic = require('../../src/db/models').PrimaryTopic;
const SecondaryTopic = require('../../src/db/models').SecondaryTopic;
const ThirdTopic = require('../../src/db/models').ThirdTopic;
const FourthTopic = require('../../src/db/models').FourthTopic;
const FifthTopic = require('../../src/db/models').FifthTopic;

describe('routes : posts', () => {

  beforeEach((done) => {
    this.primaryTopic;
    this.secondaryTopic;
    this.thirdTopic;
    this.fourthTopic;
    this.fifthTopic;

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
              FifthTopic.create({
                title: 'Title: Fifth Topic 1',
                content: 'Content: Fifth Topic 1',
                primaryTopicId: this.primaryTopic.id,
                secondaryTopicId: this.secondaryTopic.id,
                thirdTopicId: this.thirdTopic.id,
                fourthTopicId: this.fourthTopic.id
              })
              .then((fifthTopic) => {
                this.fifthTopic = fifthTopic;
                done();
              })
              .catch((err) => {
                console.error(err);
                done();
              });
            })
            .catch((err) => {
              console.error(err);
              done();
            })
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

  describe('GET /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:fourthTopicId/fifthTopics/new', () => {

    it('should render a new fifth topic form', (done) => {
      request.get(`${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/fourthTopics/${this.fourthTopic.id}/fifthTopics/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('New Fifth Topic');
        done();
      });
    });

  });

  describe('GET /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:fourthTopicId/fifthTopics/:id', () => {

    it('should render a view with the selected fifth topics', (done) => {
      request.get(`${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/fourthTopics/${this.fourthTopic.id}/fifthTopics/${this.fifthTopic.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Title: Fifth Topic 1');
        done();
      });
    });

  });

  describe('GET /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:fourthTopicId/fifthTopics/:id/edit', () => {

    it('should render a view with an edit fifth topic form', (done) => {
      request.get(`${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/fourthTopics/${this.fourthTopic.id}/fifthTopics/${this.fifthTopic.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Edit Fifth Topic');
        expect(body).toContain('Title: Fifth Topic 1');
        done();
      });
    });

  });

  describe('POST /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:fourthTopicId/fifthTopics/create', () => {

    it('should create a new fifth topic and redirect', (done) => {
      const options = {
        url: `${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/fourthTopics/${this.fourthTopic.id}/fifthTopics/create`,
        form: {
          title: 'Title: Fifth Topic 2',
          content: 'Content: Fifth Topic 2',
        }
      };
      request.post(options,
        (err, res, body) => {
          FifthTopic.findOne({where: {title: 'Title: Fifth Topic 2'}})
          .then((fifthTopic) => {
            expect(fifthTopic).not.toBeNull();
            expect(fifthTopic.title).toBe('Title: Fifth Topic 2');
            expect(fifthTopic.content).toBe('Content: Fifth Topic 2');
            expect(fifthTopic.primaryTopicId).not.toBeNull();
            expect(fifthTopic.secondaryTopicId).not.toBeNull();
            expect(fifthTopic.thirdTopicId).not.toBeNull();
            expect(fifthTopic.fourthTopicId).not.toBeNull();
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

  describe('POST /primaryTopics/:primaryTopicId/secondaryTopics/:secondaryTopicId/thirdTopics/:thirdTopicId/fourthTopics/:fourthTopicId/fifthTopics/:id/destroy', () => {

    it('should delete the fifth topic with the associated Id', (done) => {
      expect(this.fifthTopic.id).toBe(1);
      request.post(`${base}/${this.primaryTopic.id}/secondaryTopics/${this.secondaryTopic.id}/thirdTopics/${this.thirdTopic.id}/fourthTopics/${this.fourthTopic.id}/fifthTopics/${this.fifthTopic.id}/destroy`, (err, res, body) => {
        FifthTopic.findById(1)
        .then((fifthTopic) => {
          expect(err).toBeNull();
          expect(fifthTopic).toBeNull();
          done();
        });
      });
    });

  });

});

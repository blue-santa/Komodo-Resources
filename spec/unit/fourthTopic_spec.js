const sequelize = require('../../src/db/models/index').sequelize;
const PrimaryTopic = require('../../src/db/models').PrimaryTopic;
const SecondaryTopic = require('../../src/db/models').SecondaryTopic;
const ThirdTopic = require('../../src/db/models').ThirdTopic;
const FourthTopic = require('../../src/db/models').FourthTopic;

describe('FourthTopic', () => {

  beforeEach((done) => {
    this.primaryTopic;
    this.secondaryTopic;
    this.thirdTopic;
    this.fourthTopic;
    sequelize.sync({for: true}).then((res) => {
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
      })
      .catch((err) => {
        console.error(err);
        done();
      });
    });
  });

  describe('#create()', () => {

    it('should create a fourth topic object with a title, body, and assigned primary, secondary, and third topics', (done) => {
      FourthTopic.create({
        title: 'Title: Fourth Topic 2',
        content: 'Content: Fourth Topic 2',
        primaryTopicId: this.primaryTopic.id,
        secondaryTopicId: this.secondaryTopic.id,
        thirdTopicId: this.thirdTopic.id
      })
      .then((fourthTopic) => {
        expect(fourthTopic.title).toBe('Title: Fourth Topic 2');
        expect(fourthTopic.content).toBe('Content: Fourth Topic 2');
        expect(fourthTopic.primaryTopicId).toBe(this.primaryTopic.id);
        expect(fourthTopic.secondaryTopicId).toBe(this.secondaryTopic.id);
        expect(fourthTopic.thirdTopicId).toBe(this.thirdTopic.id);
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
    });

    it('should not create a fourth topic if it is missing paramters', (done) => {
      FourthTopic.create({
        title: 'Shouldn`t see me'
      })
      .then((fourthTopic) => {})
      .catch((err) => {
        expect(err.message).toContain('FourthTopic.content cannot be null');
        expect(err.message).toContain('FourthTopic.primaryTopicId cannot be null');
        expect(err.message).toContain('FourthTopic.secondaryTopicId cannot be null');
        expect(err.message).toContain('FourthTopic.thirdTopicId cannot be null');
        done();
      });
    });

  });

  describe('#setThirdTopic()', () => {

    it('should associate a third topic and a fourth topic together', (done) => {
      ThirdTopic.create({
        title: 'Title: Third Topic 2',
        content: 'Content: Third Topic 2',
        primaryTopicId: this.primaryTopic.id,
        secondaryTopicId: this.secondaryTopic.id
      })
      .then((newThirdTopic) => {
        expect(this.fourthTopic.thirdTopicId).toBe(this.thirdTopic.id);
        this.fourthTopic.setThirdTopic(newThirdTopic)
        .then((fourthTopic) => {
          expect(this.fourthTopic.thirdTopicId).toBe(newThirdTopic.id);
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
      });
    });

  });

  describe('#getThirdTopic()', () => {

    it('should get the associated third topic', (done) => {
      this.fourthTopic.getThirdTopic()
      .then((associatedThirdTopic) => {
        expect(associatedThirdTopic.title).toBe('Title: Third Topic 1');
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
    });

  });

});

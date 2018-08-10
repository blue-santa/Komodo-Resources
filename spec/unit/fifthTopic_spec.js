const sequelize = require('../../src/db/models/index').sequelize;
const PrimaryTopic = require('../../src/db/models').PrimaryTopic;
const SecondaryTopic = require('../../src/db/models').SecondaryTopic;
const ThirdTopic = require('../../src/db/models').ThirdTopic;
const FourthTopic = require('../../src/db/models').FourthTopic;
const FifthTopic = require('../../src/db/models').FifthTopic;

describe('FourthTopic', () => {

  beforeEach((done) => {
    this.primaryTopic;
    this.secondaryTopic;
    this.thirdTopic;
    this.fourthTopic;
    this.fifthTopic;
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

    it('should create a fifth topic object with a title, body, and assigned primary, secondary, and third topics', (done) => {
      FifthTopic.create({
        title: 'Title: Fifth Topic 2',
        content: 'Content: Fifth Topic 2',
        primaryTopicId: this.primaryTopic.id,
        secondaryTopicId: this.secondaryTopic.id,
        thirdTopicId: this.thirdTopic.id,
        fourthTopicId: this.fourthTopic.id
      })
      .then((fifthTopic) => {
        expect(fifthTopic.title).toBe('Title: Fifth Topic 2');
        expect(fifthTopic.content).toBe('Content: Fifth Topic 2');
        expect(fifthTopic.primaryTopicId).toBe(this.primaryTopic.id);
        expect(fifthTopic.secondaryTopicId).toBe(this.secondaryTopic.id);
        expect(fifthTopic.thirdTopicId).toBe(this.thirdTopic.id);
        expect(fifthTopic.fourthTopicId).toBe(this.fourthTopic.id);
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
    });

    it('should not create a fifth topic object if it is missing properties', (done) => {
      FifthTopic.create({
        title: 'Shouldnt see me'
      })
      .then()
      .catch((err) => {
        expect(err.message).toContain('FifthTopic.content cannot be null');
        expect(err.message).toContain('FifthTopic.primaryTopicId cannot be null');
        expect(err.message).toContain('FifthTopic.secondaryTopicId cannot be null');
        expect(err.message).toContain('FifthTopic.thirdTopicId cannot be null');
        expect(err.message).toContain('FifthTopic.fourthTopicId cannot be null');
        done();
      });
    });

  });

  describe('#setFourthTopic', () => {

    it('should associate a fifth and fourth topic together', (done) => {
      FourthTopic.create({
        title: 'Title: Fourth Topic 2',
        content: 'Content: Fourth Topic 2',
        primaryTopicId: this.primaryTopic.id,
        secondaryTopicId: this.secondaryTopic.id,
        thirdTopicId: this.thirdTopic.id
      })
      .then((newFourthTopic) => {
        expect(this.fifthTopic.fourthTopicId).toBe(this.fourthTopic.id);
        this.fifthTopic.setFourthTopic(newFourthTopic)
        .then((fifthTopic) => {
          expect(this.fifthTopic.fourthTopicId).toBe(newFourthTopic.id);
          done();
        });
      })
      .catch((err) => {
        console.error(err);
        done();
      });
    });

  });

  describe('#getFourthTopic', () => {

    it('should return the associated fourth topic', (done) => {
      this.fifthTopic.getFourthTopic()
      .then((associatedFourthTopic) => {
        expect(associatedFourthTopic.title).toBe('Title: Fourth Topic 1');
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
    });

  });

});

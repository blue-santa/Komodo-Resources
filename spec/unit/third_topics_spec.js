const sequelize = require('../../src/db/models/index').sequelize;
const PrimaryTopic = require('../../src/db/models').PrimaryTopic;
const SecondaryTopic = require('../../src/db/models').SecondaryTopic;
const ThirdTopic = require('../../src/db/models').ThirdTopic;

describe('ThirdTopic', () => {

  beforeEach((done) => {
    this.primaryTopic;
    this.secondaryTopic;
    this.thirdTopic;
    sequelize.sync({force: true}).then((res) => {
      PrimaryTopic.create({
        title: 'Title: Primary Topic 1',
        content: 'Content: PrimaryTopic 1'
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
            secondaryTopicId: this.secondaryTopic.id
          }).then((thirdTopic) => {
            this.thirdTopic = thirdTopic;
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
    });
  });

  describe('#create()', () => {

    it('should create a thirdTopic object with a title, content, and assigned secondaryTopic', (done) => {
      ThirdTopic.create({
        title: 'Title: Third Topic 2',
        content: 'Content: Third Topic 2',
        secondaryTopicId: this.secondaryTopic.id
      })
      .then((thirdTopic) => {
        expect(thirdTopic.title).toBe('Title: Third Topic 2');
        expect(thirdTopic.content).toBe('Content: Third Topic 2');
        done();
      })
      .catch((err) => {
        console.error(err);
        done();
      });
    });

    it('should not create a thirdTopic with missing title, content, or assigned secondaryTopic', (done) => {
      ThirdTopic.create({
        title: 'Shouldn\'t be here'
      })
      .then((thirdTopic) => {

      })
      .catch((err) => {
        expect(err.message).toContain('ThirdTopic.content cannot be null');
        expect(err.message).toContain('ThirdTopic.secondaryTopicId cannot be null');
        done();
      });
    });

  });

  describe('#setSecondaryTopic', () => {

    it('should associate a secondaryTopic and a thirdTopic together', (done) => {
      SecondaryTopic.create({
        title: 'Title: Secondary Topic 4',
        content: 'Content: Secondary Topic 4',
        primaryTopicId: this.primaryTopic.id
      })
      .then((newSecondaryTopic) => {
        expect(this.thirdTopic.secondaryTopicId).toBe(this.secondaryTopic.id);
        this.thirdTopic.setSecondaryTopic(newSecondaryTopic)
        .then((thirdTopic) => {
          expect(this.thirdTopic.secondaryTopicId).toBe(newSecondaryTopic.id);
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

  describe('#getSecondaryTopic', () => {

    it('should return the associated secondaryTopic', (done) => {
      this.thirdTopic.getSecondaryTopic()
      .then((associatedSecondaryTopic) => {
        expect(associatedSecondaryTopic.title).toBe('Title: Secondary Topic 1');
        done();
      });
    });

  });

});

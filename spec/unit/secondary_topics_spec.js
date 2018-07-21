const sequelize = require('../../src/db/models/index').sequelize;
const PrimaryTopic = require('../../src/db/models').PrimaryTopic;
const SecondaryTopic = require('../../src/db/models').SecondaryTopic;

describe('Secondary Topic', () => {

  beforeEach((done) => {
    this.primaryTopic;
    this.secondaryTopic;
    sequelize.sync({ force: true }).then((res) => {
      PrimaryTopic.create({
        title: 'Title: Hello World - 1',
        content: '<p>Content: Hello World - 1</p>'
      })
      .then((primaryTopic) => {
        this.primaryTopic = primaryTopic;
        SecondaryTopic.create({
          title: 'Hellow World - 2',
          content: '<p>Title: Hello World - 2</p>',
          primaryTopicId: this.primaryTopic.id
        })
        .then((secondaryTopic) => {
          this.secondaryTopic = secondaryTopic;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe('#create()', () => {

    it('should create a secondary topic object with a title, content, and assigned primary topic', (done) => {
      SecondaryTopic.create({
        title: 'Title: Hello World - 2',
        content: '<p>Content: Hello World - 2</p>',
        primaryTopicId: this.primaryTopic.id
      })
      .then((secondaryTopic) => {
        expect(secondaryTopic.title).toBe('Title: Hello World - 2');
        expect(secondaryTopic.content).toBe('<p>Content: Hello World - 2</p>');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it('should not create a secondary topic with a missing title, body, or assigned primary topic', (done) => {
      SecondaryTopic.create({
        title: 'Title: Hello World - 1',
      })
      .then((secondaryTopic) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain('SecondaryTopic.content cannot be null');
        expect(err.message).toContain('SecondaryTopic.primaryTopicId cannot be null');
        done();
      });
    });

  });

  describe('#setPrimaryTopic()', () => {

    it('should associate a primary topic and a secondary topic together', (done) => {
      PrimaryTopic.create({
        title: 'Hello World - Primary Topic',
        content: '<p>Hello World - Primary Topic</p>'
      })
      .then((newPrimaryTopic) => {
        expect(this.secondaryTopic.primaryTopicId).toBe(this.primaryTopic.id);
        this.secondaryTopic.setPrimaryTopic(newPrimaryTopic)
        .then((secondaryTopic) => {
          expect(secondaryTopic.primaryTopicId).toBe(newPrimaryTopic.id);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe('#getPrimaryTopic()', () => {

    it('should return the associated primary topic', (done) => {
      this.secondaryTopic.getPrimaryTopic()
      .then((associatedPrimaryTopic) => {
        expect(associatedPrimaryTopic.title).toBe('Title: Hello World - 1');
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

});

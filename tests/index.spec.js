'use strict';

const { stub } = require('sinon');
const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const { processor } = require('../src/processor');

const data = {
  value: {
    createTime: '2019-10-07T20:20:10.475087Z',
    fields: {
      birthday: { stringValue: '1979-11-13' },
      email: { stringValue: 'test@test.com' },
      firstName: { stringValue: 'test-first-name1234' },
      gender: { stringValue: 'M' },
      isProvider: { booleanValue: false },
      isSocial: { booleanValue: true },
      lastName: { stringValue: 'test-last-name' },
      phoneNumber: { stringValue: '123-123-1234' }
    },
    name:
      'projects/projecid/databases/(default)/documents/profile/TEST987659',
    updateTime: '2019-10-07T20:20:10.475087Z'
  }
};

const context = {
  params: {
    profileId: 'TEST987659'
  }
};

describe('profile-create-event-publisher: unit tests', () => {
  let topic;

  before(() => {
    topic = {
      publish: stub().resolves()
    };
  });

  afterEach(() => {
    topic.publish.reset();
  });

  it('should publish a message to pubsub', () => {
    const event = {
      uid: 'TEST987659',
      email: 'test@test.com',
      isProvider: false
    };

    expect(processor(data, context, topic)).to.be.fulfilled.then(() => {
      expect(topic.publish.called).to.be.true;
      expect(topic.publish.calledWith(Buffer.from(JSON.stringify(event)))).to.be
        .true;
    });
  });

  it('should exit if no data is provided', () => {
    expect(processor({}, { params: '' }, topic)).to.be.fulfilled.then(() => {
      expect(topic.publish.called).to.be.false;
    });
  });
});

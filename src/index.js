'use strict';

const { processor } = require('./processor');
const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();
const topic = pubsub.topic('profile-creation');

module.exports.profileCreationPublisher = (data, context) => {
  return processor(data, context, topic);
};
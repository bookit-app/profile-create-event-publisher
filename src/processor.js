'use strict';

const { isEmpty } = require('lodash');
const logger = require('./logger');

module.exports.processor = async (data, context, topic) => {
  const { params } = context;
  const profile = data.value;
  const id = params.profileId;

  if (isEmpty(id) && isEmpty(profile)) {
    // Message has invalid information so lets just complete
    logger.info('Did not receive any profile data');
    return;
  }

  const event = {
    uid: id,
    email: profile.fields.email.stringValue,
    isProvider: profile.fields.isProvider.booleanValue
  };

  logger.info(`Generating profile creation event for ${JSON.stringify(event)}`);

  return topic.publish(Buffer.from(JSON.stringify(event)));
};

'use strict';

//TODO: Function to hook into firestore object create event for profiles
// when event is fired build a message and put it onto pubsub so other services
// can reach to this in a decoupled way which can be reprocessed.
[![Coverage Status](https://coveralls.io/repos/github/bookit-app/profile-create-event-publisher/badge.svg?branch=master)](https://coveralls.io/github/bookit-app/profile-create-event-publisher?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6e6bae3c039549beb1478dd8d794a6b3)](https://www.codacy.com/gh/bookit-app/profile-create-event-publisher?utm_source=github.com&utm_medium=referral&utm_content=bookit-app/profile-create-event-publisher&utm_campaign=Badge_Grade)

# profile-create-event-publisher

Generates notifications to a PubSub topic when a new profile is created in Cloud Firestore. This will allow services to be notified of changes so that they can make necessary adjustments to any dependent information.

## Processing

This function hooks to the create event trigger raised by firestore. When the function is triggered it will extract the information about the changes and generate a PubSub message similar to the below:

```json
{
  "uid": "document id",
  "email": "email@email.com",
  "isProvider": false
}
```

## Deployment

This is deployed on GCP as a Cloud Function linked to a firestore trigger. The deployment defined within the [cloudbuild.yaml](./cloudbuild.yaml). The deployment expects to find and encrypted file within this repository which contains the environment information that will be associated with the deployed function. The file is decrypted based on encryption keys managed in GCP KMS. The deployment process

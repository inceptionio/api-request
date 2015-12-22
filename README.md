# Request API

Module to allow request retries and timeout.

## Usage

  var apiRequest = require("api-request");
  apiRequest(url, options);

## Options

```js
var options = {
  onStart: undefined
  // Callback to make prior to fetching request.
  onError: undefined
  // Callback to make if their was an error.
  onSuccess: undefined
  // Callback to make if successful response.
  lastUpdated: undefined
  // The last time request was made
  force: false
  // Ignores any other pre-request checks and forces a retry.
  retryCount: 0
  // How many times to retry on failure
  retryTimeout: 1
  // Initial time to retry after which is multiplied by 2 for next time.
};
```

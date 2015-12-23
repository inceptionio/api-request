var request = require('request');
var merge = require('merge');

function canMakeRequest(force, lastUpdated) {
  if (!force && lastUpdated &&
      (Date.now() - lastUpdated.getTime()) < 60000) {
    return false;
  }

  return true;
}

function retryApiRequest(url, options) {
  if (options.retryCount > 0) {
    setTimeout(function() {
      options.force = true;
      options.retryCount = options.retryCount - 1;
      options.retryTimeout = options.retryTimeout * 2;
      apiRequest(url, options);
    }, options.retryTimeout * 1000);
  }
}

var defaultOptions = {
  retryCount: 0,
  retryTimeout: 1,
  force: false
};

/**
 * Fetches the url content based on parameters passed.
 *
 * @param url The url to get via request.
 * @param options Options to control refetch and retry on failure.
 * @param options.onStart Callback to make prior to fetching request.
 * @param options.onError Callback to make if their was an error.
 * @param options.onSuccess Callback to make if successful response.
 * @param options.lastUpdated The last time request was made
 * @param options.force Force a refetch
 * @param options.retryCount How many times to retry on failure.
 * @param options.retryTimeout Initial time to retry after which it's
 *                              multipled by 2.
 */
function apiRequest(url, options) {
  if (!canMakeRequest(options.force,
                      options.lastUpdated)) {
    return;
  }

  options = merge(true, defaultOptions, options);

  if (options.onStart) options.onStart();

  request.get({url: url, json: true}, function(err, res, body) {
    if (err || !res || res.status !== 200 || body.status !== 'success') {
      if (options.onError) options.onError(res);

      retryApiRequest(url, options);

      return;
    }

    if (options.onSuccess) options.onSuccess(body);
  });
}

module.exports = apiRequest;

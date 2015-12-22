var apiRequest = require("../api-request");
var sinon = require("sinon");
var request = require("request");
var expect = require("chai").expect;

describe("Test Request API", function() {
  var url, options, sandbox;

  context("no arguments passed", function() {
    beforeEach(function() {
      sandbox = sinon.sandbox.create();
      options = {};
      url = "/test-api";
    });

    afterEach(function() { sandbox.restore(); });

    it('should send a request even if no options passed', function() {
      var requestStub = sandbox.stub(request, "get");
      requestStub.yields(null, null, {});
      apiRequest(url, options);
      expect(requestStub.callCount).to.eql(1);
    });
  });

  context("check whether it can make request", function() {
    beforeEach(function() {
      sandbox = sinon.sandbox.create();
      options = {};
      url = "/test-api";
    });

    afterEach(function() { sandbox.restore(); });

    it('should not send a request lastUpdated rejected', function() {
      var requestStub = sandbox.stub(request, "get");
      requestStub.yields(null, null, {});
      options = {force: false,
                 lastUpdated: new Date()
                };
      apiRequest(url, options);
      expect(requestStub.callCount).to.eql(0);
    });

    it('should not send a request lastUpdated rejected', function() {
      var requestStub = sandbox.stub(request, "get");
      requestStub.yields(null, null, {});
      options = {force: false,
                 lastUpdated: new Date()
                };
      apiRequest(url, options);
      expect(requestStub.callCount).to.eql(0);
    });
  });

});

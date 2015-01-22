var proxy = require('../proxy');
var request = require('request');
var host = 'http://localhost:3004';

describe("A spec (with setup and tear-down)", function() {
  beforeEach(function() {
    foo = 0;
    foo += 1;
  });
  afterEach(function() {
    foo = 0;
  });

  it("proxy.User.retrieve", function(done) {
    proxy.User.retrieve().then(function(docs) {
      expect(docs.length > 0).toEqual(true);
      done();
    }).fail(function(err) {
      expect(err).toEqual('');
      done();
    })

  });


  it("proxy.User.create", function(done) {
    var model = {
      name: 'zl',
      age: 15
    }
    proxy.User.create(model).then(function(doc) {
      expect(doc.name).toEqual(model.name);
      expect(doc.id > 0).toEqual(true);
      done();
    }).fail(function(err) {
      expect(err).toEqual('');
      done();
    })
  });
});

var request = require('request');
var host = 'http://localhost:3004';
var proxy = require('../proxy');

var frisby = require('frisby');


frisby.create('GET user johndoe')
  .get(host + '/users')
  .expectStatus(200)
  .expectJSONTypes({
    id: Number,
    username: String,
    is_admin: Boolean
  })
  .expectJSON({
    id: 3,
    username: 'johndoe',
    is_admin: false
  })
  // 'afterJSON' automatically parses response body as JSON and passes it as an argument 
  .afterJSON(function(user) {
    // You can use any normal jasmine-style assertions here 
    expect(1+1).toEqual(2);
 
    // Use data from previous result in next test 
    frisby.create('Update user')
      .put(URL_AUTH + '/users/' + user.id + '.json', {tags: ['jasmine', 'bdd']})
      .expectStatus(200)
    .toss();
  })
.toss();

describe("api接口测试", function() {
  it("/users 获取用户列表", function(done) {
    var opt = {
      url: host + '/users',
      method: 'get',
      timeout: 20 * 1000
    }
    
    request(opt, function(err, response, body) {
      expect(err).toEqual(null)
      
      var json = JSON.parse(body);
      expect(json.state).toEqual('success');
      done();
    })
  })

  // it('/user 添加用户', function(done) {
  //   var opt = {
  //     url: host + '/user',
  //     method: 'post',
  //     timeout: 20 * 1000
  //   }

  //   request(opt, function(err, response, body) {
  //     expect(err).toEqual(null)
  //     console.log(body);
  //     var json = JSON.parse(body);
  //     expect(json.state).toEqual('success');
  //     done();
  //   })
  // })
})
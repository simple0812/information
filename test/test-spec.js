var request = require('request');
var host = 'http://localhost:3004';
var proxy = require('../proxy');

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
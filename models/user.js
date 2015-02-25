var _ = require('underscore');

function User(id, name) {
	this.id = id;
	this.name = name;
}


User.prototype.create = function() {
	
}


User.new = function(obj) {
	var user = new User();
	for(var each in obj) {
		if(_.has(user, each)) user[each] = obj[each];
	}

	return user;
}


module.exports = User;


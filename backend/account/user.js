

const _ =  require('lodash');

var _users = [
	{
		id: '000123ABC',
		username: 'joenil@gmail.com',
		password: 'joenil123.',
		displayName: 'Joenil',
		email: 'joenil@gmail.com'
	}
];

/**
 * @description This will handle in finding user by ID
 * @param {String} id - ID of the user
 * @param {Requester~requestCallback} callback - callback
 */
exports.findById = (id, callback) => {
	//console.log('findById', id);
	let user = _.find(_users, {id: id});
	if ( user ) {
		callback(null, user);
	} 
	else {
		callback(new Error(`User ${id} does not exist!`), null);
	}
}


/**
 * @description This will handle to find user by username
 * @param {String} username - Username of the user
 * @param {Requester~requestCallback} callback - callback
 */
exports.findByUsername = (username, callback) => {
	//console.log('findByUsername', username);
	let user = _.find(_users, {username: username});
	if ( user ) {
		callback(null, user);
	}
	else {
		callback(new Error(`Username ${username} does not exist!`), null);
	}
}

/**
 * @description This will handle register user
 * @param {Object} user - user credentials
 */
exports.addUserToCache = (user) => {
	if ( user ) {
		_users.push(user);
	}
}

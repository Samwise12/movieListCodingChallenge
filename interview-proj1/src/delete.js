var filter = require ('lodash/filter');
var method = require ('lodash/method');

var users = [
  { 'user': 'Barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];

let e = 'barney';
let x = filter(users, o=>{
	return o.user.toLowerCase() == e;	
}
	)

console.log(x)

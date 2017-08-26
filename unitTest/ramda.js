const R = require('ramda');

var classyGreeting = (firstName, lastName) => "The name's " + lastName + ", " + firstName + " " + lastName
var yellGreeting = R.compose(R.toUpper, classyGreeting);
var result2 = yellGreeting('James', 'Bond'); //=> "THE NAME'S BOND, JAMES BOND"

var result = R.compose(Math.abs, R.add(1), R.multiply(2))(-5) //=> 7

console.log(`123`);

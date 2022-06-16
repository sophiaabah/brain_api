// commonJS syntax

const largeNumber = require './script2';

var a = largeNumber.largeNumber;
var b = 50;

console.log(a + b);


//const largeNumber = require('./script2.js');
 
import { largeNumber } from './script2.js'

var a = largeNumber;
var b = 5;




	console.log(a + b);	

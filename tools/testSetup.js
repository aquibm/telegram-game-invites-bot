process.env.NODE_ENV = 'test';

require('babel-register')();

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
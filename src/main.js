"use strict";

var React = require('react');
var Router = require('react-router');
var router = require('./routes');

//Router.run(router, Router.HistoryLocation,  function(Handler) {
Router.run(router, function(Handler) {	
	React.render(<Handler />, document.getElementById('app'));
});

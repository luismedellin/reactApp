$ = jQuery = require('jquery');
var React = require('react');
var Router = require('react-router');
var router = require('./routes');

Router.run(router, function(Handler) {
	React.render(<Handler />, document.getElementById('app'));
})

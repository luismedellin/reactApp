"use strict"; //evaluar todo lo que estamos haciendo en modo estricto

var React = require('react');

var Home = React.createClass({
	render: function (){
		return (
			<div className='container'>
				<h1>Pluralsight Administration</h1>
				<p>React, React Router, and Flux for ultra-responsive web apps.</p>
			</div>
		);
	}
});

module.exports = Home;
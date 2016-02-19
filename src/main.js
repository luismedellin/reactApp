$ = jQuery = require('jquery');
var React = require('react');

var Header = require('./components/common/header');
var Home = require('./components/homePage');
var Authors = require('./components/authors/authorPage');
var About = require('./components/about/aboutPage');

(function(win) {
	"use strict"; 
	var App = React.createClass({
		render(){
			var Child;
			switch(this.props.route){
				case "about": Child = About; break;
				case "author": Child = Authors; break;
				default: Child = Home;
			}
			return (
				<div>
					<Header />
					<Child />
				</div>
			)
		}
	});

	function render() {
		var route = win.location.hash.substr(1);
		React.render(<App route={route} />, document.getElementById('app'));
	}

	win.addEventListener('hashchange', render);
	render();

})(window);
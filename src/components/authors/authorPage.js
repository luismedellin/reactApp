"use strict";

var React = require('react');
var AuthorApi = require('../../api/authorApi');
var AuthorList = require('./authorList');

var AuthorPage = React.createClass({

	getInitialState(){
		return {
			authors:[]
		}
	},

	componentDidMount(){
		if(this.isMounted()){
			this.setState({ authors: AuthorApi.getAllAuthors() });
		}
	},

	render: function() {

		var createAuthorRow = function (author) {
			return (
				<tr key={author.id}>
					<td><a href={"/#author/"+author.id}>{author.id}</a></td>
					<td>{author.firstName} {author.lastName}</td>
				</tr>
			);
		};

		return (
			<div>
				<h1>Authors</h1>
				<AuthorList authors={this.state.authors} />
			</div>
		);
	}
});

module.exports = AuthorPage;
"use strict";

var React = require('react');
var AuthorApi = require('../../api/authorApi');

var Authors = React.createClass({

	getInitialState(){
		return {
			authors:[]
		}
	},

	componentWillMount(){
		this.setState({ authors: AuthorApi.getAllAuthors() });
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

				<table className='table'>
					<thead>
						<tr>
							<td>ID</td>
							<td>Name</td>
						</tr>
					</thead>
					<tbody>
						{
							this.state.authors.map(createAuthorRow, this)
						}
					</tbody>
				</table>

			</div>
		);
	}
});

module.exports = Authors;
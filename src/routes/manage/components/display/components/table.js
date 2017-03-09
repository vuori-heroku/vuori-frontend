import React from 'react';
import JsonTable from 'react-json-table';
class Table extends React.Component {
	
	render() {
		var settings = {
			classPrefix: "json-cell"
  		}
		return (
		<JsonTable className="ui celled table" rows={ this.props.results } settings={ settings } />
		)
	}
}
export default Table
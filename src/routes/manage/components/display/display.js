import React from 'react';
import Table from './components/table.js';

class Display extends React.Component {

	render() {
			return (
				<div className="Display">
						<Table results={this.props.results} />
				</div>
		);
	}
}
 export default Display

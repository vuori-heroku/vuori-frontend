import React from 'react';

class ColumnDropDown extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedColumn: ''
		}
		this.onColumnSelected = this.onColumnSelected.bind(this);
	}

	onColumnSelected(e) {
		this.setState({
			selectedColumn: e.target.value
		});

		this.props.onColumnSelected(e);
	}

	render() {

		return (	
			<select className="ui selection dropdown error SQLbuild" name="selectedColumn" value={this.state.selectedColumn} onChange={this.onColumnSelected}>
				<option>All</option>
				{
					this.props.columns.map((column, i) => (<option key={i} value={column}>{column}</option>))
				}
			</select>
		);
	}
}
export default ColumnDropDown
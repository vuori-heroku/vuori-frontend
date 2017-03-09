import React from 'react';

class TableDropDown extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedTable: 'customer'
		};

		this.onTableSelected = this.onTableSelected.bind(this);
	}

	onTableSelected(e) {
		this.setState({
			selectedTable: e.target.value
		});

		this.props.onTableSelected(e);
	}

	render() {
		return (
				<select className="ui selection dropdown error SQLbuild" name="selectedTable" value={this.state.selectedTable} onChange={this.onTableSelected}>
					{
						this
							.props
							.tables.map((table, i) => (<option key={i} value={table}>{table}</option>))
							
					}
				</select>
		);
	}
}

export default TableDropDown
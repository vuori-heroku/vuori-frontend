import React from 'react';
import TableDropDown from './components/tableDropDown.js';
import ColumnDropDown from './components/columnDropDown.js';
import DatePicker from 'react-datepicker';
import { logout } from '../../../../AuthService.js';

require('react-datepicker/dist/react-datepicker.css');

class Search extends React.Component {
	constructor(props) {
		super(props);
			this.state = {
				input: '',
				selectedTable: 'customer',
				selectedColumn: 'All',
				sqlInput: '',
				startDate: '',
				endDate: '',
				SQLDate: ''
			}
		this.handleChange = this.handleChange.bind(this);
		this.buildQuery = this.buildQuery.bind(this);
		this.onTableSelected = this.onTableSelected.bind(this);
		this.onColumnSelected = this.onColumnSelected.bind(this);
		this.searchQuery = this.searchQuery.bind(this);
		this.onStartDateSelected = this.onStartDateSelected.bind(this);
		this.onEndDateSelected = this.onEndDateSelected.bind(this);
	}

	handleChange = ( e ) => {
		console.log(e.target);
	    this.setState({[e.target.name]: e.target.value})
	    if(e.target.name === 'input') {
	    	this.props.onInputChange(e.target.value);
	    }
	}

	searchQuery() {
		if(this.state.startDate && this.state.endDate) {
			this.props.onSearch(`${this.state.sqlInput} where timestamp between '${this.state.startDate.toISOString()}' and '${this.state.endDate.toISOString()}'`, 'query');
		} else {
			this.props.onSearch(this.state.sqlInput, 'query');
		}
	}

	buildQuery() {
		if(this.state.startDate && this.state.endDate) {
			if(this.state.selectedColumn === 'All') {
				this.props.onSearch(`select * from tests.${this.state.selectedTable} where timestamp between '${this.state.startDate.toISOString()}' and '${this.state.endDate.toISOString()}'`, 'build');
			} else {
				this.props.onSearch(`select * from tests.${this.state.selectedTable} where ${this.state.selectedColumn} = '${this.state.input}' and timestamp between '${this.state.startDate.toISOString()}' and '${this.state.endDate.toISOString()}'`, 'build');
			}

		} else {
			if(this.state.selectedColumn === 'All') {
				this.props.onSearch(`select * from tests.${this.state.selectedTable}`, 'build');
			} else {
				this.props.onSearch(`select * from tests.${this.state.selectedTable} where ${this.state.selectedColumn} = '${this.state.input}'`, 'build');
			}
		}
	}
	onTableSelected(e) {
		this.setState({
			selectedTable: e.target.value,
			selectedColumn: 'All'
		})
		this.props.onTableSelected(e.target.value);
	}
	onColumnSelected(e) {
		this.setState({
			selectedColumn: e.target.value
		})
		this.props.onColumnSelected(e.target.value);
	}
	onStartDateSelected(date) {
		this.setState({
			startDate: date
		})
	}
	onEndDateSelected(date) {
		this.setState({
			endDate: date.endOf('day')
		})
	}


	render() {
		console.log('the date is ' + this.state.startDate)
		console.log('the date is ' + this.state.endDate)
		console.log(JSON.stringify(this.props.schema[0]))

		const columnValues =
					this
					.props
					.schema
					.filter(({tableName}) => tableName === this.state.selectedTable)[0] &&
					this
					.props
					.schema
					.filter(({tableName}) => tableName === this.state.selectedTable)[0].columns || []

		console.log("schema: " + JSON.stringify(this.props.schema));

		return (

			<div className="Search">
				<div>
					<TableDropDown onTableSelected={this.onTableSelected} tables={this.props.schema.map(param => param.tableName)} />
					<ColumnDropDown onColumnSelected={this.onColumnSelected} columns={columnValues} />
					<button className="huge ui inverted red button SQLbuild" onClick={this.buildQuery}>Go!</button>

					{
						this.state.selectedColumn !== 'All'
							? (<input className="SQLbuild" name="input" value={this.state.value} onChange={this.handleChange} />)
							: null
					}

					<button className="huge ui inverted red button SQLsearch" onClick={this.searchQuery}>Run Query</button>
					<input id="customInput" className="SQLsearch" placeholder="Enter custom SQL query..." name="sqlInput" value={this.state.value} onChange={this.handleChange} />


				</div>
				<div className="dateRange">
					<DatePicker onChange={this.onStartDateSelected}
								id="startDate"
								type="date"
								placeholderText="start date..."
								name="startDate"
								selected={this.state.startDate}
								/>
					<DatePicker onChange={this.onEndDateSelected}
								id="endDate"
								type="date"
								placeholderText="end date..."
								name="endDate"
								selected={this.state.endDate}
								/>
					<button id="logoutButton" className="huge ui inverted red button" onClick={logout}>Log Out</button>
					<button className="huge ui inverted red button" id="download" onClick={this.props.onDownload}>Download as CSV</button>

				</div>
			</div>
		);
	}
}
export default Search

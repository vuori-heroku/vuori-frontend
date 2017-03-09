import React from 'react';
import Search from './components/search/search.js';
import Display from './components/display/display.js';
import axios from 'axios';
import csv from 'to-csv';
import download from '../../lib/download';

var ReactToastr = require('react-toastr');
var {ToastContainer} = ReactToastr;
var ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);


class Manage extends React.Component {
	constructor(props) {
		super(props);
		this.search = this.search.bind(this);

		this.state = {
			schema: [],
			results: [],
			tableName: 'customer',
			columnName: 'All',
			input: ''
		}
		this.onTableSelected = this.onTableSelected.bind(this);
		this.exportCsv = this.exportCsv.bind(this);
	}
	componentWillMount() {
		axios
			.get('http://localhost:3010/api/schema')
			.then(response => {
				this.setState({
					schema: response.data
				})
			});
	}


	search(sqlQuery, queryType) {
		axios
			.post(`http://localhost:3010/api/query`, {
				query: sqlQuery
			})
			.then(response => {
				this.setState({
					results: response.data.data
				});

				if(queryType === 'build') {
					if(response.data.data.length === 0) {
						this.refs.container.warning(
							`Couldn't find any records that match that query`,
							'Oops', {
							timeOut: 1000,
							extendedTimeOut: 2000
						});
					} else {
						if(this.state.columnName === 'All') {
							this.refs.container.success(
								`Now displaying all ${this.state.tableName}s`,
								'Success', {
								timeOut: 1000,
								extendedTimeOut: 2000
							});
						} else {
							this.refs.container.success(
								`Now displaying all ${this.state.columnName}s = ${this.state.input}`,
								'Success', {
								timeOut: 1000,
								extendedTimeOut: 2000
							});
						}
					}
				} else {
					let quotes = ['Query executed!', 'Will you query me?', 'Query executed!', 'Query me once... Shame on you.', 'Query executed!', 'Query executed!', 'Query executed!', 'Magical Query Tim, just magical!', 'Query executed!', 'Query executed!', 'Great Query Tim! Keep at it!', 'At this rate, Vuori will be unstoppable!', 'Query executed!', 'Query executed!', 'Query executed!', 'On fire Tim, what a wonderful query!', 'Query executed!'];
					let num = Math.floor(Math.random()*quotes.length);
					this.refs.container.success(
						`${quotes[num]}`,
						'Success', {
						timeOut: 1000,
						extendedTimeOut: 1500
					})
				}

			})
			.catch(error => {
				this.refs.container.error(
				`Try Again`,
				'Bad Query', {
					timeOut: 1000,
					extendedTimeOut: 1500
				})
			});
	}

	exportCsv() {
		var csvFile = csv(this.state.results);
		download(csvFile, `${this.state.tableName}.csv`, 'text/csv');
	}

	onTableSelected(tableName) {
		this.setState({
			tableName
		})
	}

	onColumnSelected(columnName) {
		this.setState({
			columnName
		})
	}

	onInputChange(input) {
		this.setState({
			input
		})
	}

	addAlert () {
		if(this.state.results) {

		} else {

		}
	}

	render() {
		return (
			<div className="Manage">
				<ToastContainer ref="container"
					toastMessageFactory={ToastMessageFactory}
					className="toast-top-right" />
				<header id="pageheader">Vuori <small>The Rise. The Shine.</small>
				</header>
				<div className="ui input error" id="a">
					<Search
						schema={this.state.schema}
						onSearch={this.search}
						onTableSelected={this.onTableSelected}
						onColumnSelected={this.onColumnSelected}
						onInputChange={this.onInputChange}
						onDownload={this.exportCsv} />
				</div>
					<Display results={this.state.results} />
			</div>
		);
	}
}
export default Manage

// Search for a specific Crypto Currency
import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import { loadCoin } from '../modules/coin'; // Import loadCoinList 3rd Party API to use for Coin Search.

export default class CurrencySearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: '', results: 0}
		this.update = this.update.bind(this);
	}

	update(event) {
		this.setState({
			value: event.target.value,
			results: loadCoin(event.target.value)
		})
	}

	render() {
		return (
			<div>
				<SearchBox txt={this.state.value}
					update={this.update}/>
				<SearchResults result={this.state.results}/>
			</div>
		)
	}
}

const SearchBox = (props) => {
	return (
		<div id="searchbox">
		<input type="text" onChange={props.update} />
		</div>
	);
}

const SearchResults = (props) => {
	return (
		<div id="results">
			<p className="center">Coin Search</p>
		</div>
	)
}

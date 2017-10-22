// Search for a specific Crypto Currency
import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import { loadCoinList } from '../modules/coin'; // Import loadCoinList 3rd Party API to use for Coin Search.

export default class CurrencySearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {currency: ''};
		this.handleSearch = this.handleSearch.bind(this);
	}

	handleSearch(event) {
		this.setState({
			currency: event.target.currency
		});
	}

	// Call "loadCoinList" and display the coin that is being search for along with relevant information.
	// render() {
		// Add Search Code Here...
	// }
}
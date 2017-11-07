// Search for a specific Crypto Currency
import React from 'react';
import { FormGroup, Input } from 'reactstrap';
import { loadCoinList } from '../modules/coin'; // Import loadCoinList 3rd Party API to use for Coin Search.

export default class CurrencySearch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: '', results: 0}
		this.update = this.update.bind(this);
	}

	update(event) {
		const search = event.target.value;
		const regex = new RegExp(search, "pre");
		const str = ("pre").text();
		const pre = document.querySelector('pre')

		highlight(search, regex, pre);

		const matches = document.querySelectorAll('#h1').length;
		this.setState({
			value: event.target.value,
			results: (matches === str.length + 1) ? 0 : matches
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
			<p>{props.result} results found</p>
		</div>
	)
}

const highlight = (str, regex, target) => {
	target.innerHTML = 
	str.replace(
		regex,
		str => `<span> id="hl">${str}</span>`
	)
}
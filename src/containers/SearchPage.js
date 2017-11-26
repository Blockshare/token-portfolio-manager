import React from 'react';
import {Row, Col, Container} from 'reactstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CoinHoldingBox from '../components/CoinHoldingBox';
import {updateHoldings} from '../modules/account';
import {coinPage, hourlyChanges} from '../modules/message';
import {loadCoin, loadCoinChartData, clearChart, loadOrderBook} from '../modules/coin';
import {updateHoldingInput} from '../modules/ui';
import numeral from 'numeral';
import CoinPageTabs from '../components/CoinPageTabs';
import {formatMoney} from '../utils';

class SearchPage extends React.Component {
	static ProtoTypes = {}

	componentDidMount() {
		this.props.loadCoin(this.props.match.params.coin, this.props.currency);
	}

	render() {
		const props = this.props;
		const coin = props.coin;
		const currency = this.props.currency;
	}
}

{/* More Code Needs to be added to this page for full funtionality. */}
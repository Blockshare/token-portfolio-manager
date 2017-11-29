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

class NewsPage extends React.Component {
	static ProtoTypes = {}

	

	render() {
		{/* Add News Information Here. */}
	}
}
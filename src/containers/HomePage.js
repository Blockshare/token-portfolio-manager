import React from 'react';
import './Holding.css';
import '../Bass.css';
import {Row, Col, Container, Button} from 'reactstrap';
import Tabs from '../components/Tabs';
import CurrencySelector from '../components/CurrencySelector';
import CurrencySearch from '../components/CryptoCurrencySearch'; // Import Currency Search Bar for easier access.
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeCurrency, loadCoinList} from '../modules/coin';
import {
  holdingsList,
  portfolioValue,
  porfolioValueChange,
  signinSuccess,
  loadHoldings
} from '../modules/account';
import numeral from 'numeral';
import {formatMoney} from '../utils';
import {message,
        buttons
} from '../modules/message';

class HomePage extends React.Component {
  static PropTypes = {}


  signin() {
    const blockstack = window.blockstack
    blockstack.redirectToSignIn()
  }

  onCurrencyChange(currency) {
    this.props.changeCurrency(currency);
    this.props.loadCoinList(currency);
  }

  render() {
    const signInButton = (
      <div className="mt-4 overlay">
        <button className="btn not-rounded" onClick={this.signin}>{buttons.signInButton}</button>
      </div>
    )

    const currencyChange = (
        <span className={this.props.porfolioValueChange > 0 ? 'text-success' : 'text-danger'}>
          {formatMoney(this.props.currency, this.props.porfolioValueChange)}
          {this.props.porfolioValueChange > 0 ? '↑' : '↓'}
        </span>);
    const currencyValue = (
        <h1>{formatMoney(this.props.currency, this.props.portfolioValue)}<br/>
          <small className="text-muted bold h1">{message.holdings}</small>
          <small className="text-muted">{message.value}</small>
        </h1>
    )

    const currencyChangeEl = this.props.user ?  (
        <h3>
          {currencyChange}<br/>
          <small className="text-muted">24h Change</small>
        </h3>
    ): null;
    const header = !!this.props.user ? currencyValue : signInButton
    return (
        <Container>
          <Row className="mt-5 mb-5">
            <Col xs="5" sm="5">
              {header}
            <Col xs="4" sm="4">
            </Col>
            </Col>
            <Col xs="5" sm="5">
              {/*<CurrencySearch/>*/}
            </Col>
            <Col xs="2" sm="2">
              {currencyChangeEl}
              {/*<CurrencySelector currency={this.props.currency}
                                onChange={this.onCurrencyChange.bind(this)}/>*/}
            </Col>
          </Row>
          <Row>
            <Tabs
                user={this.props.user}
                currency={this.props.currency}
                list={this.props.list}
                holdingsList={this.props.holdingsList}
                holdings={this.props.holdings}
                signin={this.signin}
            />
          </Row>
        </Container>
    )
  }
}

const mapStateToProps = state => ({
  list: state.coin.list,
  holdingsList: holdingsList(state),
  holdings: state.account.holdings,
  portfolioValue: portfolioValue(state),
  porfolioValueChange: porfolioValueChange(state),
  currency: state.coin.currency,
  user: state.account.user,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changeCurrency,
  loadCoinList,
  signinSuccess,
  loadHoldings,
}, dispatch)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)

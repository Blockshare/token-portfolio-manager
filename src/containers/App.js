// App functionality page.
import React from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import About from './about';
import '../Bass.css';
import HomePage from './HomePage';
import CoinPage from './CoinPage';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Button
} from 'reactstrap';
import {message} from '../modules/message';
import {signinSuccess, signout, loadHoldings, updateHoldings} from '../modules/account';
import {loadCoinList} from '../modules/coin';
import {buttons} from '../modules/message';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


window.blockstack = require('blockstack');
window.blockstackStorage = require('blockstack-storage');
window.axios = require('axios');


class App extends React.Component {

  componentDidMount() {
    let userData, user;
    const blockstack = window.blockstack;
    //
    if (blockstack.isUserSignedIn()) {
      userData = blockstack.loadUserData();
      user = new blockstack.Person(userData.profile);
      this.props.signinSuccess(user);
      this.props.loadHoldings();
      // Avatar check in console to make sure identity image works correctly.
      console.log(user.avatarUrl());

    } else if (blockstack.isSignInPending()) {
      blockstack.handlePendingSignIn()
          .then((userData) => {
            console.log(userData);
            window.location = window.location.origin;
          })
    }
    this.props.loadCoinList();
  }

  render() {

    const user = this.props.user;

    // Signout functionality
    const signoutButton = user ? (
            <div>
              <button className="btn not-rounded" type="submit" onClick={() => this.props.signout()}>{buttons.signOutButton}</button>
            </div>
        ) : null;

    // Load Blockstack Identity Image.
    const image = user ? (
        <div>
          <img className="circle" src={this.props.user.avatarUrl()} width="64" height="64" alt="" />
        </div>
      ) : null;

    return (
        <div className="App">
          <Navbar color="faded">
            <Container>
              <NavbarBrand className="caps bold">{message.appname}</NavbarBrand>
              <Collapse isOpen={false} navbar>
                <Nav className="ml-auto caps bold" navbar>
                  <NavItem className="mr-2">
                    <Link to="/about-us">{message.about}</Link>
                  </NavItem>
                </Nav>
              </Collapse>
              <div className="left-align">{image}</div>
              <div className="right-align">{signoutButton}</div>
            </Container>

          </Navbar>
          <main>
            <Route exact path="/" component={HomePage} />
            <Route path="/coin/:coin" component={CoinPage} />
            <Route exact path="/about-us" component={About} />
          </main>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.account.user,
  signedIn: state.account.signedIn,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  signinSuccess,
  loadHoldings,
  updateHoldings,
  signout,
  loadCoinList,
}, dispatch)

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App))

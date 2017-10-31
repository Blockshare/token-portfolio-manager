import React from 'react';
import {Route, Link, withRouter} from 'react-router-dom';
import About from './about';
//import '../App.css';
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
import {buttons, message} from '../modules/message';
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
      // Check to make sure the users avatar is still available from whatever storage they are using.
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
          <img className="circle" src={this.props.user.avatarUrl()} width="64" height="64" />
        </div>
      ) : null;

    return (
        <div className="App">
          <Navbar color="faded">
            <Container>
              <NavbarToggler right onClick={this.toggle}/>
              <NavbarBrand className="left-align caps bold">{message.appname}</NavbarBrand>
              <NavbarBrand className="caps bold" href="/">{image}</NavbarBrand>
              <Collapse isOpen={false} navbar>
                <Nav className="ml-auto caps bold" navbar>
                  <NavItem className="mr-2">
                    <Link to="/about-us">{message.about}</Link>
                  </NavItem>
                </Nav>
              </Collapse>
              <div>{signoutButton}</div>
              <Link className="right-align" to="/about-us">{message.about}</Link>
            </Container>

          </Navbar>
          <main>
            <Route exact path="/" component={HomePage}/>
            <Route path="/coin/:coin" component={CoinPage}/>
            <Route exact path="/about-us" component={About}/>
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

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
import {signinSuccess, signout, loadHoldings, updateHoldings} from '../modules/account';
import {loadCoinList} from '../modules/coin';
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

    const signoutButton = user ? (
            <NavItem>
              <a href="#" onClick={() => this.props.signout()}>Logout</a>
            </NavItem>
        ) : null;

    const image = user ? (
        <NavItem>
          <img src={this.props.user.avatarUrl()} />
        </NavItem>
      ) : null;

    return (
        <div className="App">
          <Navbar color="faded" light toggleable>
            <Container>
              <NavbarToggler right onClick={this.toggle}/>
              <NavbarBrand className="caps bold" href="/">Blockshare.io</NavbarBrand>
              <Collapse isOpen={false} navbar>
                <Nav className="ml-auto caps bold" navbar>
                  <NavItem className="mr-2">
                    <Link to="/about-us">About</Link>
                  </NavItem>
                  {signoutButton}
                  {image}
                </Nav>
              </Collapse>
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

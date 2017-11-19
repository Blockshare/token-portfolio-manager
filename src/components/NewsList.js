import React from 'react';
import {Table} from 'reactstrap';
import CoinRow from './CoinRow';
import {tableMessage, newsList} from '../modules/message';
import '../Bass.css';


export default class NewsList extends React.Component {
  render() {
    return (
      <div className="container">
        <br /><br />
        <div className="italic bold">{newsList.soon}</div>
      </div>
    );
  }
}
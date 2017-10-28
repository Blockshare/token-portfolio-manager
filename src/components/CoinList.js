import React from 'react';
import {Table} from 'reactstrap';
import CoinRow from './CoinRow'
import '../Bass.css';

export default class CoinList extends React.Component {
  render() {

    const holdings = this.props.holdings || {};
    const rows = this.props.list.map((row) => <CoinRow
        currency={this.props.currency}
        key={row.id}
        holdings={holdings[row.id]}
        coin={row}/>);
    return (
        <Table>
          <thead>
          <tr>
            <th></th>
            <th>Coin</th>
            <th>Price</th>
            <th>Market Cap</th>
            <th>24hr Change (%)</th>
            <th>Holdings<br/>24h Change</th>
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </Table>
    );
  }
}


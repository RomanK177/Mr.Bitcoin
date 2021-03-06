import React, { Component } from "react";
import { BitcoinService } from "../../services/BitcoinService";
import Chart from "../../components/Chart/Chart";

class Statistic extends Component {
  state = {
    marketPrice: null,
  };
  componentDidMount() {
    this.getMarketPrice();
  }

  async getMarketPrice() {
    const marketPrice = await BitcoinService.getMarketPrice();
    this.setState({ marketPrice });
  }
  render() {
    const { marketPrice } = this.state;

    return (
      <div className="statistic-page container">
        {marketPrice && <Chart data={marketPrice} />}
      </div>
    );
  }
}

export default Statistic;

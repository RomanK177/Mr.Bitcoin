import React, { Component } from 'react';

import { BitcoinService } from '../../services/BitcoinService';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from '../../store/actions/userActions';
import { eventBus } from '../../services/eventBusService';
import Converter from '../../components/Converter';

import './Homepage.scss';

class _HomePage extends Component {
  state = {
    rate: '',
  };

  async componentDidMount() {
    this.getUser();
    const rate = await BitcoinService.getRate();
    this.setState({ rate });
  }

  async getUser() {
    const user = await this.props.loadUser();
    if (!user) {
      console.log('no user!');
      this.props.history.push('/signup');
      return;
    }
    // const {user} = this.props
    eventBus.emit('user loggedIn', user);
  }
  render() {
    const { rate } = this.state;
    const { user } = this.props;
    if (!user) return <Redirect to="/signup" />;
    return (
      <div className="home-page container flex column">
        <h1>Hello {user.name}!</h1>
        <div className="main flex column align-start">
          <div className="flex auto-center">
            <img src="imgs/coins.png" alt="" />
            <h2>Coins: {user.coins}</h2>
          </div>
          <div className="flex auto-center">
            <img src="imgs/bitcoin.png" alt="" />
            <h2>Rate: {rate}</h2>
          </div>
        </div>
        <Converter></Converter>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = {
  loadUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(_HomePage);

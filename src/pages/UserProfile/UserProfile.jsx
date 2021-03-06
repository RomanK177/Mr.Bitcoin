import './UserProfile.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../store/actions/userActions';
import { BitcoinService } from '../../services/BitcoinService';
import MoveList from '../../components/MovesList';
import UserInfo from '../../components/UserInfo';
import Chart2 from '../../components/Chart2/Chart2';
import moment from 'moment';
class UserProfile extends Component {
  state = {
    rate: null,
  };

  async componentDidMount() {
    await this.props.loadUser();
    const rate = await BitcoinService.getRate();
    this.setState({ rate });
  }
  get lastUserMoves() {
    return JSON.parse(JSON.stringify(this.props.user.moves)).slice(0, 3);
  }
  get userMoves() {
    let userMovesCopy = JSON.parse(JSON.stringify(this.props.user.moves));
    return userMovesCopy.map((move) => {
      move.at = moment(move.at).format('MMM Do');
      move = { x: move.at, y: move.amount };
      return move;
    });
  }
  render() {
    const { user } = this.props;
    const { rate } = this.state;
    if (!user) return <div>Loading...</div>;

    return (
      <section className="user-profile flex column justify-center align-center">
        <div className="user-profile-container flex space-between">
          <UserInfo user={user} rate={rate} />
          <div className="move-list-container">
            <MoveList moves={this.lastUserMoves} isInContact={false} />
          </div>
        </div>
        <div className="chart-container">
          <Chart2
            className="user-chart"
            data={this.userMoves}
            title="Bitcoin transfer"
            desc="My Bitcoin transfers in the last month"
            color="green"
          />
        </div>
      </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);

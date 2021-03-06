import './Header.scss';
import { Component } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { eventBus } from '../../services/eventBusService';

class _Header extends Component {
  componentDidMount() {
    console.log(this.props);
    eventBus.on('details mounted', () => {
      console.log('Details are now mounted');
    });
  }
  // onBack = () => {
  //   this.props.history.goBack();
  // };
  render() {
    return (
      <nav className="header flex auto-center">
        <Link to="/">
          <img src="imgs/home.png" alt="" />
        </Link>
        <Link to="/contacts">
          <img src="imgs/users.png" alt="" />
        </Link>
        <Link to="/statistic">
          <img src="imgs/graph.png" alt="" />
        </Link>
        <Link to="/user-profile">
          <h3>Profile</h3>
        </Link>
      </nav>
    );
  }
}

export const Header = withRouter(_Header);

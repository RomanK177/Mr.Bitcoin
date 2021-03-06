import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import './App.css';
import { ContactPage } from './pages/ContactPage/ContactPage';
import Statistic from './pages/StatisticPage/Statistic';
import { ContactDetails } from './pages/ContactDetailsPage/ContactDetails';
import { ContactEdit } from './pages/ContactEditPage/ContactEdit';
import HomePage from './pages/HomePage/Homepage';

import UserProfile from './pages/UserProfile/UserProfile';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import { Header } from './components/Header/';
import { Footer } from './components/Footer/';
import './assets/scss/global.scss';

import { connect } from 'react-redux';
// import ContactPage from "./pages/ContactPage/ContactPage";
function _App(props) {
  const PriveteRoute = (props) => {
    return props.isAdmin ? <Route {...props} /> : <Redirect to="/" />;
  };
  function goBack() {}
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <PriveteRoute
            isAdmin={true}
            path="/contact/edit/:id?"
            component={ContactEdit}
          />
          <Redirect exact from="/contact/undefined" to="/contacts" />
          <Route
            path="/contact/:id"
            render={(props) => <ContactDetails {...props} goBack={goBack} />}
          />
          <Route path="/contacts/" component={ContactPage} />
          <Route path="/statistic/" component={Statistic} />
          <Route path="/signup/" component={SignUpPage} />
          <Route path="/user-profile/" component={UserProfile} />
          <Route path="/" component={HomePage} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, null)(_App);

import "./Footer.scss";
import { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { eventBus } from "../../services/eventBusService";

class _Footer extends Component {
  componentDidMount() {
    console.log(this.props);
    eventBus.on("details mounted", () => {
      console.log("Details are now mounted");
    });
  }
  onBack = () => {
    this.props.history.goBack();
  };
  render() {
    return <footer>About and stuff</footer>;
  }
}

export const Footer = withRouter(_Footer);

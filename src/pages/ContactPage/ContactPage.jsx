import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContactList } from '../../components/ContactList/ContactList';
import { loadContacts } from '../../store/actions/contactActions';

import { ContactService } from '../../services/ContactServise';

export class _ContactPage extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     contacts: null,
  //     filterBy: null,
  //   };
  //   this.onSetFilter = this.onSetFilter.bind(this);
  // }
  state = {
    filterBy: null,
  };
  componentDidMount() {
    this.loadContacts();
  }
  loadContacts() {
    this.props.loadContacts(this.state.filterBy);
  }
  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, () => this.props.loadContacts(filterBy));
  };
  render() {
    const { contacts } = this.props;
    return (
      <div className="contact-page">
        <h1>Contacts</h1>
        {contacts && (
          <ContactList onSetFilter={this.onSetFilter} contacts={contacts} />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    contacts: state.contactReducer.contacts,
  };
};

const mapDispatchToProps = {
  loadContacts,
};

export const ContactPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactPage);

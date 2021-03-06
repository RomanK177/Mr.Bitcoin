import React, { Component } from 'react';
import { ContactService } from '../../services/ContactServise.js';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getContactById,
  deleteContact,
} from '../../store/actions/contactActions';
import { loadUser, addMove } from '../../store/actions/userActions';
import TransferFund from '../../components/TransferFund';
import MoveList from '../../components/MovesList';

export class _ContactDetails extends Component {
  async componentDidMount() {
    this.loadContact();
    // if (contactId) {
    //   await this.props.getContactById(contactId);
    // }
    // await this.props.loadUser();
  }
  async loadContact() {
    this.props.getContactById(this.props.match.params.id);
    // const robot = await robotService.getById(this.props.match.params.id)
    // this.setState({ robot })
  }
  deleteContact = async () => {
    const { contactId } = this.props.match.params;
    await this.props.deleteContact(contactId);
    this.props.history.push('/contacts');
  };

  transferFund = async (fund) => {
    const move = {
      toId: this.props.contact._id,
      to: this.props.contact.name,
      amount: fund,
      at: Date.now(),
    };
    await this.props.addMove(move);
    // await this.props.loadUser();
  };
  render() {
    const { user } = this.props;
    const { contact } = this.props;

    if (!contact) return <div>Loading...</div>;
    return (
      <div className="contact-details">
        <img src={'https://robohash.org/' + contact._id} alt="" />
        <p>{contact.name}</p>
        <p>{contact.phone}</p>

        <Link to={'/contact/edit/' + contact._id}>Edit</Link>
        <section className="transfer-section">
          <TransferFund
            maxCoins={user.coins}
            transferFund={this.transferFund}
            contactName={contact.name}
          />
          <MoveList
            moves={user.moves}
            contactId={contact._id}
            isInContact={true}
          />
        </section>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    contact: state.contactReducer.contact,
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = {
  getContactById,
  deleteContact,
  loadUser,
  addMove,
};

export const ContactDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactDetails);

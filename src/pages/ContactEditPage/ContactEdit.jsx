import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ContactService } from '../../services/ContactServise.js';
import { Link } from 'react-router-dom';
import { saveContact } from '../../store/actions/contactActions';

export class _ContactEdit extends Component {
  elInput = React.createRef();
  state = {
    contact: {
      name: '',
      phone: '',
      email: '',
    },
    errMsg: '',
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    const contact = id
      ? await ContactService.getById(id)
      : await ContactService.getEmptyContact();
    if (contact) this.setState({ contact });
    else this.setState({ errMsg: 'Robot Not Found!' });
    this.elInput.current.focus();
    this.elInput.current.select();
  }
  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState((prevState) => ({
      contact: { ...prevState.contact, [field]: value },
    }));
  };
  onSaveContact = async (ev) => {
    ev.preventDefault();
    const { contact } = this.state;
    console.log(contact);
    if (!contact.name || !contact.phone || !contact.email)
      return this.setState({ errMsg: 'Please fill up all the above fields' });
    // if (contact._id) await this.props.saveContact(contact);
    else await this.props.saveContact(contact);
    this.props.history.push('/');
  };
  onDelete = () => {
    ContactService.remove(this.state.contact._id);
    this.props.history.push('/contants');
  };
  render() {
    const { contact } = this.state;

    return (
      <div className="contact-details">
        <Link to={`/contact/${contact._id}`}>
          <img className="back-btn" src="./imgs/back.png" alt="" />
        </Link>
        {contact._id && (
          <img
            onClick={this.onDelete}
            className="delete-btn"
            src="./imgs/delete.png"
            alt=""
          />
        )}
        {contact._id && (
          <img src={'https://robohash.org/' + contact._id} alt="" />
        )}
        <form className="flex column" action="" onSubmit={this.onSaveContact}>
          <div className="flex auto-center">
            <label htmlFor="">Name: </label>
            <input
              name="name"
              type="text"
              ref={this.elInput}
              value={contact.name}
              onChange={this.handleChange}
            />
          </div>
          <div className="flex auto-center">
            <label htmlFor="">Phone: </label>
            <input
              name="phone"
              type="text"
              value={contact.phone}
              onChange={this.handleChange}
            />
          </div>
          <div className="flex auto-center">
            <label htmlFor="">Email: </label>
            <input
              name="email"
              type="text"
              value={contact.email}
              onChange={this.handleChange}
            />
          </div>
          <button>Save</button>
          <span className="form-errors">{this.state.errMsg}</span>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = {
  saveContact,
};
export const ContactEdit = connect(null, mapDispatchToProps)(_ContactEdit);

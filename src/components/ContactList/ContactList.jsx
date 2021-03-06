import { ContactPreview } from '../ContactPreview/ContactPreview';
import { ContactFilter } from '../ContactFilter/ContactFilter';
import { Link } from 'react-router-dom';
import './ContactList.scss';
export function ContactList({ contacts, onSetFilter }) {
  return (
    <div>
      <ContactFilter onSetFilter={onSetFilter} />
      <Link to={'/contact/edit/'}>Add</Link>
      <hr />
      <h3>Click on a contact to Transfer BitCoin</h3>
      <ul className="contact-list flex column auto-center">
        {contacts.map((contact) => (
          <ContactPreview contact={contact} key={contact._id} />
        ))}
      </ul>
    </div>
  );
}

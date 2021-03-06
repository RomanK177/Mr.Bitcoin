import { ContactService } from '../../services/ContactServise';

export function loadContacts(filterBy) {
  return async (dispatch) => {
    const contacts = await ContactService.query(filterBy);
    dispatch({ type: 'SET_CONTACTS', contacts });
  };
}

export function getContactById(id) {
  return async (dispatch) => {
    const contact = await ContactService.getById(id);
    dispatch({ type: 'SET_CONTACT', contact });
  };
}

export function saveContact(contact) {
  return async (dispatch) => {
    const isEdit = contact._id ? true : false;
    contact = await ContactService.save(contact);
    if (isEdit) dispatch({ type: 'UPDATE_CONTACT', contact });
    else dispatch({ type: 'ADD_CONTACT', contact });
    return contact;
  };
}

export function deleteContact(id) {
  return async (dispatch) => {
    await ContactService.remove(id);
    dispatch({ type: 'DELETE_CONTACT', id });
  };
}

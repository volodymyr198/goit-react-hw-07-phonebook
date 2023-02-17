import { useSelector } from 'react-redux';

import css from './ContactList.module.css';
import ContactItem from './ContactItem';
import { getFilteredContacts } from 'redux/selectors';
const ContactList = () => {
    const contacts = useSelector(getFilteredContacts);

    return (
        <ul className={css.contactList}>
            {contacts.map(({ id, name, number }, index) => (
                <ContactItem key={id} name={name} number={number} id={id} />
            ))}
        </ul>
    );
};

export default ContactList;

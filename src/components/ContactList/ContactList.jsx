import { useSelector } from 'react-redux';

import css from './ContactList.module.css';
import ContactItem from './ContactItem';
import { getFilteredContacts } from 'redux/selectors';

import { useFetchContactsQuery } from 'redux/contact.slice';
import { getFilter } from 'redux/selectors';

const ContactList = () => {
    const filter = useSelector(getFilter);

    const { data: contacts, isLoading } = useFetchContactsQuery();

    return (
        <ul className={css.contactList}>
            {isLoading && <p>...Loading</p>}
            {contacts &&
                !isLoading &&
                getFilteredContacts(contacts, filter).map(
                    ({ id, name, phone }, index) => (
                        <ContactItem
                            key={id}
                            name={name}
                            number={phone}
                            id={id}
                        />
                    )
                )}
        </ul>
    );
};

export default ContactList;

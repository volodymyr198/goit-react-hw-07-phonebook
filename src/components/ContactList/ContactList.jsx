import { useSelector } from 'react-redux';

import css from './ContactList.module.css';
import ContactItem from './ContactItem';
import { getFilteredContacts } from 'redux/selectors';

import { useFetchContactsQuery } from 'redux/contact.slice';
import { getFilter } from 'redux/selectors';

const ContactList = () => {
    const filter = useSelector(getFilter);

    const { data: contacts, isFetching, error } = useFetchContactsQuery();
    return (
        <ul className={css.contactList}>
            {isFetching && <p>...Loading</p>}
            {error && (
                <p>Sorry, something went wrong, please try again later!</p>
            )}
            {contacts &&
                !isFetching &&
                getFilteredContacts(contacts, filter).map(
                    ({ id, name, phone }) => (
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

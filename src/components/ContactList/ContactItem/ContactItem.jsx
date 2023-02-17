import { useDispatch } from 'react-redux';

import { deleteContact } from 'redux/contactsSlice';

import { PropTypes } from 'prop-types';
import css from './ContactItem.module.css';

const ContactItem = ({ id, name, number }) => {
    const dispatch = useDispatch();

    return (
        <li className={css.contactItem}>
            {name}: <span>{number}</span>
            <button
                onClick={() => dispatch(deleteContact(id))}
                className={css.delBtn}
            >
                Delete
            </button>
        </li>
    );
};

ContactItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
};

export default ContactItem;

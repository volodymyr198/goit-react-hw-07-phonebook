import { PropTypes } from 'prop-types';
import { useDeleteContactMutation } from 'redux/contact.slice';
import css from './ContactItem.module.css';

const ContactItem = ({ id, name, number }) => {
    const [deleteContact] = useDeleteContactMutation();

    return (
        <li className={css.contactItem}>
            {name}: <span>{number}</span>
            <button onClick={() => deleteContact(id)} className={css.delBtn}>
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

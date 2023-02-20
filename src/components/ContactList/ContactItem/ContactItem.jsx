import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';

import { useDeleteContactMutation } from 'redux/contact.slice';
import css from './ContactItem.module.css';

const ContactItem = ({ id, name, number }) => {
    const [deleteContact, { isLoading }] = useDeleteContactMutation();
    const notify = () => toast.info('Contact deleted!');

    return (
        <li className={css.contactItem}>
            {name}: <span>{number}</span>
            <button
                onClick={() => deleteContact(id) && notify()}
                disabled={isLoading}
                className={css.delBtn}
            >
                {isLoading && <RotatingLines height="12" width="12" />}
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

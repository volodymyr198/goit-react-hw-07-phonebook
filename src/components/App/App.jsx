import FormPhonebook from '../FormPhonebook/FormPhonebook';
import ContactList from '../ContactList';
import Filter from '../Filter';
import css from './App.module.css';

const App = () => {
    return (
        <div className={css.wrapper}>
            <h1 className={css.titlePhone}>Phonebook</h1>
            <FormPhonebook />
            <h2 className={css.titleCont}>Contacts</h2>
            <Filter />
            <ContactList />
        </div>
    );
};

export default App;

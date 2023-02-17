import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { addContact } from 'redux/contactsSlice';
import { getFilteredContacts } from 'redux/selectors';
import css from './FormPhonebook.module.css';

const FormPhonebook = () => {
    const contacts = useSelector(getFilteredContacts);

    const dispatch = useDispatch();
    const handleSubmit = (values, { resetForm }) => {
        contacts.find(
            contact => contact.name.toLowerCase() === values.name.toLowerCase()
        )
            ? alert(`${values.name} is already in contacts!`)
            : dispatch(addContact(values)) && resetForm();
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(16, 'Too Long!')
            .required('Name is required field'),

        number: Yup.number()
            .typeError('That does not look like a phone number')
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .min(10)
            .required('A phone number is required'),
    });

    const initialValues = {
        name: '',
        number: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form className={css.formPhone}>
                <label className={css.formLabel}>
                    Name
                    <Field
                        className={css.formInput}
                        type="text"
                        name="name"
                        placeholder="Name"
                    />
                    <ErrorMessage
                        className={css.error}
                        name="name"
                        component="div"
                    />
                </label>
                <label className={css.formLabel}>
                    Number
                    <Field
                        className={css.formInput}
                        type="tel"
                        name="number"
                        pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                        title="Phone number must be in the format 123 456 7890"
                        placeholder="123 456 7890"
                    />
                    <ErrorMessage
                        className={css.error}
                        name="number"
                        component="div"
                    />
                </label>
                <button className={css.formBtn} type="submit">
                    Add contact
                </button>
            </Form>
        </Formik>
    );
};

export default FormPhonebook;

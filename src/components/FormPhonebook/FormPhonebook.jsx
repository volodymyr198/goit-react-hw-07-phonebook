import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    useAddContactMutation,
    useFetchContactsQuery,
} from 'redux/contact.slice';
import css from './FormPhonebook.module.css';

const FormPhonebook = () => {
    const notify = () => toast.info('Contact added!');
    const [addContact] = useAddContactMutation();
    const { data: contacts, isLoading } = useFetchContactsQuery();

    const handleSubmit = (values, { resetForm }) => {
        contacts.find(
            contact => contact.name.toLowerCase() === values.name.toLowerCase()
        )
            ? alert(`${values.name} is already in contacts!`)
            : addContact(values) && notify() && resetForm();
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Name is required field'),

        phone: Yup.number()
            .typeError('That does not look like a phone number')
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .min(10)
            .required('A phone number is required'),
    });

    const initialValues = {
        name: '',
        phone: '',
    };

    return (
        <>
            <ToastContainer />
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
                            name="phone"
                            pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                            title="Phone number must be in the format 123-456-7890"
                            placeholder="123 456 7890"
                        />
                        <ErrorMessage
                            className={css.error}
                            name="phone"
                            component="div"
                        />
                    </label>
                    <button
                        className={css.formBtn}
                        disabled={isLoading}
                        type="submit"
                    >
                        Add contact
                    </button>
                </Form>
            </Formik>
        </>
    );
};

export default FormPhonebook;

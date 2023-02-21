import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';
import {
    useAddContactMutation,
    useFetchContactsQuery,
} from 'redux/contact.slice';
import { useEffect } from 'react';
import css from './FormPhonebook.module.css';

const FormPhonebook = () => {
    const notifyAdd = () => toast.success('Contact added!');
    const notifyError = () =>
        toast.error('Sorry, something went wrong, please try again later!');

    const [addContact, { isLoading, isSuccess, isError }] =
        useAddContactMutation();
    const { data: contacts } = useFetchContactsQuery();

    useEffect(() => {
        if (isSuccess) {
            notifyAdd();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            notifyError();
        }
    }, [isError]);

    const handleSubmit = (values, { resetForm }) => {
        contacts.find(
            contact => contact.name.toLowerCase() === values.name.toLowerCase()
        )
            ? alert(`${values.name} is already in contacts!`)
            : addContact(values) && resetForm();
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
            <ToastContainer autoClose={1000} position="top-center" />
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
                        {isLoading && <RotatingLines height="12" width="12" />}
                        Add contact
                    </button>
                </Form>
            </Formik>
        </>
    );
};

export default FormPhonebook;

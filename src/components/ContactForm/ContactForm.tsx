import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import FormButton from '../FormButton/FormButton';
import { addContact } from '../../redux/contacts/contacts-actions';
import { getContacts } from '../../redux/contacts/contacts-selectors';
import s from './ContactForm.module.css';

export default function ContactForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const isInContacts = (name: string) => {
    name = name.toLowerCase();
    return (
      contacts.filter(contact => contact.name.toLowerCase().includes(name))
        .length > 0
    );
  };

  const addContactToPhonebook = ({ name, phoneNumber }: {name: string, phoneNumber: string}) => {
    if (isInContacts(name)) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact(name, phoneNumber));
  };

  return (
    <div>
      <Formik
        initialValues={{ name: '', phoneNumber: '' }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required()
            .matches(
              /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
              "Name can contain only letters, ', - and space.",
            ),
          phoneNumber: Yup.string()
            .required()
            .matches(
              /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
              'Phone number should contain only numbers and it also could contain spaces, dash, parenthesis and starts with +',
            ),
        })}
        onSubmit={(values, { resetForm }) => {
          addContactToPhonebook(values);
          resetForm();
        }}
      >
        <Form className={s.form}>
          <label className={s.label}>
            Name:
            <Field
              className={s.fieldInput}
              name="name"
              type="text"
              placeholder="enter your name"
            />
            <ErrorMessage
              name="name"
              component="span"
              className={s.validatorError}
            />
          </label>
          <label className={s.label}>
            Phone number:
            <Field
              className={s.fieldInput}
              name="phoneNumber"
              type="tel"
              placeholder="enter your phone number"
            />
            <ErrorMessage
              name="phoneNumber"
              component="span"
              className={s.validatorError}
            />
          </label>
          <FormButton type="submit">Add contact</FormButton>
        </Form>
      </Formik>
      <hr />
    </div>
  );
}

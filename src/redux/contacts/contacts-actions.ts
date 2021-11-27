import { createAction } from '@reduxjs/toolkit';
import { v1 as uuid } from 'uuid';

export const addContact = createAction('contacts/add', (name: string, phoneNumber: string) => ({
  payload: {
    id: uuid(),
    name,
    phoneNumber,
  },
}));

export const deleteContact = createAction<string>('contacts/delete');

export const changeFilter = createAction<string>('contacts/changeFilter');

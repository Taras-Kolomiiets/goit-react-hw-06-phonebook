import { addContact, changeFilter, deleteContact } from './contacts-actions';
import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';

type contactType = {
  id: string;
  name: string;
  number: string;
};

const state: contactType[] = []

const items = createReducer(state, {
  [addContact.type]: (state, { payload }) => [payload, ...state],
  [deleteContact.type]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
  [changeFilter.type]: (_, { payload }) => payload,
});

export default combineReducers({ items, filter });


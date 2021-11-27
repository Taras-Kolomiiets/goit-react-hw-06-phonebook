import IState from '../../interfaces/IState';

export const getContacts = (state: IState) => state.items;

export const getFilter = (state: IState) => state.filter;

export const getFilteredContacts = (state: IState) => {
  const filter = getFilter(state);
  const contacts = getContacts(state);

  const normalizedFilter = filter.toLowerCase();
  return contacts.filter((contact: any) =>
    contact.name.toLowerCase().includes(normalizedFilter),
  );
};

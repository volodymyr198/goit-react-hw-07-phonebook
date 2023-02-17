export const getFilteredContacts = state => {
    const normalizedFilter = state.filter.toLowerCase();
    return state.contacts.items.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
    );
};

export const getFilter = state => state.filter;

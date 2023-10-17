import React, { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');

    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const whenFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const addCont = newCont => {
    const isDuplicateContact = contacts.some(
      contact => contact.name.toLowerCase() === newCont.name.toLowerCase()
    );

    if (isDuplicateContact) {
      Notiflix.Report.warning('Warning', 'This contact already exists', 'Ok');
      return;
    }

    setContacts(prevContacts => [newCont, ...prevContacts]);
  };

  const deleteContact = contactIndex => {
    setContacts(prevState =>
      prevState.filter((_, index) => index !== contactIndex)
    );
  };
  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addCont}></ContactForm>

      <h2>Contacts</h2>
      <Filter filter={filter} whenFilterChange={whenFilter} />
      <ContactList contacts={filterContacts()} deleteContact={deleteContact} />
    </>
  );
}

export default App;

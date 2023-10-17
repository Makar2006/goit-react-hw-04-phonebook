import React, { Component } from 'react';
import Notiflix from 'notiflix';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  whenFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  addCont = newCont => {
    const isDuplicateContact = this.state.contacts.some(
      contact => contact.name.toLowerCase() === newCont.name.toLowerCase()
    );

    if (isDuplicateContact) {
      Notiflix.Report.warning('Warning', 'This contact already exists', 'Ok');
      return;
    }

    this.setState(prevState => ({
      contacts: [newCont, ...prevState.contacts],
    }));
  };

  deleteContact = contactIndex => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter((_, index) => index !== contactIndex),
    }));
  };

  componentDidMount() {
    if (localStorage.getItem('contacts'))
      this.setState({
        contacts: JSON.parse(localStorage.getItem('contacts')) ?? [],
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const contacts = this.filterContacts();
    const name = this.state.name;
    const number = this.state.number;
    const filter = this.state.filter;

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          onSubmit={this.addCont}
        ></ContactForm>

        <h2>Contacts</h2>
        <Filter filter={filter} whenFilterChange={this.whenFilter} />
        <ContactList contacts={contacts} deleteContact={this.deleteContact} />
      </>
    );
  }
}

export default App;

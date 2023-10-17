import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  whenChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  whenSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const contactId = nanoid();

    if (name === '' || number === '') {
      alert('Please fill in all fields.');
      return;
    }

    const contact = {
      id: contactId,
      name,
      number,
    };
    this.props.onSubmit(contact);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.whenSubmit} className={css.contactForm}>
        <label>
          <span className={css.formSpan}>Name:</span>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.whenChange}
            pattern="^[a-zA-Zа-яА-Я]+([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*$"
            title="Name may contain only letters, apostrophe, dash and spaces."
            required
            autoComplete="off"
          />
        </label>
        <label>
          <span className={css.formSpan}>Phone Number:</span>
          <input
            type="text"
            id="number"
            name="number"
            value={number}
            onChange={this.whenChange}
            pattern="[0-9\-]+"
            title="Phone number must be digits"
            required
            autoComplete="off"
          />
        </label>
        <button type="submit" className={css.formButton}>
          Add Contact
        </button>
      </form>
    );
  }
}
export default ContactForm;

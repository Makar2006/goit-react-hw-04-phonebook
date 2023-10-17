import React, { useState } from 'react';
import css from './ContactForm.module.css';

function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const whenChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const whenSubmit = e => {
    e.preventDefault();
    if (name === '' || number === '') {
      alert('Please fill in all fields.');
      return;
    }
    onSubmit({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={whenSubmit} className={css.contactForm}>
      <label>
        <span className={css.formSpan}>Name:</span>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={whenChange}
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
          onChange={whenChange}
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
export default ContactForm;

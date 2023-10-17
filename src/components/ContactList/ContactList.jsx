import css from './ContactList.module.css';

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className={css.contactList}>
      {contacts.map((contact, i) => (
        <li key={i} className={css.contactListItem}>
          <span className={css.listSpan}>
            {contact.name}: {contact.number}
          </span>
          <button onClick={() => deleteContact(i)} className={css.deleteButton}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

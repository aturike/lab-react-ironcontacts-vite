// src/App.js
import { useState } from "react";
import "./App.css";
import contacts from "./contacts.json";

function App() {
  const [contactsArr, setContactsArr] = useState([...contacts].slice(0, 5));

  const handleDeleteClick = (id) => {
    setContactsArr(contactsArr.filter((contact) => contact.id !== id));
  };

  const handleAddRandomClick = () => {
    const newIndex = Math.floor(Math.random() * contacts.length);
    let newElement = contacts[newIndex];

    while (contactsArr.indexOf(newElement) !== -1) {
      newElement = contacts[Math.floor(Math.random() * contacts.length)];
    }

    setContactsArr((current) => [...current, newElement]);
  };

  const handleSortClick = (objkey) => {
    setContactsArr(
      [...contactsArr].sort((a, b) => {
        if (a[objkey] > b[objkey]) {
          return -1;
        } else {
          return 1;
        }
      })
    );
  };

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={handleAddRandomClick}>Add random contact</button>
      <button onClick={() => handleSortClick("popularity")}>
        Sort by popularity
      </button>
      <button onClick={() => handleSortClick("name")}>Sort by name</button>
      <table className="table">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactsArr.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img
                  className="profile-img"
                  src={contact.pictureUrl}
                  alt={"picof" + contact.name}
                />
              </td>
              <td>
                <h3>{contact.name}</h3>
              </td>
              <td>
                <h3>{contact.popularity.toFixed(2)}</h3>
              </td>
              <td>{contact.wonOscar && <span>🏆</span>}</td>
              <td>{contact.wonEmmy && <span>🏆</span>}</td>
              <td>
                <button onClick={() => handleDeleteClick(contact.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;

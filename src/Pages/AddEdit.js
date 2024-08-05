import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDatabase, ref, push, onValue, update, off } from "firebase/database";
import { toast } from 'react-toastify';
import '../Pages/Edit.css';
import app from "../FirebaseConfig";

const initialState = {
  name: '',
  email: '',
  contact: '',
  status: '',
};

function AddEdit() {
  const [state, setState] = useState(initialState);
  const { name, email, contact, status } = state;
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const db = getDatabase(app);
    const contactsRef = ref(db, 'contacts');

    const handleData = (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    };

    onValue(contactsRef, handleData);

    return () => {
      off(contactsRef, 'value', handleData);
      setData({});
    };
  }, []);

  useEffect(() => {
    if (id && data[id]) {
      setState({ ...data[id] });
    } else {
      setState(initialState);
    }
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact || !status) {
      toast.error('Please provide value in each input');
    } else {
      const db = getDatabase(app);
      if (id) {
        const contactRef = ref(db, `contacts/${id}`);
        update(contactRef, state)
          .then(() => {
            toast.success('Contact updated successfully');
          })
          .catch((err) => {
            toast.error(err.message);
          });
      } else {
        const contactsRef = ref(db, 'contacts');
        push(contactsRef, state)
          .then(() => {
            toast.success('Contact added successfully');
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }

      setTimeout(() => navigate('/'), 500);
    }
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <form className='editform' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Your Name'
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='Your Email'
          value={email || ""}
          onChange={handleInputChange}
        />
        <label htmlFor='contact'>Contact</label>
        <input
          type='number'
          id='contact'
          name='contact'
          placeholder='Your Contact'
          value={contact || ""}
          onChange={handleInputChange}
        />
        <label htmlFor='name'>Status</label>
        <input
          type='text'
          id='status'
          name='status'
          placeholder='Your Status...'
          value={status || ""}
          onChange={handleInputChange}
        />
        <input type='submit' value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
}

export default AddEdit;

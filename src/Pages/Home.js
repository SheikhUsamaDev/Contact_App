import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off, remove, query, orderByChild, equalTo } from 'firebase/database';
import '../Pages/Home.css';
import app from '../FirebaseConfig';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { snapshotEqual } from 'firebase/firestore/lite';

function Home() {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);

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

  const onDelete = (id) => {
    if (window.confirm("Are you sure that you wanted to delete that contact?")) {
      const db = getDatabase(app);
      const contactRef = ref(db, `contacts/${id}`);

      remove(contactRef)
        .then(() => {
          toast.success("Contact deleted successfully");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  const handleChange = (e) => {
    setSort(true);
    const db = getDatabase(app);
    const contactRef = ref(db, 'contacts');
    const contactsQuery = query(contactRef, orderByChild(e.target.value));

    const handleData = (snapshot) => {
      let sortedData = [];
      snapshot.forEach((snap) => {
        sortedData.push(snap.val());
      });
      setSortedData(sortedData);
    };

    onValue(contactsQuery, handleData);

    return () => {
      off(contactsQuery, 'value', handleData);
    };
  };

  const handleReset = () => {
    setSort(false);
    setSortedData([]);
  };
  

  const filterData = (value) => {
    const db = getDatabase(app);
    const statusRef = ref(db, 'contacts');
    const statusQuery = query(statusRef, orderByChild("status"), equalTo(value));
  
    const handleData = (snapshot) => {
      if (snapshot.val()) {
        const data = snapshot.val();
        setData(data);
      } else {
        setData({});
      }
    };
  
    onValue(statusQuery, handleData);
  
    return () => {
      off(statusQuery, 'value', handleData);
    };
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <table className='home-table'>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>No.</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>Contact</th>
            <th style={{ textAlign: 'center' }}>Status</th>
            {!sort && (<th style={{ textAlign: 'center' }}>Action</th>)}
          </tr>
        </thead>
        {!sort && (
          <tbody>
            {Object.keys(data).map((id, index) => (
              <tr key={id}>
                <th scope='row'>{index + 1}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>{data[id].status}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className='btn btn-edit'>Edit</button>
                  </Link>
                  <button className='btn btn-delete' onClick={() => onDelete(id)}>Delete</button>
                  <Link to={`/view/${id}`}>
                    <button className='btn btn-view'>View</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        )}
        {sort && (
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <label>Sort By:</label>
      <select className='dropdown' name='colValue' onChange={handleChange}>
        <option>Select Option</option>
        <option value='name'>Name</option>
        <option value='email'>Email</option>
        <option value='contact'>Contact</option>
      </select>
      <button className='btn btn-reset' onClick={handleReset}>Reset</button><br/>
      <label>Status: </label>
      <button className='btn btn-active' onClick={() => filterData('Active')}>Active</button>
      <button className='btn btn-inactive' onClick={() => filterData('InActive')}>InActive</button>
    </div>
  );
}

export default Home;

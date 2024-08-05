import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getDatabase, ref, get } from 'firebase/database';
import app from '../FirebaseConfig';
import '../Pages/View.css'

function View() {
  const [user, setUser] = useState({});

  const { id } = useParams();


  useEffect(() => {
    const db = getDatabase(app);
    if (id) {
      const contactRef = ref(db, `contacts/${id}`);
      get(contactRef, user)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setUser({ ...snapshot.val() })
          } else {
            setUser({});
          }
        })

    }
  }, [id]);

  console.log("user", user)
  return (
    <div style={{ marginTop: '150px' }}>
      <div className='card'>
        <div className='card-header'>
          <p>User Contact Details</p>
        </div>
        <div className='container'>
          <strong>ID: </strong>
          <span>{id}</span><br /><br />
          <strong>Name: </strong>
          <span>{user.name}</span><br /><br />
          <strong>Email: </strong>
          <span>{user.email}</span><br /><br />
          <strong>Conatct:</strong>
          <span>{user.contact}</span><br /><br />
          <Link to='/'>
            <button className='btn btn-edit'>Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default View

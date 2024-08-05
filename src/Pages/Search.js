import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getDatabase, ref, query, orderByChild, equalTo, onValue, off } from 'firebase/database';
import app from '../FirebaseConfig';
import '../Pages/Search.css';

function Search() {
    const [data, setData] = useState({});
    const location = useLocation();

    const useQuery = () => {
        return new URLSearchParams(location.search);
    };

    let searchQuery = useQuery();
    let search = searchQuery.get('name');

    useEffect(() => {
        const searchData = () => {
            const db = getDatabase(app);
            const contactRef = ref(db, 'contacts');
            const contactsQuery = query(contactRef, orderByChild('name'), equalTo(search));

            const handleData = (snapshot) => {
                if (snapshot.val()) {
                    const data = snapshot.val();
                    setData(data);
                } else {
                    setData({});
                }
            };

            onValue(contactsQuery, handleData);

            return () => {
                off(contactsQuery, 'value', handleData);
            };
        };

        if (search) {
            searchData();
        }
    }, [search]);

    return (
        <>
            <div style={{ marginTop: '100px' }}>
                <Link to='/'>
                  <button className='btn btn-edit'>Go Back</button>
                </Link>
                {Object.keys(data).length === 0 ? (
                    <h2>No Search Found With That Name: {search}</h2>
                ) : (
                    <table className='home-table'>
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center' }}>No.</th>
                                <th style={{ textAlign: 'center' }}>Name</th>
                                <th style={{ textAlign: 'center' }}>Email</th>
                                <th style={{ textAlign: 'center' }}>Contact</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(data).map((id, index) => {
                                return (
                                    <tr key={id}>
                                        <th scope='row'>{index + 1}</th>
                                        <td>{data[id].name}</td>
                                        <td>{data[id].email}</td>
                                        <td>{data[id].contact}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}

            </div>
        </>
    );
}

export default Search;

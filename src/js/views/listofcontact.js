import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import "../../styles/index.css";
import { Context } from '../store/appContext';

export const ListOfContact = () => {
    const { id } = useParams();
    const { store, actions} = useContext(Context);

    useEffect(() => {
        actions.openContactBook();
    }, [])

    return (
        <>
        <div className="container">
            {/* Header */}
            <div className="mb-3 d-flex justify-content-between">
                <h1>{id}'s List of Contacts</h1>
                <div>
                    <Link to="/addcontact">
                        <button >
                            Add a new contact
                        </button>
                    </Link>
                </div>
            </div>
            {/* List */}
            <ul className="list-group">
            
            {store.userContactList.map((item, index) => {
                return (
                        <>
                        <div>
                                Contact #{index + 1}
                        </div>
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between"
                        >
                            
                            <div className="d-flex">
                                <div className="me-2">
                                    PHOTO
                                </div>
                                <div>
                                    {item.full_name}
                                    <br></br>
                                    {item.address}
                                    <br></br>
                                    {item.phone}
                                    <br></br>
                                    {item.email}
                                </div>
                            </div>
                            <div>
                                <span>Edit</span>
                                <span onClick={() => actions.deleteContact(index)}> Bin</span>
                            </div>
                        </li>
                        </>
                        );
                })
            }
        </ul> 
        
        {/* TURNED OFF CAUSE WAS CAUSING ERRORS */}
        {/* */}

        
        </div>        
        </>
    )
}

// Button to get back to contactbooklist.js (just simple link)

    

    // ----- CONTACTS LIST INSIDE AGENDA ----

    //     store.toggle === true?
    //     <Message/>

    //     // INPUT FOR CUSTOM USER NAME 
    //     :
    //     
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/index.css"; 

// TODO 
// - Create state for other inputs, add onChange functions for them
// - fetch call onSubmit button --> update userContactList
// - create a state object replicating "newContact" store object 


export const AddContact = () => {
    const {store, actions} = useContext(Context);
    const [fullName, setFullName] = useState("")
    function setNewContact() {
        
    }

    return (
        <>
        <div className="container">
            <h1>Add a new contact</h1>
            <form className="d-flex flex-column" onSubmit={(e) => {
                e.preventDefault();
                console.log("Fullname", fullName)
            }}>
                <label htmlFor="name">
                    Full Name
                </label>
                <input
                    id="name"
                    placeholder="Full Name"
                    className="mb-3"
                    onChange={(e) => {
                        console.log(e.target.value)
                        setFullName(e.target.value)
                    }}

                />
                <label htmlFor="address">
                    Address
                </label>
                <input
                    id="address"
                    placeholder="Address"
                    className="mb-3"
                   
                />
                <label htmlFor="phone">
                    Phone Number
                </label>
                <input
                    id="phone"
                    placeholder="Phone Number"
                    className="mb-3"
                />
                <label htmlFor="email">
                    Email 
                </label>
                <input
                    id="email"
                    placeholder="Email"
                    className="mb-3"
                />
                  <input type="submit" value="Submit" />
        
            </form>
            <Link to={`/listofcontact/${store.userID}`}>
                    View all Contacts
            </Link>
        </div>
        </>
    )

}

import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/index.css";

export const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();

    const [fullName, setFullName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")

    function newContactStart() {
        actions.createNewContact(fullName, address, phone, email)
    }

    console.log(fullName, address, phone, email)
    
    useEffect(() => {
        store.userCreatedToggle === true? navigate(`/listofcontact/${id}`) : null;
        store.userCreatedToggle = false;
    }, [store.userCreatedToggle])

    return (
        <>
            <div className="container">
                <h1>Add a new contact</h1>
                <form className="d-flex flex-column" onSubmit={(e) => {
                    e.preventDefault();
                    newContactStart();
                }}>
                    <label htmlFor="name">
                        Full Name
                    </label>
                    <input
                        id="name"
                        placeholder="Full Name"
                        className="mb-3"
                        value={fullName}
                        onChange={(e) => {
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
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    <label htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        id="phone"
                        placeholder="Phone Number"
                        className="mb-3"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        placeholder="Email"
                        className="mb-3"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
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
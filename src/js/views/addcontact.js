import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/index.css";

export const AddContact = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const storedBookName = store.currentBookName;

    function newContactStart() {
        actions.createNewContact(fullName, address, phone, email, storedBookName)
    }

    useEffect(() => {
        store.userCreated === true ? navigate(`/listofcontact/${storedBookName}`) : null;
        store.userCreated = false;
    }, [store.userCreated])

    return (
        <>
            <div className="container newContactSize">
                <h1 className="caveat text-center text-white my-3
                ">Add a new contact</h1>
                <div className="text-center mb-1">
                    <Link to={`/listofcontact/${storedBookName}`}>
                        <button className="listOfContactsButton listOfContactsButton--return">
                            <span className="circle1"></span>
                            <span className="circle2"></span>
                            <span className="circle3"></span>
                            <span className="circle4"></span>
                            <span className="circle5"></span>
                            <span className="text">Return</span>
                        </button>
                    </Link>
                </div>
                {/* FORM */}
                <form className="d-flex flex-column" onSubmit={(e) => {
                    e.preventDefault();
                    newContactStart();
                }}>
                    <label htmlFor="name" className="newContactLabel caveat text-white">
                        Full Name
                    </label>
                    <input
                        id="name"
                        placeholder="Full Name"
                        className="mb-3 newContactInput"
                        value={fullName}
                        onChange={(e) => {
                            setFullName(e.target.value)
                        }}
                    />
                    <label htmlFor="address" className="newContactLabel caveat text-white">
                        Address
                    </label>
                    <input
                        id="address"
                        placeholder="Address"
                        className="mb-3 newContactInput"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    <label htmlFor="phone" className="newContactLabel caveat text-white">
                        Phone Number
                    </label>
                    <input
                        id="phone"
                        placeholder="Phone Number"
                        className="mb-3 newContactInput"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <label htmlFor="email" className="newContactLabel caveat text-white">
                        Email
                    </label>
                    <input
                        id="email"
                        placeholder="Email"
                        className="mb-5 newContactInput"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div className="text-center">
                        <input
                            type="submit"
                            value="Submit"
                            className="contacts-card-button contacts-card-button--submit"
                        />
                    </div>
                </form>

            </div>
        </>
    )
}
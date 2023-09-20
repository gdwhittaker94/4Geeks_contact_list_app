import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const AddContact = () => {
    const {store, actions} = useContext(Context);

    return (
        <>
        <div className="container">
            <h1>Add a new contact</h1>
            <form className="d-flex flex-column">
                <label htmlFor="name">
                    Full Name
                </label>
                <input
                    id="name"
                    placeholder="Full Name"
                    className="mb-3"
                    value={store.fullName}
                    onChange={(event) => actions.setInput(event.target.value, "name")} 

                />
                <label htmlFor="address">
                    Address
                </label>
                <input
                    id="address"
                    placeholder="Address"
                    className="mb-3"
                    value={store.address}
                    onChange={(event) => actions.setInput(event.target.value, "address")}   
                />
                <label htmlFor="phone">
                    Phone Number
                </label>
                <input
                    id="phone"
                    placeholder="Phone Number"
                    className="mb-3"
                    value={store.phoneNumber}
                    onChange={(event) => actions.setInput(event.target.value, "phone")}   
                />
                <label htmlFor="email">
                    Email 
                </label>
                <input
                    id="email"
                    placeholder="Email"
                    className="mb-3"
                    value={store.email}
                    onChange={(event) => actions.setInput(event.target.value, "email")}   
                />
                <button onClick={() => actions.submitInput()}>
                    Add
                </button>           
            </form>
            <Link to="/contact">
                    View all Contacts
            </Link>
        </div>
        </>
    )

}

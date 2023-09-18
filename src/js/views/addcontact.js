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
                <label for="name" className="mb-2">
                    Full Name
                </label>
                <input
                    id="name"
                    placeholder="Full Name"
                    className="mb-3"
                />
                <label for="address" className="mb-2">
                    Address
                </label>
                <input
                    id="address"
                    placeholder="Address"
                    className="mb-3"
                />
                <label for="phone" className="mb-2">
                    Phone Number
                </label>
                <input
                    id="phone"
                    placeholder="Phone Number"
                    className="mb-3"
                />
                <label for="email" className="mb-2">
                    Email 
                </label>
                <input
                    id="email"
                    placeholder="Email"
                    className="mb-3"
                />
                <button>
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

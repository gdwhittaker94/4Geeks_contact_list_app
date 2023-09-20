import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { Message } from "../component/message";

import "../../styles/demo.css";

export const Contact = () => {
    const {store, actions} = useContext(Context);

    return (
        <>       
        <div className="container">
            <div className="mb-3 d-flex justify-content-end">
                <Link to="/addcontact">
                    <button >
                        Add a new contact
                    </button>
                </Link>
            </div>
            {
                store.toggle === true?
                <Message/>
                :
                <ul className="list-group">
                {store.contact.map((item, index) => {
                        return (
                            <>
                            <div>
                                    Contact #{index + 1}
                            </div>
                            <li
                                key={index}
                                className="list-group-item d-flex justify-content-between"
                                style={{ background: item.background }}
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
                    })}
                </ul>
            }
                
            
            
        </div>
        </>
    )


}

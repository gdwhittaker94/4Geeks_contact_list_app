import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { Context } from "../store/appContext";
import "../../styles/index.css";

export const ContactBookList = () => {
    const { store, actions } = useContext(Context);


    return (
        <div className="container">
            <div className="my-3">
                <input
                    placeholder="Create new contacts book"
                    value={store.newContactBook}
                    onChange={(e) => actions.setNewContactBook(e.target.value)}
                />
                {/* TERNARY NOT WORKING - doesn't undo 'disabled' once typing */}
                {store.newContactBook === null?
                <button onClick={() => actions.submitNewContactBook()}> 
                    Create
                </button>
                :
                <button onClick={() => actions.submitNewContactBook()}>
                    Create
                </button>
                }
                
            </div>
            {/* Agendas List */}
            <ul className="list-group">
                {store.contactBooks.map((item, index) => {
                    return (
                        // TODO: WHEN YOU CLICK NAME IT GOES TO THEIR CONTACT LIST
                            <li key={index}>
                                <div>
                                    <span>Agenda #{index + 1}: 
                                        <Link to={`/listofcontact/${item}`} onClick={() => {actions.setID(item)}}>
                                          {item}
                                        </Link>
                                    </span>
                                </div>
                            </li>
                    )
                })}
            </ul>
            
        </div>
    )
}
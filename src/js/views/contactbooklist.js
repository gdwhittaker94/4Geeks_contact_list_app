import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const ContactBookList = () => {
    const { store, actions } = useContext(Context);
    const [contactBookName, setcontactBookName] = useState("");

    // Fetch All Contact Books
    useEffect(() => {
        actions.fetchContactBooks();
    })

    // Book Name Input Box Reset
    useEffect(() => {
        store.inputResetToggle === true? setcontactBookName("") : null
        store.inputResetToggle = false
    }, [store.inputResetToggle])

    return (
        <div className="container">
            <div className="my-3">
                <input
                    placeholder="Create new contacts book"
                    value={contactBookName}
                    onChange={(e) => setcontactBookName(e.target.value)}
                />
                {/* Conditional: what appears after input box */}
                {contactBookName === "" ?
                    <p>Type something to enter</p>
                    :
                    <button onClick={() => actions.submitNewContactBook(contactBookName)}>
                        Create
                    </button>
                }

            </div>
            {/* Agendas List */}
            <ul className="list-group">
                {store.allContactBooks.map((item, index) => {
                    return (
                        <li key={index}>
                            <div>
                                <span>Agenda #{index + 1}:
                                    <Link to={`/listofcontact/${item}`} onClick={() => { actions.setCurrentBookName(item) }}>
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
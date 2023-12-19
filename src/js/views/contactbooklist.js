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
        store.inputResetToggle === true ? setcontactBookName("") : null
        store.inputResetToggle = false
    }, [store.inputResetToggle])

    return (
        <div className="container pb-4">
            <div className="my-3 text-center d-flex flex-column align-items-center">
                <input
                    placeholder="Type something to create"
                    value={contactBookName}
                    onChange={(e) => setcontactBookName(e.target.value)}
                    className="contactBookInput mb-2"
                />
                {/* Conditional: what appears after input box */}
                {contactBookName === "" ?
                    <p>Create a new contacts book</p>
                    :
                    <button onClick={() => actions.submitNewContactBook(contactBookName)}>
                        Create
                    </button>
                }

            </div>
            {/* Agendas List */}
            <ul className="contactBookList">
                {store.allContactBooks.map((item, index) => {
                    return (
                        <li key={index} className="bookListItem">
                            <h2>{item}'s <br/> Contact Book</h2>
                            <Link to={`/listofcontact/${item}`} onClick={() => { actions.setCurrentBookName(item) }}>
                                <button className="bookListItem__button">Enter</button>
                            </Link>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}
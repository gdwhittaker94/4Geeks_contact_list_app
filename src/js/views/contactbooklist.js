import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const ContactBookList = () => {
    const { store, actions } = useContext(Context);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        store.inputValueToggle === true? setInputValue("") : null
        store.inputValueToggle = false
    }, [store.inputValueToggle])


    return (
        <div className="container">
            <div className="my-3">
                <input
                    placeholder="Create new contacts book"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                {inputValue === "" ?
                    <p>Type something to enter</p>
                    :
                    <button onClick={() => actions.submitNewContactBook(inputValue)}>
                        Create
                    </button>
                }

            </div>
            {/* Agendas List */}
            <ul className="list-group">
                {store.contactBooks.map((item, index) => {
                    return (
                        <li key={index}>
                            <div>
                                <span>Agenda #{index + 1}:
                                    <Link to={`/listofcontact/${item}`} onClick={() => { actions.setBookNameID(item) }}>
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
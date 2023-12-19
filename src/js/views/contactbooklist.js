import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const ContactBookList = () => {
    const { store, actions } = useContext(Context);
    const [contactBookName, setcontactBookName] = useState("");
    const [width, setWidth] = useState(window.innerWidth);
   
    // Fetch All Contact Books
    useEffect(() => {
        actions.fetchContactBooks();
    })

    // Book Name Input Box Reset
    useEffect(() => {
        store.inputResetToggle === true ? setcontactBookName("") : null
        store.inputResetToggle = false
    }, [store.inputResetToggle])

    // Monitor Screen Size
    // source: t.ly/dIZGD 
    useEffect(() => {
        const handleResize = () => {
          setWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    // TO-DO: GET CHATGPT TO HELP ME WITH CHANGING ARROW DISPLAY -> currently blocks page display

    return (
        <div className="container pb-4 text-center">
            <div className="header flex-column flex-sm-row">
                <p>Create a new contact book {
                    width >= 575? ⬇ : ➡️
                    } </p>
                <input
                    placeholder="Contact Book Name"
                    value={contactBookName}
                    onChange={(e) => setcontactBookName(e.target.value)}
                    className="contactBookInput"
                />
                {/* Conditional: what appears after input box */}
                {contactBookName === "" ?
                    null
                    :
                    <button onClick={() => actions.submitNewContactBook(contactBookName)}>
                        Create
                    </button>
                }
            </div>
            {/* Agendas List */}
            <ul className="contactBookList mx-4 mx-sm-0">
                {store.allContactBooks.map((item, index) => {
                    return (
                        <>
                        <li key={index} className="contactBookList__item">
                        <div className="contactBookList__binder">
                            <div className="contactBookList__ring"></div>
                            <div className="contactBookList__ring"></div>
                            <div className="contactBookList__ring"></div>
                            <div className="contactBookList__ring"></div>
                            <div className="contactBookList__ring"></div>
                            <div className="contactBookList__ring"></div>
                            <div className="contactBookList__ring"></div>
                            <div className="contactBookList__ring"></div>
                            <div className="contactBookList__ring"></div>
                            <div className="contactBookList__ring"></div>
                            <div className="contactBookList__ring"></div>
                            <div className="contactBookList__ring"></div>
                            <div className="contactBookList__ring"></div>
                        </div>
                            <h2>{item}</h2>
                            <h3>Contact Book</h3>
                            <Link to={`/listofcontact/${item}`} onClick={() => { actions.setCurrentBookName(item) }}>
                                <button className="contactBookList__button">Enter</button>
                            </Link>
                        </li>
                        </>
                        
                    )
                })}
            </ul>

        </div>
    )
}
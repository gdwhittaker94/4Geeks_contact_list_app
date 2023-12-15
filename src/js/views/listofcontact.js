import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "../../styles/index.css";
import { Context } from '../store/appContext';

export const ListOfContact = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const currentBookName = id;

    // console.log("id:", id)

    // Initial Page Fetch
    useEffect(() => {
        actions.openContactBook(currentBookName);
    }, [])

    /* 
        HERE:
        - Contacts appear on list of contacts page. 
        - Now need to go through the other functions in this section's action
        - Go through the rest of the code on this page, how i'm managing state and where etc
    */






    const [contactId, setContactId] = useState("")
    const [contactFullName, setFullName] = useState("")
    const [contactAddress, setAddress] = useState("")
    const [contactPhone, setPhone] = useState("")
    const [contactEmail, setEmail] = useState("")

    const [editModalState, setEditModalState] = useState({})

    const updateEditModalState = (individualId, Data) => {
        setEditModalState({ ...editModalState, [individualId]: Data })
    }

    // console.log("modalState:", editModalState)

    /* TODO
        - Add a new contact --> doesn't appear on list of contact page --> can't test new code for placeholder values

        OLD
        - Placeholder values show first contact info, not the selected contact's info: fix/change/remove
        - Delete button deletes the contacts from top to bottom, doesn't delete the contact in question 

        * Errors must be to do with how I'm handling the list of contacts and in what order I'm manipulating them 
        ... Otherwise, I have all the desired functionality 

        *useEffect linked to contactId + the problem? Plus, contactID variable = one, when there are many contacts.
        Probably better to make an array of ids. 
    */



    // WORK TO DO HERE
    // useEffect(() => {
    //     actions.updateContact(contactFullName, contactAddress, contactPhone, contactEmail, currentBookName, contactId);

    //     // need to send across id of array to belongs to x contact -> comparison of ids (store id in other place?)
    // }, [contactId])

    useEffect(() => {
        store.contactUpdated === true ? actions.openContactBook(currentBookName) : null
        store.contactUpdated = false
    }, [store.contactUpdated])

    return (
        <div className="container">
            {/* HEADER */}
            <div className="mb-3 d-flex justify-content-between">
                <h1>{id}'s List of Contacts</h1>
                <div>
                    <Link to={`/addcontact/${currentBookName}`}>
                        <button >
                            Add a new contact
                        </button>
                    </Link>
                </div>
            </div>
            {/* LIST */}
            <ul className="list-group">
                {store.contactsList.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className='mt-3'>
                                Contact #{index + 1}
                            </div>
                            <li className="list-group-item d-flex justify-content-between">
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
                                    <button
                                        type='button'
                                        data-bs-toggle='modal'
                                        data-bs-target='#editModal'
                                        onClick={() => updateEditModalState(item.id, { full_name: item.full_name, address: item.address, phone: item.phone, email: item.email })}
                                    >
                                        Edit
                                    </button>

                                    {/* EDIT Modal  */}
                                    <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Contact</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <form className="modal-body d-flex flex-column gap-2 align-items-start">
                                                    <p>Below you see the current information for this contact.</p>
                                                    <p>Please edit the information you wish to change before submitting.</p>
                                                    <div>
                                                        <label htmlFor="full_name" className='me-2'>Full Name</label>
                                                        <br></br>
                                                        <input
                                                            id='full_name'
                                                            placeholder={editModalState[item.id]?.full_name || item.full_name}
                                                            value={editModalState[item.id]?.full_name || ""}
                                                            onChange={e => updateEditModalState(item.id, { ...editModalState[item.id], full_name: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="address" className='me-2'>Address</label>
                                                        <br></br>
                                                        <input
                                                            id='address'
                                                            placeholder={editModalState[item.id]?.address || item.address}
                                                            value={editModalState[item.id]?.address || ""}
                                                            onChange={e => updateEditModalState(item.id, { ...editModalState[item.id], address: e.target.value })}
                                                        // placeholder={item.address}
                                                        // value={contactAddress}
                                                        // onChange={e => setAddress(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="phone" className='me-2'>Phone</label>
                                                        <br></br>
                                                        <input
                                                            id='phone'
                                                            placeholder={editModalState[item.id]?.phone || item.phone}
                                                            value={editModalState[item.id]?.phone || ""}
                                                            onChange={e => updateEditModalState(item.id, { ...editModalState[item.id], phone: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className='me-2'>Email</label>
                                                        <br></br>
                                                        <input
                                                            id='email'
                                                            placeholder={editModalState[item.id]?.email || item.email}
                                                            value={editModalState[item.id]?.email || ""}
                                                            onChange={e => updateEditModalState(item.id, { ...editModalState[item.id], email: e.target.value })}
                                                        />
                                                    </div>
                                                </form>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-success"
                                                        data-bs-dismiss="modal"
                                                        onClick={() => {
                                                            actions.updateContact(
                                                                editModalState[item.id]?.full_name || item.full_name,
                                                                editModalState[item.id]?.address || item.address,
                                                                editModalState[item.id]?.phone || item.phone,
                                                                editModalState[item.id]?.email || item.email,
                                                                currentBookName,
                                                                item.id
                                                            )
                                                        }}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button type='button' data-bs-toggle='modal' data-bs-target='#checkModal'>Bin</button>

                                    {/* DELETE Modal  */}
                                    <div className="modal fade" id="checkModal" tabIndex="-1" aria-labelledby="checkModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Confirmation</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    Are you sure?
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                    <button type="button" className="btn btn-danger" onClick={() => { actions.deleteContact(item.id); }} data-bs-dismiss="modal">
                                                        Yes, delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </li>
                        </div>
                    );
                })}
            </ul>
            {/* RETURN LINK  */}
            <div className="mt-3 text-center">
                <Link to="/" >Home</Link>
            </div>
        </div>
    )
}
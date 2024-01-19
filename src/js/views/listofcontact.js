import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "../../styles/index.css";
import { Context } from '../store/appContext';
import llama from '../../img/llama.jpg';

export const ListOfContact = () => {

    const { id } = useParams();
    const { store, actions } = useContext(Context);
    let currentBookName = store.currentBookName;

    // --- GET ----------------------------------

    useEffect(() => {
        currentBookName == undefined ? currentBookName = id : null
        actions.openContactBook(currentBookName);
    }, [])

    // --- UPDATE ---------------------------------

    const [individualContactInfo, setIndividualContactInfo] = useState({})

    // On button click store individual contact's data
    const updateIndContactInfo = (individualData) => {
        setIndividualContactInfo(individualData)
    }

    // console.log("individualContInfo_state:", individualContactInfo)

    // New fetch after a contact updated
    useEffect(() => {
        store.contactUpdated === true ? actions.openContactBook(currentBookName) : null
        store.contactUpdated = false
    }, [store.contactUpdated])

    // --- DELETE ----------------------------------

    function deleteIndContact(indID) {
        actions.deleteContact(indID)
    }

    function deleteAllContacts(bookName) {
        actions.deleteAllContacts(bookName)
    }

    useEffect(() => {
        store.contactDeleted === true ? actions.openContactBook(currentBookName) : null
        store.contactDeleted = false
    }, [store.contactDeleted])

    useEffect(() => {
        store.allContactsDeleted === true ? actions.openContactBook(currentBookName) : null
        store.allContactsDeleted = false
    }, [store.allContactsDeleted])


    return (
        <div className="container height100">
            {/* HEADER */}
            <div className="mb-3 d-flex flex-column align-items-center justify-content-between mt-3 text-white">
                <h1 className='mb-0 caveat'>{currentBookName}'s List of Contacts</h1>
                <div className='text-center'>
                    <Link to="/" >
                        <button className="listOfContactsButton listOfContactsButton--home mt-3 me-2">
                            <span className="circle1"></span>
                            <span className="circle2"></span>
                            <span className="circle3"></span>
                            <span className="circle4"></span>
                            <span className="circle5"></span>
                            <span className="text">Home Page</span>
                        </button>
                    </Link>
                    <Link to={`/addcontact`}>
                        <button className="listOfContactsButton listOfContactsButton--add mt-3">
                            <span className="circle1"></span>
                            <span className="circle2"></span>
                            <span className="circle3"></span>
                            <span className="circle4"></span>
                            <span className="circle5"></span>
                            <span className="text">Add New Contact</span>
                        </button>
                    </Link>
                </div>
            </div>
            {/* LIST */}
            <ul className="list-group">
                {store.contactsList.map((item, index) => {
                    return (
                        <div key={index}>
                            <h3 className='mt-3 text-white caveat'>
                                Contact #{index + 1}
                            </h3>
                            <li className="contacts-card list-group-item d-flex flex-column align-items-center flex-sm-row justify-content-sm-between ">
                                <div className="d-flex flex-column align-items-center justify-content-center flex-sm-row ">
                                    <div className="me-4">
                                        <img src="../../img/llama.jpg" alt='Photo of a cool llama' className='profileImg rounded-circle' />
                                    </div>
                                    <div className='caveat contacts-card__text'>
                                        {item.full_name}
                                        <br></br>
                                        {item.address}
                                        <br></br>
                                        {item.phone}
                                        <br></br>
                                        {item.email}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center flex-row flex-sm-column">
                                    {/* EDIT */}
                                    <button
                                        type='button'
                                        data-bs-toggle='modal'
                                        data-bs-target='#editModal'
                                        className='contacts-card-button contacts-card-button--edit me-4 me-sm-1 mt-3 mt-sm-0 mb-sm-4'
                                        onClick={() => updateIndContactInfo({ full_name: item.full_name, address: item.address, phone: item.phone, email: item.email, agenda_slug: item.agenda_slug, id: item.id })}
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
                                                            value={individualContactInfo.full_name || ""}
                                                            onChange={e => setIndividualContactInfo({ ...individualContactInfo, full_name: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="address" className='me-2'>Address</label>
                                                        <br></br>
                                                        <input
                                                            id='address'
                                                            value={individualContactInfo.address || ""}
                                                            onChange={e => setIndividualContactInfo({ ...individualContactInfo, address: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="phone" className='me-2'>Phone</label>
                                                        <br></br>
                                                        <input
                                                            id='phone'
                                                            value={individualContactInfo.phone || ""}
                                                            onChange={e => setIndividualContactInfo({ ...individualContactInfo, phone: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className='me-2'>Email</label>
                                                        <br></br>
                                                        <input
                                                            id='email'
                                                            value={individualContactInfo.email || ""}
                                                            onChange={e => setIndividualContactInfo({ ...individualContactInfo, email: e.target.value })}
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
                                                                individualContactInfo.full_name,
                                                                individualContactInfo.address,
                                                                individualContactInfo.phone,
                                                                individualContactInfo.email,
                                                                individualContactInfo.agenda_slug,
                                                                individualContactInfo.id,
                                                            )
                                                        }}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* DELETE */}
                                    <button
                                        type='button'
                                        data-bs-toggle='modal'
                                        data-bs-target='#checkModal'
                                        className='contacts-card-button contacts-card-button--delete mt-3 mt-sm-0 me-sm-1'
                                        onClick={() => updateIndContactInfo({ full_name: item.full_name, address: item.address, phone: item.phone, email: item.email, agenda_slug: item.agenda_slug, id: item.id })}
                                    >
                                        Delete
                                    </button>

                                    {/* DELETE MODAL */}
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
                                                    <button type="button"
                                                        className="btn btn-secondary"
                                                        data-bs-dismiss="modal"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger"
                                                        data-bs-dismiss="modal"
                                                        onClick={() => deleteIndContact(individualContactInfo.id)}
                                                    >
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

            {/* DELETE ALL CONTACTS */}
            <div className="mt-3 text-center">
                <button
                    type='button'
                    data-bs-toggle='modal'
                    data-bs-target='#deleteAllModal'
                    className='contacts-card-button contacts-card-button--deleteAll mt-4 mb-5'
                >
                    Delete ALL contacts
                </button>

                {/* DELETE MODAL */}
                <div className="modal fade" id="deleteAllModal" tabIndex="-1" aria-labelledby="deleteAllModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Confirmation</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                This will delete <b>ALL</b> contacts in this contacts book. Are you sure?
                            </div>
                            <div className="modal-footer">
                                <button type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    data-bs-dismiss="modal"
                                    onClick={() => deleteAllContacts(currentBookName)}
                                >
                                    Yes, delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "../../styles/index.css";
import { Context } from '../store/appContext';

export const ListOfContact = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const backUpId = id;

    useEffect(() => {
        actions.openContactBook(backUpId);
    }, [])

    /* TODO
        - Edit button (function, fetch, result)
    */

    return (
        <div className="container">
            {/* HEADER */}
            <div className="mb-3 d-flex justify-content-between">
                <h1>{id}'s List of Contacts</h1>
                <div>
                    <Link to="/addcontact">
                        <button >
                            Add a new contact
                        </button>
                    </Link>
                </div>
            </div>
            {/* LIST */}
            <ul className="list-group">
                {store.userContactList.map((item, index) => {
                    return (
                        <div key={item.id}>
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
                                        <br></br>
                                        {item.id}
                                    </div>
                                </div>
                                <div>
                                    <button>Edit</button>
                                    <button type='button' data-bs-toggle='modal' data-bs-target='#checkModal'>Bin</button>

                                    {/* Modal  */}
                                    <div className="modal fade" id="checkModal" tabindex="-1" aria-labelledby="checkModalLabel" aria-hidden="true">
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
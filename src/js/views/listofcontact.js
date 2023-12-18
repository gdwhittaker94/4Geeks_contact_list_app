import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import "../../styles/index.css";
import { Context } from '../store/appContext';

export const ListOfContact = () => {

      /* NEW PLAN
        - contactsList in store is the only place where the contactsList stays true and is reliable
        - so make a normal variable that is a copy of that 

        const contactsListCopy = store.contactsList
        const workingContactsList = contactsListCopy
        (console.log("copy:", contactsListCopy))
        (console.log("workingCopy:", workingContactsList))

        Will this do it?

        - Then, in the modals, refence to the properties of the contact within the relevant index 

        placeholder={workingContactsList[index].full_name)   
        value={workingContactsList[index].full_name}
        onChange={e => changeWorkingContactsList(e.target.value)}

        function changeWorkingContactsList(currentInput) {
            ...??
        }

        ------------------------------

        PROBLEMAS: 
        - Gestion del estado
        - Puedo actualizar los contactos pero luego cambian de orden
        - Los placeholders y valores actuales de cada contacto no aparecen como deberian (salvo en el primero)
        - El delete button borra el primer contacto en la lista, no el contacto desedado 
        - Cuando anado un nuevo contacto no se anade a la lista de contactos
        - si refresco la pagina, pierdo el nombre de la agenda 

    *///////////////////////////////////////////////////

    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const currentBookName = store.currentBookName;

    // GET
    useEffect(() => {
        actions.openContactBook(currentBookName);
    }, [])


    // UPDATE 
    const [individualContactInfo, setIndividualContactInfo] = useState({}) // object of properties with contact id as keys

    // Set Data Inside Above State Variable for Edit Button
    const updateIndContactInfo = (individualId, individualData) => {
        setIndividualContactInfo(individualData)
    }

    /* ONLY THE DETAILS OF THE CONTACT IN THE VARIABLE
        ID NOT PASSING DOWN CORRECTLY - NOT SURE WHY, SO BYPASS IT AND DONT USE ID AS REF. VALUE
        SEE HOW JOSE CHANGED FULL NAME FIELD OF EDIT MODAL
    */

    console.log("individualContInfo_state:", individualContactInfo)

    // New fetch after a contact updated
    useEffect(() => {
        store.contactUpdated === true ? actions.openContactBook(currentBookName) : null
        store.contactUpdated = false
    }, [store.contactUpdated])

    // DELETE
    function deleteIndContact(indID) {
        console.log("delete function:", indID)
        actions.deleteContact(indID)
    }

    useEffect(() => {
        store.contactDeleted === true ? actions.openContactBook(currentBookName) : null
        store.contactDeleted = false
    }, [store.contactDeleted])


    return (
        <div className="container">
            {/* HEADER */}
            <div className="mb-3 d-flex justify-content-between">
                <h1>{currentBookName}'s List of Contacts</h1>
                <div>
                    <Link to={`/addcontact`}>
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
                                    <p>{item.id}</p>
                                </div>
                                <div>
                                    {/* EDIT */}
                                    <button
                                        type='button'
                                        data-bs-toggle='modal'
                                        data-bs-target='#editModal'
                                        onClick={() => updateIndContactInfo(item.id, { full_name: item.full_name, address: item.address, phone: item.phone, email: item.email, agenda_slug: item.agenda_slug, id: item.id })}
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
                                                        <p>{item.id}</p>
                                                        <label htmlFor="full_name" className='me-2'>Full Name</label>
                                                        <br></br>
                                                        <input
                                                            id='full_name'
                                                            placeholder={individualContactInfo[item.id]?.full_name || ""}
                                                            value={individualContactInfo.full_name || ""}
                                                            onChange={e => setIndividualContactInfo({ ...individualContactInfo, [item.id]: { ...individualContactInfo[item.id], full_name: e.target.value } })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="address" className='me-2'>Address</label>
                                                        <br></br>
                                                        <input
                                                            id='address'
                                                            placeholder={individualContactInfo[item.id]?.address || ""}
                                                            value={individualContactInfo[item.id]?.address || ""}
                                                            onChange={e => setIndividualContactInfo({ ...individualContactInfo, [item.id]: { ...individualContactInfo[item.id], address: e.target.value } })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="phone" className='me-2'>Phone</label>
                                                        <br></br>
                                                        <input
                                                            id='phone'
                                                            placeholder={individualContactInfo[item.id]?.phone || ""}
                                                            value={individualContactInfo[item.id]?.phone || ""}
                                                            onChange={e => setIndividualContactInfo({ ...individualContactInfo, [item.id]: { ...individualContactInfo[item.id], phone: e.target.value } })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="email" className='me-2'>Email</label>
                                                        <br></br>
                                                        <input
                                                            id='email'
                                                            placeholder={individualContactInfo[item.id]?.email || ""}
                                                            value={individualContactInfo[item.id]?.email || ""}
                                                            onChange={e => setIndividualContactInfo({ ...individualContactInfo, [item.id]: { ...individualContactInfo[item.id], email: e.target.value } })}
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
                                                                individualContactInfo[item.id]?.full_name || item.full_name,
                                                                individualContactInfo[item.id]?.address || item.address,
                                                                individualContactInfo[item.id]?.phone || item.phone,
                                                                individualContactInfo[item.id]?.email || item.email,
                                                                individualContactInfo[item.id]?.agenda_slug || item.agenda_slug,
                                                                individualContactInfo[item.id]?.id || item.id,
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
                                        onClick={() => individualContactInfo[item.id] ?
                                            null
                                            :
                                            updateIndContactInfo(item.id, { full_name: item.full_name, address: item.address, phone: item.phone, email: item.email, agenda_slug: item.agenda_slug, id: item.id })}
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
                                                <p>{item.id}</p>
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
                                                        onClick={() => deleteIndContact(item.id)}
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
            {/* HOME LINK  */}
            <div className="mt-3 text-center">
                <Link to="/" >Home</Link>
            </div>
        </div>
    )
}
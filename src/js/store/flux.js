const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// CONTACT BOOK LIST PAGE
			allContactBooks: [],
			newBookName: "",
			exampleContact: {
				full_name: "Joe Bloggs",
				email: "example@gmail.com",
				address: "123 Street",
				phone: "123456789",
			},
			inputResetToggle: false,
			currentBookName: null,

			// LIST OF CONTACTS PAGE
			contactsList: [],
			contactDeleted: false, 


			// ADD CONTACT PAGE


			// OLD
			userCreatedToggle: false,
			contactUpdated: false,
			newContact: {
				full_name: "",
				email: "",
				agenda_slug: "",
				address: "",
				phone: "",
			},
		},
		actions: {

			// --- CONTACT BOOKS LIST PAGE ---------------------------------

			fetchContactBooks: async () => {
				const response = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/");
				const responseContactBookData = await response.json();
				setStore({ allContactBooks: responseContactBookData });
			},

			submitNewContactBook: async (contactBookName) => {
				const store = getStore();
				setStore({ newBookName: contactBookName }); // --> necessary for fetch body
				
				// fetch data
				const fetchURL = "https://playground.4geeks.com/apis/fake/contact/";
				const fetchBody = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						full_name: store.exampleContact.full_name,
						email: store.exampleContact.email,
						agenda_slug: store.newBookName,
						address: store.exampleContact.address,
						phone: store.exampleContact.phone,
					})
				};

				// fetch
				try {
					const response = await fetch(fetchURL, fetchBody);
					console.log("response:", response)
					// bad response
					if (!response.ok) {
						console.error(response.text)
						throw new Error(response.statusText)
					}

					const responseData = await response.json();
					console.log("responseData:", responseData)
				
					// Further Actions
					setStore({ inputResetToggle: true });

				} catch (error) {
					console.error("Error:", error);
				}
			},

			// So that we have the book name when the user clicks a book without creating one first 
			setCurrentBookName: (currentBookName) => {
				const store = getStore();
				setStore({ currentBookName: currentBookName });


				// DO I NEED TO DO THIS HERE STILL?
				// store.newContact.agenda_slug != "" ? setStore({ newContact: { agenda_slug: "" } }) : null;
				// setStore({
				// 	newContact: {
				// 		agenda_slug: ID
				// 	}
				// });
			},

			// --- LIST OF CONTACTS PAGE -----------------------------------

			openContactBook: async (currentBookName) => {
				const store = getStore();
				// Handle Errors
				store.currentBookName === null ? setStore({ currentBookName: currentBookName }) : null;
				// Fetch
				const responseContactsList = await fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/${store.currentBookName}`);
				// console.log("responseContactsList:", responseContactsList)
				const responseContactListData = await responseContactsList.json();
				// console.log("responseContactListData:", responseContactListData)

				// Save data so can map it in List of Contacts Page
				setStore({ contactsList: responseContactListData });
				console.log("contactsList:", store.contactsList)
			},

			updateContact: async (name, address, phone, email, bookName, contactId) => {
				const fetchUrl = `https://playground.4geeks.com/apis/fake/contact/${contactId}`;

				// fetch
				try {
					const response = await fetch(fetchUrl, {
						method: "PUT",
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							full_name: name,
							email: email,
							agenda_slug: bookName,
							address: address,
							phone: phone,
						})
					})
					console.log("response:", response)
					if (!response.ok) {
						console.error(response.text)
						throw new Error(response.statusText)
					}

					const responseData = await response.json();
					console.log("responseData:", responseData)
					setStore({ contactUpdated: true })

				} catch (error) {
					console.error("Error:", error)
				}
			},

			deleteContact: async (id) => {
				console.log("id flux:", id)
				const actions = getActions();
				const fetchUrl = `https://playground.4geeks.com/apis/fake/contact/${id}`;

				// fetch
				try {
					const response = await fetch(fetchUrl, {
						method: "DELETE",
					})
					if (!response.ok) {
						console.error("Error:", response.status)
						throw new Error(response.statusText)
					}
					console.log("response:", response)
					const responseData = await response.json()
					console.log("responseData:", responseData)

					// Further Actions
					setStore({ contactDeleted: true });
				} catch (error) {
					console.error("Error:", error);
				}
			},

			// --- ADD NEW CONTACT PAGE ------------------------------------

			createNewContact: async (name, address, phone, email) => {
				const store = getStore();
				const actions = getActions();

				// console.log("what we get:", name, address, phone, email)
				// console.log("bookName:", store.bookName); --> NO VALUE HERE!
				// console.log("newContactAgendaSlug:", store.newContact.agenda_slug) --> VALUE HERE

				// console.log("pre-newCont object:", store.newContact)
				setStore({
					newContact: {
						...store.newContact,
						full_name: name,
						email: email,
						address: address,
						phone: phone,
					}
				})
				// console.log("post-newCont object:", store.newContact)

				const fetchURL = "https://playground.4geeks.com/apis/fake/contact/";
				const fetchBody = store.newContact;

				// fetch
				try {
					const response = await fetch(fetchURL, {
						method: "POST",
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(fetchBody)
					})
					if (!response.ok) {
						throw new Error(response.statusText)
					}
					console.log("response:", response)
					const responseData = await response.json();
					console.log("responseData:", responseData)
					actions.updateContactsList();
				} catch (error) {
					console.error("Error:", error);
				}
			},
			updateContactsList: () => {
				const store = getStore();
				// console.log("pre-updatedContacts:", store.userContactList)
				setStore({ userContactList: [...store.userContactList, store.newContact] });
				// console.log("post-updatedContacts:", store.userContactList)
				setStore(store.userCreatedToggle = true);
				// console.log("toggle:", store.userCreatedToggle)
			},

			// DELETE BELOW

			// setNewContactInput: (value, inputName) => {
			// 	const store = getStore();
			// 	if (inputName === "name") {
			// 		store.newContact.full_name = value;
			// 	}
			// 	if (inputName === "address") {
			// 		store.newContact.address = value;
			// 	}
			// 	if (inputName === "phone") {
			// 		store.newContact.phone = value;
			// 	}
			// 	if (inputName === "email") {
			// 		store.newContact.email = value;
			// 	}
			// 	console.log(store.newContact.full_name)
			// },
		}
	};
};
export default getState;
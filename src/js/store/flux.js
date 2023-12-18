const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// CONTACT BOOK LIST PAGE
			allContactBooks: [],
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
			contactUpdated: false,
			contactDeleted: false, 
			allContactsDeleted: false, 

			// ADD CONTACT PAGE
			userCreated: false,
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
				const newBookName = contactBookName; // --> necessary for fetch body
				
				// fetch data
				const fetchURL = "https://playground.4geeks.com/apis/fake/contact/";
				const fetchBody = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						full_name: store.exampleContact.full_name,
						email: store.exampleContact.email,
						agenda_slug: newBookName,
						address: store.exampleContact.address,
						phone: store.exampleContact.phone,
					})
				};

				// fetch
				try {
					const response = await fetch(fetchURL, fetchBody);
					// console.log("response:", response)
					// bad response
					if (!response.ok) {
						console.error(response.text)
						throw new Error(response.statusText)
					}
					const responseData = await response.json();
					// console.log("responseData:", responseData)
				
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
					// console.log("response:", response)
					if (!response.ok) {
						console.error(response.text)
						throw new Error(response.statusText)
					}
					const responseData = await response.json();
					// console.log("responseData:", responseData)

					// further actions
					setStore({ contactUpdated: true })

				} catch (error) {
					console.error("Error:", error)
				}
			},

			deleteContact: async (id) => {
				console.log("id flux:", id)
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
					// console.log("response:", response)
					const responseData = await response.json()
					// console.log("responseData:", responseData)

					// Further Actions
					setStore({ contactDeleted: true });
				} catch (error) {
					console.error("Error:", error);
				}
			},

			deleteAllContacts: async (bookName) => {
				const actions = getActions()
				console.log("bookName:", bookName)
				const fetchUrl = `https://playground.4geeks.com/apis/fake/contact/agenda/${bookName}`;

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
				
					// Further Actions
					setStore({ allContactsDeleted: true });
				} catch (error) {
					console.error("Error:", error);
				}
			},


			// --- ADD NEW CONTACT PAGE ------------------------------------

			createNewContact: async (name, address, phone, email, bookName) => {
				// console.log("what we get:", name, address, phone, email, bookName)

				const newContact = {
					full_name: name, 
					address: address, 
					phone: phone, 
					email: email, 
					agenda_slug: bookName
				}
				console.log("newCont object:", newContact)

				const fetchURL = "https://playground.4geeks.com/apis/fake/contact/";
				const fetchBody = newContact;

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
					
					// further actions
					setStore({userCreated: true});
					// console.log("toggle:", store.userCreated)

				} catch (error) {
					console.error("Error:", error);
				}
			},
		}
	};
};
export default getState;
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// --- MY STORE/STATE -----------------------------------
			toggle: true,
			contactBooks: [],
			bookName: "",
			inputValueToggle: false, 
			contactUpdated: false, 
			exampleContact: {
				full_name: "Joe Bloggs",
				email: "example@gmail.com",
				address: "123 Street",
				phone: "123456789",
			},
			newContact: {
				full_name: "",
				email: "",
				agenda_slug: "",
				address: "",
				phone: "",
			},
			bookNameID: null,
			userContactList: [],
			///////// DEMO STORE/STATE ////////////
			// demo: [
			// 	{
			// 		title: "FIRST",
			// 		background: "white",
			// 		initial: "white"
			// 	},
			// 	{
			// 		title: "SECOND",
			// 		background: "white",
			// 		initial: "white"
			// 	}
			// ]
		},
		actions: {
			// --- CONTACT BOOKS LIST PAGE ---------------------------------

			fetchContactBooks: async () => {
				const fetchResponse = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/");
				const listOfContactBooks = await fetchResponse.json();
				setStore({ contactBooks: listOfContactBooks });
			},

			setNewContactBook: (value) => {
				const store = getStore();
				store.newContactBook = value;
			},

			submitNewContactBook: async (inputValue) => {
				const store = getStore();
				const actions = getActions();
				setStore({ bookName: inputValue });
				// fetch
				const fetchURL = "https://playground.4geeks.com/apis/fake/contact/";
				const fetchBody = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						full_name: store.exampleContact.full_name,
						email: store.exampleContact.email,
						agenda_slug: store.bookName,
						address: store.exampleContact.address,
						phone: store.exampleContact.phone,
					})
				};
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
					actions.resetInputBox();
					actions.fetchContactBooks();
				} catch (error) {
					console.error("Error:", error);
				}
			},

			resetInputBox: () => {
				const store = getStore();
				setStore({ inputValueToggle: true });
			},

			setBookNameID: (ID) => {
				const store = getStore();
				setStore({ bookNameID: ID });
				store.newContact.agenda_slug != ""? setStore({newContact: {agenda_slug: ""}}) : null;
				setStore({
					newContact: {
						agenda_slug: ID
					}
				});
			},

			// --- LIST OF CONTACTS PAGE -----------------------------------
			openContactBook: async (backUpId) => {
				const store = getStore();
				store.bookNameID === null? setStore({ bookNameID: backUpId }) : null;
				const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/${store.bookNameID}`);
				const responseData = await response.json();
				setStore({ userContactList: responseData });
			},

			updateContact: async (name, address, phone, email, bookName, contactId) => {
				console.log("what we get:", name, address, phone, email, bookName, contactId)
				const store = getStore();
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
					// bad response
					if (!response.ok) {
						console.error(response.text)
						throw new Error(response.statusText)
					}
					const responseData = await response.json();
					console.log("responseData:", responseData)
					setStore({contactUpdated: true})
				} catch (error) {
					console.error("Error:", error)
				}
			},

			deleteContact: async (id) => {
				const actions = getActions();
				const fetchUrl = `https://playground.4geeks.com/apis/fake/contact/${id}`;

				// fetch
				try {
					const response = await fetch(fetchUrl, {
						method: "DELETE",
					})
					if(!response.ok) {
						console.error("Error:", response.status)
						throw new Error(response.statusText)
					}
					console.log("response:", response)
					const responseData = await response.json()
					console.log("responseData:", responseData)
					// Refresh contacts on page
					actions.openContactBook()
				} catch (error) {
					console.error("Error:", error);
				}
			}, 

			// --- ADD NEW CONTACT PAGE ------------------------------------
			setNewContactInput: (value, inputName) => {
				const store = getStore();
				if (inputName === "name") {
					store.newContact.full_name = value;
				}
				if (inputName === "address") {
					store.newContact.address = value;
				}
				if (inputName === "phone") {
					store.newContact.phone = value;
				}
				if (inputName === "email") {
					store.newContact.email = value;
				}
				console.log(store.newContact.full_name)
			},
			submitNewContactInput: async () => {
				const store = getStore();
				const fetchURL = "https://playground.4geeks.com/apis/fake/contact/"
				try {
					const agendaResponse = await fetch(fetchURL, {
						method: "POST",
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(store.newContact),
					});
					// if bad response 
					if (!agendaResponse.ok) {
						throw new Error(agendaResponse.statusText)
					} // else (good response)	
					const agendaData = await agendaResponse.json();
					// Combine exisiting contacts with new contact first
					const updatedContacts = [...store.contact, agendaData];
					// Now update 'contact' with this new array
					setStore({ contact: updatedContacts });
					setStore(store.toggle = false);
				} catch (error) {
					console.error("Error:", error);
				}
			},
		}
	};
};
export default getState;
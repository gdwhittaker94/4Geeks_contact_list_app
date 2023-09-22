const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//////////// MY STORE/STATE ///////////
			toggle: true,
			contactBooks: [],
			newContactBook: null,
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
			userID: null, 
			userContactList: [],
			
			///////// DEMO STORE/STATE ////////////
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			//////////// CONTACT BOOKS LIST PAGE ////////////
			fetchContactBooks: async () => {
				const fetchResponse = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/");
				const listOfContactBooks = await fetchResponse.json();
				setStore({contactBooks: listOfContactBooks});
			},
			setNewContactBook: (value) => {
				const store = getStore();
				store.newContactBook = value; 
			},
			submitNewContactBook: async () => {
				const store = getStore();
				const actions = getActions();
				const fetchURL = "https://playground.4geeks.com/apis/fake/contact/";
				const fetchBody = {
					method: "POST", 
					headers: {"Content-Type": "application/json"}, 
					body: JSON.stringify({
						...store.exampleContact,
						agenda_slug: store.newContactBook
					})};
				try {
					const fetchResponse = await fetch(fetchURL, fetchBody)
					// bad response
					if(!fetchResponse.ok){
						throw new Error(fetchResponse.statusText)
					}
					actions.fetchContactBooks();


					// DELETE LATER	WHEN CERTAIN
					// // good response -			
					// const newContactBookData = await fetchResponse.json();
					// console.log(newContactBookData)

					// const updatedContactBookList = [...store.contactBooks, newContactBookData];
					// console.log(updatedContactBookList)

					// setStore({contactBooks: updatedContactBookList});
					// console.log(store.contactBooks)
				} catch (error) {
					console.error("Error:", error);
				}
			},
			setID: (ID) => {
				const store = getStore();
				setStore({userID: ID});
				setStore({
					newContact: {
						agenda_slug: ID
					}
				});
				console.log("userID from setID:", store.userID)
			},
			//////////// LIST OF CONTACTS PAGE ////////////
			openContactBook: async () => {
				const store = getStore();
				const fetchResponse = await fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/${store.userID}`);
				const idContactsList = await fetchResponse.json();
				setStore({userContactList: idContactsList });
			},

			//////////// ADD NEW CONTACT PAGE ////////////
			setNewContactInput: (value, inputName) => {
				const store = getStore();
				if(inputName === "name"){
					store.newContact.full_name = value;
				}
				if(inputName === "address"){
					store.newContact.address = value;
				}
				if(inputName === "phone"){
					store.newContact.phone = value;
				}
				if(inputName === "email"){
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
					if(!agendaResponse.ok){
						throw new Error(agendaResponse.statusText)
					} // else (good response)	
					const agendaData = await agendaResponse.json();
					// Combine exisiting contacts with new contact first
					const updatedContacts = [...store.contact, agendaData];
					// Now update 'contact' with this new array
					setStore({contact: updatedContacts});
					setStore(store.toggle = false);
				} catch (error) {
				console.error("Error:", error);
				}
			},		
		}
	};
};
export default getState;


// FETCH API ATTEMPT

			// submitInput: () => {
			// 	const store = getStore();
			// 	const updatedContacts = [];
			// 	fetch("https://playground.4geeks.com/apis/fake/contact/", {
			// 		method: 'POST',
			// 		headers: new Headers({
			// 				'Content-Type': 'application/json'				
			// 		}), 
			// 			body: JSON.stringify(store.newContact),
			// 	})
			// 	.then(response => response.json())
			// 	.then(result => 
			// 		updatedContacts = [...store.contact, result])
			// 		setStore({contact: updatedContacts})
			// 		setStore(store.toggle = false)
			// 	.catch(error => console.error(error))
			// },

			/////////// DEMO FUNCTIONS ////////////
			// Use getActions to call a function within a fuction
			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			// loadSomeData: () => {
			// 			/**
			// 		fetch().then().then(data => setStore({ "foo": data.bar }))
			// 	*/
			// },

			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// }
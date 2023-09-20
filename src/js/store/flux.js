const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//////////// MY STORE/STATE ///////////
			toggle: true,
			contact: [
				{}
			],
			newContact: {
				full_name: null,
				email: null,
				agenda_slug: "gdw_agenda",
				address: null,
				phone: null,
				
			},
			
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
			//////////// MY FUNCTIONS ////////////
			loadSomeData: async () => {
				const agendaResponse = await fetch("https://playground.4geeks.com/apis/fake/contact/agenda/gdw_agenda");
				const agendaData = await agendaResponse.json();
				setStore({contact: agendaData});

				// if gdw_agenda = {}, show message 
			},
			setInput: (value, inputName) => {
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
			},

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

			// ASYNC/AWAIT ATTEMPT
			// submitInput: async () => {
			// 	const store = getStore();
			// 	try {
			// 	fetch("https://playground.4geeks.com/apis/fake/contact/", {	const agendaResponse = await 
			// 			method: "POST",
			// 			headers: {
			// 				'Content-Type': 'application/json'				
			// 		}, 
			// 			body: JSON.stringify(store.newContact),
			// 	});
			// 		if(!agendaResponse.ok){
			// 			throw new Error(agendaResponse.statusText)
			// 		}	
			// 		const agendaData = await agendaResponse.json();
			// 		console.log(agendaData);

			// 		// Combine exisiting contacts with new contact first
			// 		const updatedContacts = [...store.contact, agendaData];
			// 		console.log(updatedContacts)

			// 		// Now update 'contact' with this new array
			// 		setStore({contact: updatedContacts});
			// 		console.log(store.contact);
			// 		setStore(store.toggle = false);
			// 		console.log(store.contact);

					
			// 	} catch (error) {
			// 	console.error("Error:", error);
			// 	}
			},
						


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
		}
	};

export default getState;

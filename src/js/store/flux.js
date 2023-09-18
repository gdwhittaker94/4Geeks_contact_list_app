const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// MY STORE/STATE
			contact: [
				{
					name: "Adam Smith",
					address: "123 Street",
					phone: "02198574238",
					email: "email@email.com", 
					background: "white"
				}
			],

			// DEMO STORE/STATE
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
			// MY FUNCTIONS
			deleteContact: (index) => {
				const store = getStore();
				//** */ HOW TO DELETE CONTACT OBJECT FROM ARRAY?
				// Look at todo list project
				});

				//reset the global store
				setStore({ demo: demo });
			},


			// DEMO FUNCTIONS
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;

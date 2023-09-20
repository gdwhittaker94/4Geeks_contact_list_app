import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Where we initialize our context. By default = null. Don't edit. 
export const Context = React.createContext(null);

// Func. injects the global store to any view/component where you want to use it. We inject the context to layout.js (see imports in that file)
const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		// the global state, an object - this will be passed as the context value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store, // Gets us to access to the store
				getActions: () => state.actions, // Gets us to access to the actions
				setStore: updatedStore => // Updates store (global state)
					setState({
						store: Object.assign(state.store, updatedStore),
						actions: { ...state.actions }
					})
			})
		);

		useEffect(() => {
			
			// const actions = getActions();
			
			state.actions.loadSomeData()

			
			/**
			 * EDIT THIS!
			 * Equivalent to "window.onLoad", executes only once ([]).
			 * Perform your ajax requests/fetch api requests here. 
			 * Do not use setState() to save data in the store, instead use actions, like this:
			 * state.actions.loadSomeData(); <---- calling this function from the flux.js actions
			 **/
		}, []);

		// Now Context variable doesn't = null, but = current state of this component.
		// Context now has getStore, getActions + setStore functions available (as they're declared on this component's state)
		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
			// PassesComponent = App, thus our App is enveloped by our Context making Context available everywhere 
		);
	};
	return StoreWrapper;
};

export default injectContext;

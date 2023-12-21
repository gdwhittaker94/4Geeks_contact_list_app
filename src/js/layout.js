import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
//Components
import { ContactBookList } from "./views/contactbooklist";
import { ListOfContact } from "./views/listofcontact";
import { AddContact } from "./views/addcontact";

const Layout = () => {
	return (
		<div>
			<BrowserRouter basename={basename}>
					<Routes>
						<Route path="/" element={<ContactBookList/>}/>
						<Route path="/listofcontact/:id" element={<ListOfContact/>}/>	
						<Route path="/addcontact" element={<AddContact/>}/>	
						<Route path="*" element={<h1>Page Not found!</h1>} />
					</Routes>
			</BrowserRouter>
		</div>
	);
};

// We pass Layout component to injectContext(), which gets enveloped by Context. 
// Thus the the context is available throughout our application 
export default injectContext(Layout);

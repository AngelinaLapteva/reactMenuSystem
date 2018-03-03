import React from 'react';

// we need to import render method so we could inject it into html file
import { render } from 'react-dom';
import {getFunName} from '../helpers'

class StorePicker extends React.Component{

// we need to put this(which is StorePicker component) into our method goTostore, we are going to use constractor for it
 	// constructor() {
 	// 	// super creates a react component "StorePicker" and then put in it out custome made method goToStore
 	// 	super();
 	// 	// then super() allows us to say
 	// 	// what it does: 1. look for goToStore method (this.goTo)
 	// 	// 2. then sets itself
 	// 	// 3. bind itself to 'this' (because indise of constructor this=StorePicker)
 	// 	this.goToStore = this.goToStore.bind(this);
 	// }


	goToStore(event){
		event.preventDefault();
		console.log('you changed the url');
		console.log(this.storeInput.value);
		// grab the text from the box
		 const storeId = this.storeInput.value;
		// transition from / to /store/:storeId (we are going to use imperative APi) and we are going to make router available for StorePicker component so we could use transitionTo from the router
		this.context.router.transitionTo(`/store/${storeId}`)


		// props are used to send date from parent down to child component

		//states are used for holding data
	}


	// this piece is similar to : function render(){}
	render(){ 
			// return <p>Hello</p>
			// 'p' - teg name
			// return React.createElement('p', {className:'Testing'}, 'I love you')
			// this.goToStore.bind(this) does the same thing as contructor
			//or
			//this.goToStore.bind(this)}
		return (
			<form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
			{/* JSX part */}
				<h2> Please enter a Store Name </h2>
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} />
				<button type="submit"> Visit store</button>
			</form>
		)
	}
}
// tell the react that component StorePicker is expecting the router, then the method context will be available for storepicker=this
StorePicker.contextTypes = {
	router: React.PropTypes.object
}
export default StorePicker;
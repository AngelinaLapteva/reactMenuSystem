import React from 'react';
// we are importing another component which we are using inside render
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';
//https://toddmotto.com/react-create-class-versus-component/ - explanation of extends component

class App extends React.Component {
	// we use a constructor method in out ES6 in order to create states for order and for inventory
	constructor(){
		super();
		// in order to see our custom method we need to bring it into constructor as well
		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);
		//initial state, getinitialState in case you are using React.CreateClass
		this.state = {
			fishes:{},
			order:{}
		};
	}
// willMount and etc  allows to sync our component state with out firebse state
	componentWillMount(){
		this.ref=base.syncState(`${this.props.params.storeId}/fishes`, {
			context:this,
			state: 'fishes'
		});

// check if there is any order in localStorage
//localStorage.getItem built in method
		const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);
		if(localStorageRef) {
			// if localStorageRef exists then we need to update our state.  JSON.parse oposite of JSON.stringify
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}
	}

	componentWillUnMount(){
		base.removeBinding(this.ref);
	}
// and we want to send our new updated state, and this method will help us to update it before rendering and its triggered as soon as we change something in our state. In our case we are going to add to order more fish which means that state 'order' will be updated
	componentWillUpdate(nextProps, nextState){
		console.log('something changed');
		console.log({nextProps, nextState});
		// lets set our local storage (we are doing local storage just for learning purposes here)
		// we need JSON.stringify for converting nextState.order into a string, instead of object
		localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order));
	}

		// after states are created and data from AddFishForm is grabable we need to put inside of our state. we are going to use a method 
	
	addFish(fish){
		// update our state
		// first we are taking a copy of our existent state where 'this.state.fishes' is out alredy existing fishes state and '...' is a spread - > it will take evry item from our object  and spread it (meaning just make a copy )
		const fishes={...this.state.fishes}

		//add in our new fish, we are going to use a timestamp as our id because its unique always 
		const timestamp = Date.now();//number of mls since 2001
		fishes[`fish-${timestamp}`] = fish; // where fish is our object with data frim AddFishForm 

		// set state means change the info inside the state due to updates coming input fiels
		this.setState({fishes})
	}

// updatedFish is an actual object with data for a specific fish (by key) inside, being sent from our <Inventory/> component
	updateFish(key, updatedFish){
// copy the existing state first
	const fishes = {...this.state.fishes};
//update state
	fishes[key]=updatedFish;
	this.setState({fishes});
	}

	removeFish(key){
// first lets take a copy of our fishes state
	const fishes = {...this.state.fishes};
// remove fish object
	fishes[key] = null;
// update the state with all the fishes
	this.setState({fishes});
	}

// taking data from sample-fishes file
	loadSamples(){
		this.setState({
			fishes:sampleFishes,
		});
	}

	addToOrder(key) {
		// take a copy of our state
		const order = {...this.state.order};
		// update or add the new number of fish ordered
		order[key] = order[key]+1 || 1;
		//updare our state, ({order:order})=({order}) 
		this.setState({order:order})
	}
	removeFromOrder(key){
		const order = {...this.state.order};
		delete order[key]; // since we are not attached to firebase we can use delete
		this.setState({order});
	}


	// render method is needed on all of your components
	render() {
		// <Order /> is a component
		return (
			// for Invetory custom teg we are adding a function call addFish from our App.js component
			// we need to make a loop with <Fish/> component in order to repeat it several times, so we just going to implement Javascript insid jsx 
			<div className="catch-of-the-day">
				<div className="menu">
					<Header age="5000" cool={true} tagline="Fresh Seafood Market"/>
					<ul className="list-of-fishes">
						{
							Object.keys(this.state.fishes) // inside map we have a function which return us Fish component for every single array element in state fishes , [key] a unique and we also need to pass it to our fish component in order to add ordered amount by ID-> we create custom ref: index={key} 
								  .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)


						}
					</ul>
				</div>

				<Order 
				fishes={this.state.fishes} 
				order={this.state.order} 
				params={this.props.params}
				removeFromOrder={this.removeFromOrder}
				/>

				<Inventory 
				addFish={this.addFish} 
				loadSamples={this.loadSamples}  
				fishes={this.state.fishes}
				updateFish={this.updateFish}
				removeFish={this.removeFish}
				storeId={this.props.params.storeId}
				/>
				
			</div>

			)
	}
}
App.propTypes = {
	params:React.PropTypes.object.isRequired
}
//now we a re exporting out component App
export default App;

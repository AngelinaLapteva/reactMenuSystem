import React from 'react';
import { formatPrice } from '../helpers';
import CSSTransitionGroup from 'react-addons-css-transition-group';

class Order extends React.Component {

	constructor(){
		super();
		this.renderOrder = this.renderOrder.bind(this);
	}
	renderOrder(key){
 		const fish = this.props.fishes[key];
 		const count = this.props.order[key];
 		const removeButton = <button onClick={()=>this.props.removeFromOrder(key)} key={key}>&times;</button>
// if there is no fish (empty array) or fish has status unavailable
 // <span key={count}>{count}</span> we want a unique element so we add count as a key, otherwise react will duplicate an element instead of updating it

 		if (!fish || fish.status === 'unavailable') {
 			//{fish? fish.name} means: if there is a fish existing then return its name
 			// : 'fish' means otherwise return word 'fish'
 			return <li key={key}>Sorry {fish ? fish.name : 'fish'} is no longer available {removeButton}</li>
 		}
 		return (
 			// <span key={count}>{count}</span> we need a key for the count for react so it would assign to previous element count-leave and for the next coming element count-enter (mean we will have 2 spans with text inside '1' and '2' and then '1' would be removed since it has a class count-leave)
 			<li key={key}>
	 			<span>
	 				<CSSTransitionGroup
	 				component="span"
	 				className="count"
	 				transitionName="count"
	 				transitionEnterTimeout={250}
	 				transitionLeaveTimeout={250}>
	 				 <span key={count}>{count}</span>
	 				</CSSTransitionGroup>
	 				lbs {fish.name} {removeButton}
 				</span>
 				<span className="price">{formatPrice(count*fish.price)}</span>
 			</li>
 		)
	}
	
	render(){
		const orderIds = Object.keys(this.props.order);
		console.log('orderIds=',orderIds);
		// reduce will help us to loop over the array and return stuff we only need and reduce the other
		const total=orderIds.reduce((prevTotal, key) =>{
				const fish = this.props.fishes[key];
				const count = this.props.order[key];
				console.log('count=',count);

			// this is our term to check if the fish does exist and if it has status 'available'
			const isAvailable = fish && fish.status === 'available';
			// if the fish is avaialbale (meaning the the rule on line before is working)
			if (isAvailable) {
				return prevTotal + (count*fish.price || 0)
			}
			return prevTotal;
		}, 0);
		return (
			<div className="order-wrap">
				<h2>Your Order</h2>
				<CSSTransitionGroup 
				className="order"
				component="ul"
				transitionName="order"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={500}
				>
				{orderIds.map(this.renderOrder)}
					<li className="total">
						<strong>Total:</strong>
						{formatPrice(total)}
					</li>
				 </CSSTransitionGroup>

				
			</div>
			)
	}
}
Order.propTypes = {
fishes: React.PropTypes.object.isRequired,
order: React.PropTypes.object.isRequired,
removeFromOrder: React.PropTypes.func.isRequired
}
export default Order;
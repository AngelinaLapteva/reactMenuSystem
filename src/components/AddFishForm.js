import React from 'react';

class AddFishForm extends React.Component {
	// we need to create method which takes all the data from render method
	createFish(event){
		event.preventDefault();
		console.log('going to make some fish');
		const fish = {
			name:this.name.value,
			price:this.price.value,
			status:this.status.value,
			desc:this.desc.value,
			image:this.image.value,
		}
this.props.addFish(fish);
//to clear up input fields in form 
this.fishForm.reset();


	}

	render() {
		return (
			// to clean up our form after submiting we will add an extra ref
			<form ref={(input) => this.fishForm=input} className="fish-edit" onSubmit={(e) => this.createFish(e)}> 
				<input ref={(input) => this.name = input} type="text" placeholder="Fish Name" />
				<input ref={(input) => this.price = input} type="text" placeholder="Fish Price" />
				<select ref={(input) => this.status = input}>
					<option value="available">Fresh</option>
					<option value="unavailable">Sold Out</option>
				</select>
				<textarea ref={(input) => this.desc = input}type="text" placeholder="Fish Desc"></textarea>
				<input ref={(input) => this.image = input} type="text" placeholder="Fish Image"/>
				<button type="submit"> + Add Item</button>
			</form>
		)
	}
}
// we only use props in addFish and addFish is a function
AddFishForm.propTypes = {
	addFish:React.PropTypes.func.isRequired
}
export default AddFishForm;
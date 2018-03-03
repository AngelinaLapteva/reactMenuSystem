import React from 'react';
//creating stateless function because all we need to do with this header component is only render some html into DOM
const Header = (props) => {
		// "this" is refering to Header component, props is an object with data inside from header (in our case "cool", "age" or "tagline", depends what we will pick)
		 
		return (
			<header className="top">
				<h1>
					Catch 
					<span className="ofThe">
						<span className="of">of</span>
						<span className="the">the</span>
					</span>
					Day
				</h1> 
				<h3 className="tagline"><span>{props.tagline}</span> </h3>
			</header>
			)
}

// we need this for validation, so it means that our tagline should be a string and it is required to be there. When we go inside our app.js component and we have a header component which has a tagline ref inside
Header.propTypes = {
	tagline: React.PropTypes.string.isRequired
}

export default Header;
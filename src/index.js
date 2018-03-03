
import React from 'react';

import './css/style.css';
// we need to import render method so we could inject it into html file
import { render } from 'react-dom';

import { BrowserRouter, Match, Miss} from 'react-router';

import StorePicker from './components/StorePicker';

import App from './components/App';
import NotFound from './components/NotFound';


// class StorePicker extends React.Component{
	
// // this piece is similar to : function render(){}
// 	render(){
// 		return <p>Hello</p>
// 	}
// }
// const repo = `/${window.location.pathname.split('/')[1]}`;
const Root = () => {
	return (
		// we put a basename bacause on out github we created a folder called ReactExample : basename="/reactExample"
		<BrowserRouter >
		<div>
			<Match exactly pattern="/" component={StorePicker} />
			<Match pattern="/store/:storeId" component={App} />
			<Miss component={NotFound} />
		</div>
		</BrowserRouter>
		)
}

render(<Root/>,document.querySelector('#main'));
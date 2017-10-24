import React, {Component} from 'react';
// import axios from 'axios';

class MoviePage extends Component {
	constructor(props){
		super(props);
		this.state = {
			cache: null
		}
	this.onSubmit = this.onSubmit.bind(this);
	this.onChange = this.onChange.bind(this);
	}
	onSubmit(e) {	
		e.preventDefault();
		
	}//end onSubmit
	render(){
		return(<div>
MoviePage
			</div>)
	}
}

export default MoviePage;
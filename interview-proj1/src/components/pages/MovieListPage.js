import React, {Component} from 'react';
import { Dropdown } from 'semantic-ui-react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import '../../scss/card.css';
import MovieCard from '../forms/movieCard';
// import { fetchMovies } from '../../actions/actions';

class MoviesListPage extends Component {
	state = {
		cache: undefined,
		menu: null,//dropdown
		update: undefined,
		movieCard: [],
		listLength: 0
		};
	componentDidMount() {
		axios.get('/api/lists').then(res =>{
			this.setState({cache: res.data.data})
			// console.log(res.data)
		}).catch(err => console.log(err))
	}
	componentDidUpdate(prevProps, prevState) {
	if(typeof this.state.cache  === 'undefined' ||
	   this.state.menu  !== null) return;		
	let o = this.state.cache.map((cache,i)=>{ 
	 // console.log('cache:',cache.listTitle)
	 	return(
	 		{key: i, text: cache.listTitle, value: i }
	 		)});
	// console.log('o:', o);
	 this.setState({menu: o})
}//end componentDidUpdate
	getData(i) {
		let arr = [];
		// console.log(this.state.cache[i].data)
		for (let j=0; j<this.state.cache[i].data.length; j++) {
		const movie = this.state.cache[i].data[j];
		let x = (<MovieCard movie={movie} key={movie._id} />)
			arr.push(x)
		}		
		this.setState({ movieCard: arr, listLength: this.state.cache[i].data.length })
	}
	render() {		
		// console.log(this.state.movieCard)
		let showList = this.state.movieCard.map((Card,i) =>{
			// console.log(Card)
			return (
				Card //gives key warning - interesting
				)
		});

		return (
			<div>
			<h1>Movies List:</h1>
			{' '}

	    <Dropdown selection 
	    onChange={(e, { value }) => this.getData(value)}
	    options={this.state.menu} placeholder='select list' />
	    &nbsp;
	    <h1>List Size:&nbsp;{this.state.listLength}</h1> 
	    <div className="ui three cards">
	    {showList}
	    </div>
			</div>
			)
	}
}


export default connect(null)(MoviesListPage);
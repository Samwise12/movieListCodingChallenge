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
		movieCard: null,
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
		// console.log(this.state.cache[i])
		 // console.log(this.state.cache[i].data.length)
		// const { movie } = this.state.cache[i]
		const movie = this.state.cache[i].data[0];
		let x = (<MovieCard movie={movie} key={movie._id} />)
		this.setState({ movieCard: x, listLength: this.state.cache[i].data.length })
	}
	render() {		
		// console.log(this.state.cache)
		return (
			<div>
			<h1>Movies List:</h1>
			{' '}

	    <Dropdown selection 
	    onChange={(e, { value }) => this.getData(value)}
	    options={this.state.menu} placeholder='select list' />
	    &nbsp;
	    <h1>List Size:&nbsp;{this.state.listLength}</h1> 
	    {this.state.movieCard}
			</div>
			)
	}
}

export default connect(null)(MoviesListPage);
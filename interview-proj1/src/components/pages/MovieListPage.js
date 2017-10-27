import React, {Component} from 'react';
import { Modal, Header, Button, Dropdown } from 'semantic-ui-react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import filter from 'lodash/filter';
// import remove from 'lodash/remove';
import '../../scss/card.css';

import { deleteMovie } from '../../actions/actions';
import MovieCard from '../forms/movieCard';

const modalRater = () => {
	console.log('modal clicked');
	return (
  <Modal trigger={<Button>Show Modal</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    {/*<Modal.Content image>*/}
      {/*<Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />*/}
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    {/*</Modal.Content>*/}
  </Modal>
)}

class MoviesListPage extends Component {
	state = {
		cache: undefined,
		menu: null,//dropdown
		currentList: undefined,
		movieCard: [],
		listLength: 0,
		ratingAvg: 0,
		updater: this.props.list
		};
 _handleKeyPress = (e) => {
    if (e.key === 'Enter') {    	
      this.filterByName(this.refs.find.value)
    }
  }		
	componentDidMount() {
		axios.get('/api/lists').then(res =>{
			this.setState({cache: res.data.data})
			// console.log(res.data)
		}).catch(err => console.log(err))
	}
	componentDidUpdate(prevProps, prevState) {
	if(typeof this.state.cache   === 'undefined' ||
	   this.state.menu  !== null ) return;			
	let o = this.state.cache.map((cache,i)=>{ 
	 // console.log('cache:',cache.listTitle)
	 	return(
	 		{key: i, text: cache.listTitle, value: i }
	 		)});
	// console.log('o:', o);
	 this.setState({menu: o})
}//end componentDidUpdate
	getData(i) {
		let arr = [], arrRatings = [];
		// console.log(this.state.cache[i].data)
		for (let j=0; j<this.state.cache[i].data.length; j++) {
		const movie = this.state.cache[i].data[j];
		const { deleteMovie } = this.props;
		let x = (<MovieCard deleteMovie={deleteMovie} rateMovie={this.rateMovie.bind(this)}
			movie={movie} removeItem={this.removeItem.bind(this)} key={movie.id} />)
			arr.push(x)
			arrRatings.push(this.state.cache[i].data[j].vote_average)
		}		
		const avg = arrRatings.reduce((sum, value) => sum + value, 0)/arrRatings.length;
		let ratingAvg = avg.toFixed(1)

		this.setState({ movieCard: arr, listLength: this.state.cache[i].data.length,
		 currentList: i, ratingAvg: ratingAvg });
	}
	sortByName(e) {
		const { currentList } = this.state;
		if(typeof this.state.cache[currentList] === 'undefined'){
			return;
		}
		// console.log(this.state.cache[currentList].data)

	let sortedList = this.state.cache[currentList].data.sort(function(a, b) {
    var titleA = a.title.toUpperCase();
    var titleB = b.title.toUpperCase();
    return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
});

    let arr = [];
    for (let j=0; j<this.state.cache[currentList].data.length; j++) {
		const movie = sortedList[j];
		const { deleteMovie } = this.props;
		let x = (<MovieCard deleteMovie={deleteMovie} 
			movie={movie} removeItem={this.removeItem.bind(this)} key={movie.id} />)
			arr.push(x)
		}		
		this.setState({ movieCard: arr});
	} //end sortByName()

	sortByRating(e) {
		const { currentList } = this.state;
		if(typeof this.state.cache[currentList] === 'undefined'){
			return;
		}		
		// console.log(this.state.cache[currentList].data)

	let sortedList = this.state.cache[currentList].data.sort(function(a, b) {
    var ratingA = a.vote_average;
    var ratingB = b.vote_average;
    return (ratingA > ratingB) ? -1 : (ratingA < ratingB) ? 1 : 0;
});
	// console.log(sortedList)
    let arr = [];
    for (let j=0; j<this.state.cache[currentList].data.length; j++) {
		const movie = sortedList[j];
		const { deleteMovie } = this.props;
		let x = (<MovieCard deleteMovie={deleteMovie} 
			movie={movie} removeItem={this.removeItem.bind(this)} key={movie.id} />)
			arr.push(x)
		}		
		this.setState({ movieCard: arr});
	} //end sortByName()	

	filterByName(e) {
		const { currentList } = this.state;
		if(typeof this.state.cache[currentList] === 'undefined'){
			return;
		}

		if (e.length === 0) {
		let arr = [];
		for (let j=0; j<this.state.cache[currentList].data.length; j++) {
		const movie = this.state.cache[currentList].data[j];
		// console.log(movie)
		const { deleteMovie } = this.props;
		let x = (<MovieCard deleteMovie={deleteMovie} 
			movie={movie} removeItem={this.removeItem.bind(this)} key={movie.id} />)
			arr.push(x)
		}
		alert('There are no movies in your list with this name');
			this.setState({ movieCard: arr })
			// console.log('arr:',arr)
			return;
		}
		
		// console.log(this.state.cache[currentList].data)
	
	 let filteredList = filter(this.state.cache[currentList].data, ['title', e]);

	let arr = [];
    for (let j=0; j<filteredList.length; j++) {
		const movie = filteredList[j];
		const { deleteMovie } = this.props;
		let x = (<MovieCard deleteMovie={deleteMovie} 
			movie={movie} removeItem={this.removeItem.bind(this)} key={movie.id} />)
			arr.push(x)
		}		
		this.setState({ movieCard: arr, listLength: arr.length}, () =>{
			if (this.state.movieCard.length === 0) {return this.filterByName('');} 
		});
	} //end filterByName

	removeItem(movieId) {
    const { currentList } = this.state;
    // console.log(this.state.cache[currentList].data)
    // console.log('movieId: ', movieId)
let filterMovie = filter(this.state.cache[currentList].data, (o)=> {
	return Number(o.id) !== Number(movieId)
});
// console.log(filterMovie)
    let arr = [];
	for (let j=0; j<filterMovie.length; j++) {
		const movie = filterMovie[j];
		const { deleteMovie } = this.props;
		let x = (<MovieCard deleteMovie={deleteMovie} 
			movie={movie} removeItem={this.removeItem.bind(this)} key={movie.id} />)
			arr.push(x)
		}		
		// console.log(arr)
		this.setState({ movieCard: arr, listLength: arr.length});
	} // end removeItem

	rateMovie(e) {
		console.log(e)
		modalRater()
	}
	render() {		
		// console.log(this.state.movieCard)
		let r = (typeof this.state.currentList === 'undefined') ? (<div></div>) : (<h1>average rating of list rating:&nbsp;{this.state.ratingAvg}</h1>)
		let showList = this.state.movieCard.map((Card,i) =>{
			// console.log(Card)
			return (
				Card
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
	    {' '}
	    <Button onClick={() => this.sortByName('clicked')}>sort by name</Button>
	    <Button onClick={() => this.sortByRating('clicked')}>sort by rating</Button>

		 	<input ref='find' onKeyPress={this._handleKeyPress}
		 	 id="createList" placeholder="Search..." />		 

	    <div className="ui three cards">
	    {showList}
	    </div>
	    &nbsp;
			{r}
			</div>
			)
	}
}

// MoviesListPage.propTypes = {
	
// 	updater: PropTypes.number.isRequired
// }

function mapStateToProps(state){
	return {
	updater: state.list
	}	
}


export default connect(mapStateToProps, { deleteMovie })(MoviesListPage);


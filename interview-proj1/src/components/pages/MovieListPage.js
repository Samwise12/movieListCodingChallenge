import React, {Component} from 'react';
import { Rating, Image, Header, Modal, Button ,Dropdown } from 'semantic-ui-react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import filter from 'lodash/filter';
import findKey from 'lodash/findKey';
// import remove from 'lodash/remove';
import update from 'react-addons-update';
import ReactModal from 'react-modal';
import '../../scss/card.css';

import { deleteMovie } from '../../actions/actions';
import MovieCard from '../forms/movieCard';

const customStyles = {
  content : {
    top                   : '45%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
  	maxHeight             : '1000px',
    marginRight           : '-10%',
    transform             : 'translate(-50%, -50%)',
    
  }
};

class MoviesListPage extends Component {
	state = {
		cache: undefined,
		menu: null,//dropdown
		currentList: undefined,
		movieCard: [],
		listLength: 0,
		ratingAvg: 0,
		updater: this.props.list,
		showModal: false,
		modalPoster: undefined,
		rating: null,
		handle1: false
		};
handleRate = (e, { rating }) => {
	// console.log(this.state.cache)
	const { id, currentList } = this.state;
	const newRating = { rating, id };
	let objKey = findKey(this.state.cache[currentList].data, {id: id});
	// console.log(objKey)
	// console.log(this.state.cache[0])
	// console.log('newRating:',newRating)//update Rating
	/*for (let i =0;i<this.state.cache.length;i++){
		console.log(i)
	}*/
	const q = update(this.state.cache, {
   [currentList]:  {rating: { [objKey] : {$set: newRating }} } });
   // console.log('q: ', q[0]);			
	axios.put('/api/lists', { rating, id: id, objKey: objKey }).then(response=>
		{
		let arr = [], arrRatings = [];
		const pRating = q[currentList].rating;
		// console.log(q[currentList].rating)
		for (let j=0; j<q[currentList].data.length; j++) {
		const movie = q[currentList].data[j];
		const { deleteMovie } = this.props;
		let x = (<MovieCard deleteMovie={deleteMovie} 
			rateMovie={this.rateMovie.bind(this)} pRating={pRating}
			movie={movie} removeItem={this.removeItem.bind(this)} key={movie.id} />)
			arr.push(x)
			arrRatings.push(q[currentList].data[j].vote_average)
		}		
		const avg = arrRatings.reduce((sum, value) => sum + value, 0)/arrRatings.length;
		let ratingAvg = avg.toFixed(1)

		this.setState({ movieCard: arr,cache: q, listLength: this.state.cache[currentList].data.length,
		  ratingAvg: ratingAvg });
		});
}		
 _handleKeyPress = (e) => {
    if (e.key === 'Enter') {    	
      this.filterByName(this.refs.find.value)
    }
  }		
 handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
  	// console.log(e.target)
    this.setState({ showModal: false });
  }  
	componentDidMount() {
		axios.get('/api/lists').then(res =>{
			this.setState({cache: res.data.data})
			// console.log(res.data)
		}).catch(err => console.log(err))
	}
	componentDidUpdate(prevProps, prevState) {
	if(typeof prevState.currentList !== 'undefined' && this.state.handle1){
	// console.log('prevState:', prevState.cache[prevState.currentList].rating);		
	let currentStateList = this.state.currentList;
const q = update(this.state.cache, {
[currentStateList]:  {rating: {$set: prevState.cache[prevState.currentList].rating} } });	
	// console.log('q: ',q);
	// console.log(this.state.cache[currentStateList])
	//recreate Card
	// const { id } = this.state;
let arr = [], arrRatings = [];
		const pRating = q[currentStateList].rating;
		// console.log(q[currentStateList].rating)
		for (let j=0; j<q[currentStateList].data.length; j++) {
		const movie = q[currentStateList].data[j];
		const { deleteMovie } = this.props;
		let x = (<MovieCard deleteMovie={deleteMovie} 
			rateMovie={this.rateMovie.bind(this)} pRating={pRating}
			movie={movie} removeItem={this.removeItem.bind(this)} key={movie.id} />)
			arr.push(x)
			arrRatings.push(q[currentStateList].data[j].vote_average)
		}		
		const avg = arrRatings.reduce((sum, value) => sum + value, 0)/arrRatings.length;
		let ratingAvg = avg.toFixed(1)
	//
	this.setState({ movieCard: arr,cache: q, listLength: this.state.cache[currentStateList].data.length,
		ratingAvg: ratingAvg, handle1: false});	
	// this.setState({cache: q, handle1: false})
	}
	// console.log('this.state: ',this.state.currentList);			
	// console.log(this.state.currentList)
	
	// this.setState()
	if(typeof this.state.cache   === 'undefined' ||
	   this.state.menu  !== null ) return;			
	let o = this.state.cache.map((cache,i)=>{ 
	 // console.log('cache:',cache.listTitle)
	 	return(
	 		{key: i, text: cache.listTitle, value: i }
	 		)});
	// console.log('o:', o);
	// console.log('wokr!')
	 this.setState({menu: o})
}//end componentDidUpdate
	getData(i) {
		let arr = [], arrRatings = [];
		// console.log(this.state.cache)
		const pRating = this.state.cache[i].rating;
		// console.log(this.state.cache[i].rating)
		for (let j=0; j<this.state.cache[i].data.length; j++) {
		const movie = this.state.cache[i].data[j];
		const { deleteMovie } = this.props;
		let x = (<MovieCard deleteMovie={deleteMovie} 
			rateMovie={this.rateMovie.bind(this)} pRating={pRating}
			movie={movie} removeItem={this.removeItem.bind(this)} key={movie.id} />)
			arr.push(x)
			arrRatings.push(this.state.cache[i].data[j].vote_average)
		}		
		const avg = arrRatings.reduce((sum, value) => sum + value, 0)/arrRatings.length;
		let ratingAvg = avg.toFixed(1)

		this.setState({ movieCard: arr, listLength: this.state.cache[i].data.length,
		 currentList: i, ratingAvg: ratingAvg, handle1: true });
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
    const pRating = this.state.cache[currentList].rating;
    for (let j=0; j<this.state.cache[currentList].data.length; j++) {
		const movie = sortedList[j];
		const { deleteMovie } = this.props;
		let x = (<MovieCard deleteMovie={deleteMovie} 
			rateMovie={this.rateMovie.bind(this)} pRating={pRating}
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
    const pRating = this.state.cache[currentList].rating;
    for (let j=0; j<this.state.cache[currentList].data.length; j++) {
		const movie = sortedList[j];
		const { deleteMovie } = this.props;
		let x = (<MovieCard deleteMovie={deleteMovie} 
			rateMovie={this.rateMovie.bind(this)} pRating={pRating}
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
const pRating = this.state.cache[currentList].rating;
		let arr = [];
		for (let j=0; j<this.state.cache[currentList].data.length; j++) {
		const movie = this.state.cache[currentList].data[j];
		// console.log(movie)
		const { deleteMovie } = this.props;
		let x = (<MovieCard deleteMovie={deleteMovie} pRating={pRating} rateMovie={this.rateMovie.bind(this)}
			movie={movie} removeItem={this.removeItem.bind(this)} key={movie.id} />)
			arr.push(x)
		}
		alert('There are no movies in your list with this name');
			this.setState({ movieCard: arr })
			// console.log('arr:',arr)
			return;
		}
		
		// console.log(this.state.cache[currentList].data)
	
	 // let filteredList = filter(this.state.cache[currentList].data, ['title', e]);
let filteredList = filter(this.state.cache[currentList].data, l=> {
	return l.title.toLowerCase() === e.toLowerCase();	
});	 

	let arr = [];
	const pRating = this.state.cache[currentList].rating;

    for (let j=0; j<filteredList.length; j++) {
		const movie = filteredList[j];
		const { deleteMovie } = this.props;
		let x = (<MovieCard deleteMovie={deleteMovie} rateMovie={this.rateMovie.bind(this)} pRating={pRating}
			movie={movie} removeItem={this.removeItem.bind(this)} key={movie.id} />)
			arr.push(x)
		}		
		this.setState({ movieCard: arr, listLength: arr.length, handle1: false}, () =>{
			if (this.state.movieCard.length === 0) {return this.filterByName('');} 
		});
	} //end filterByName

	removeItem(movieId) {
    const { currentList } = this.state;
    // console.log(this.state.cache[currentList].data)
    // console.log('movieId: ', movieId)
let filterMovie = filter(this.state.cache[currentList].data, (o)=> {
	 // console.log('o.id: ', Number(o.id))
	 // console.log('o.movieId: ', o.movieId)
	// console.log('truthy', Number(o.id) !== Number(o.movieId) )
	return Number(o.id) !== Number(movieId)
});
// console.log('filterMovie: ',filterMovie)
var q = update(this.state.cache, {
   [currentList]:  {data: {$set: filterMovie } } })
// console.log('this.state.cache: ',this.state.cache)
// console.log(q)
    let arr = [], arrRatings = [];;
	for (let j=0; j<filterMovie.length; j++) {
		const movie = filterMovie[j];
		const { deleteMovie } = this.props;
		let x = (<MovieCard deleteMovie={deleteMovie} 
			movie={movie} removeItem={this.removeItem.bind(this)} key={movie.id} />)
			arr.push(x)
			arrRatings.push(this.state.cache[currentList].data[j].vote_average)			
		}		//get avg Ratings \\
		const avg = arrRatings.reduce((sum, value) => sum + value, 0)/arrRatings.length;
		let ratingAvg = avg.toFixed(1)		
		// console.log(arr)
		this.setState({ ratingAvg: ratingAvg, cache: q, movieCard: arr, listLength: arr.length});
	} // end removeItem

	rateMovie(modalPoster, id) {
		// console.log(e)
		this.setState({showModal: true, modalPoster: modalPoster, id: id})
	}

	render() {		
		// console.log(this.state)
		let y = 'https://image.tmdb.org/t/p/w92'		
		// console.log(this.state.movieCard)
		let r = (typeof this.state.currentList === 'undefined') ? (<div></div>) :
		 (<h1>average rating of list que:&nbsp;{this.state.ratingAvg}</h1>);
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

		{/*--------<<<<<MODAL>>>>>>>--------*/}
        <ReactModal 
           isOpen={this.state.showModal}
		   style={customStyles}
           contentLabel="Edit Rating"
           onRequestClose={this.handleCloseModal.bind(this)}
        >
    <Modal.Header><strong>Modal!!</strong></Modal.Header>                
    <Modal.Content image>
      <Image wrapped size='medium' src={y+this.state.modalPoster} />   

      <Rating size='massive' icon='star' onRate={this.handleRate}
       defaultRating={this.state.rating} maxRating={5} />

      <Modal.Description>
        <Header>Rate Movie</Header>
        <p>Choose a personal rating for this movie.</p>
        <p>If this movie is in another list, the rating applies to that
that list as well.</p>
      </Modal.Description>
    </Modal.Content>        
        <Button onClick={this.handleCloseModal.bind(this)}>Close Modal</Button>
        </ReactModal>		 	 
		{/*--------<<<<<MODAL>>>>>>>--------*/}

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


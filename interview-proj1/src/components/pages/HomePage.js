import React, {Component} from 'react';
import axios from 'axios';
import { Table, Image, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../scss/homepage.css';

import { addList } from '../../actions/actions';
import InlineError from '../messages/InlineError';

 const TableExampleCollapsing = (cache, props) => {//console.log('cache: ',cache.results) 	
 	let x = [], y = 'https://image.tmdb.org/t/p/w92';

 	 for (let i=0;i<20 && i<cache.total_results;i++) {
 		 x.push(
 		<Table.Body key={Date.now()+i}>
			<Table.Row onClick={() => {
				// console.log(cache.results[i])
				axios.post('/api/data', { movie: cache.results[i].title }).then(
					(response) => {
						console.log('response:',response)
						props.addList(cache.results[i])
					}
					).catch(err => console.log(err))		
		} }>
				<Table.Cell>
					<Header.Content>
					{cache.results[i].title}
						<Header.Subheader>{cache.results[i].release_date}</Header.Subheader>
					</Header.Content>
				</Table.Cell>
				<Table.Cell><Image src={y+`${cache.results[i].poster_path}`} shape='rounded' size='tiny' /></Table.Cell>
				<Table.Cell>{cache.results[i].vote_average}</Table.Cell>
			</Table.Row>
		</Table.Body>
 		);
 	}
 	// console.log(x)
	return ( 
	<Table striped basic='very' celled collapsing>
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Movie Name</Table.HeaderCell>
				<Table.HeaderCell>Image</Table.HeaderCell>
				<Table.HeaderCell>Average Rating</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		{x}
	</Table>
	)}

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			cache: undefined,
			movieTitles: undefined,
			searchIconDisplay: true,
			Table: undefined,
			results: 0,
			listName: undefined,
			loading: true,
			errors: {},
			update: false
		}
	this.onSubmit = this.onSubmit.bind(this);
	this.onChange = this.onChange.bind(this);
	this.inputMovieTitle = this.inputMovieTitle.bind(this);
	}
	componentDidUpdate(prevProps, prevState) {
	if(typeof this.state.movieTitles  === 'undefined'  ||
	   typeof this.state.Table  !== 'undefined') return;	
		 // console.log('update')
		// let movieTitles = this.state.movieTitles;
		// console.log(this.state.cache)
		 let Table = TableExampleCollapsing(this.state.cache, this.props);
		 this.setState({Table: Table, cache: undefined,
		  movieTitles: undefined, results: this.state.cache.total_results }//, ()=>console.log('Table: ',this.state.Table)
		 	)
	}	

	onChange(e) {
		// this.setState({ [e.target.name]: e.target.value });
		// this.setState({cache: undefined})
	}
	validate = data => {
		const errors = {};
		if (!data.movie) errors.movie = "Can't be blank";
		if (!data.listName) errors.listName = "Can't be blank";
		return errors;
	}	
	onSubmit = (e) => {	
		e.preventDefault();
		this.setState({searchIconDisplay: false})
		const { movie, listName } = this.refs;
		const data = {
			movie: movie.value.trim(),
			listName: listName.value.trim()
		}
		const errors = this.validate(data);
		this.setState({ errors });
		// if (Object.keys(errors).length > 0) {		
		if (false) {		
			return ;
		} else {
		axios({
			method: 'get',
			url: 'https://api.themoviedb.org/3/search/movie?api_key=19863b69e43adf58e326f33dad2b0ff1&query=' 
			+ data.movie,			
			responseType: 'json'
		}).then(res => 
		{
			 // console.log(res.data.results)
		let titles = [];
		let length = res.data.results.length;
		for (let i=0;i<length;i++) {
			titles.push(res.data.results[i].title)
		}			
		// this.setState({movieTitles: titles})
		this.setState({cache: res.data ,movieTitles: titles, Table: undefined, listName: data.listName}, 
			 ()=>console.log('cache:',this.state.cache)
			)
		}
		).catch(err => console.log(err));					
		}//end else
	}//end onSubmit
	inputMovieTitle = (e) => {
		this.setState({searchIconDisplay: false, loading: false})
		// return <input ref='movie' type='text' placeholder='Enter a movie title...' />		
	}	
	createList(e) {
		console.log(this.state.listName)
		const { listName } = this.state;
		axios.post('/api/lists', { listTitle: listName,data: this.props.listThis }).then(
					(response) => {
						console.log('response:',response)						
					}
					).catch(err => console.log(err))
	}
	render(){
		console.log(this.props.listThis)
		const { errors, loading } = this.state;
		// console.log(movieTitles);
		if (this.state.searchIconDisplay) {						
			var searchbox = <i className="huge search icon"></i>
		} else {
			searchbox = <input autoFocus id="searchbox" ref='movie' type='text' placeholder='Enter a movie title...' />
		}
		let z = this.props.listThis.map((item,i) => {
			return (<li key={Date.now()+i}>{item.title.toString()}</li>)
		})		
		// console.log('Table:', this.state.Table)
		return(<div>
		<form onChange={this.onChange} onSubmit={this.onSubmit}>
		   {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}
		   <div>
			<label>
			<strong>Search Movies:</strong>
			</label>
		 	<div className="searchDiv" onClick={() => this.inputMovieTitle('clicked')}>		 
		  	{searchbox}
		  </div>
		  {errors.movie && <InlineError text={errors.movie}/>}
		   </div>

		   <div className="createList">
			<label>
			<strong>List Name:</strong>
			</label><br/>		
		 	<input ref='listName' id="createList" placeholder="Enter a name for your list" />		 
		 	{errors.listName && <InlineError text={errors.listName}/>}<br/>
		 	<input className="ui primary button" type="button"
		 	 onClick={() => this.createList('clicked')} id="space" value="Create List"/>
		   </div>

		   <div>
		<Button disabled={loading} primary>Submit</Button>
		<span>{this.state.results} results</span>		
			</div>
		</form>	

		<h1>List</h1>

		<h1 className="ListName"><u>{this.state.listName}</u></h1>
		<ul className="ListDisplay">
			{z}
		</ul>

		{this.state.Table}
		
			</div>)
	}	
}

App.propTypes = {
	addList: PropTypes.func.isRequired,
	listThis: PropTypes.array.isRequired	
}

function mapStateToProps(state) {
	return {
			listThis: state.list
	}
}

export default connect(mapStateToProps, { addList })(App);


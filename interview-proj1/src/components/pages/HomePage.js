import React, {Component} from 'react';
import axios from 'axios';
import { Menu, Dropdown, Message, Table, Image, Header, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../scss/homepage.css';

import { addList, removeList, removeMovie } from '../../actions/actions';
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
						// console.log('response:',response)
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
			update: false,
			cache2: undefined,//current lists in db
			menu: null,
			currentList: undefined,
			activeItem: '1',
			total_pages: 1
		}
	this.onSubmit = this.onSubmit.bind(this);
	this.onChange = this.onChange.bind(this);
	this.inputMovieTitle = this.inputMovieTitle.bind(this);
	}
	componentDidMount() {
		axios.get('/api/lists').then(res =>{
			this.setState({cache2: res.data.data})
		}).catch(err => console.log(err))
	}	
	componentDidUpdate(prevProps, prevState) {		
/*<!-------MENU ----->*/
		if(typeof this.state.cache2   === 'undefined' /*||
	   this.state.menu  !== null */) return;	
	    // console.log('update');		
	   // console.log(this.state.cache2)
		let o = this.state.cache2.map((cache2,i)=>{ 
	 	return(
	 		{key: i, text: cache2.listTitle, value: i }
	 		)});
		if(this.state.menu  === null){
	 	this.setState({menu: o})			
		}
/*<!-------MENU ----->*/		  				
	if(typeof this.state.movieTitles  === 'undefined'  ||
	   typeof this.state.Table  !== 'undefined') return;	
		// console.log('update2')
		// let movieTitles = this.state.movieTitles;
		// console.log(this.state.cache)
		 let Table = TableExampleCollapsing(this.state.cache, this.props);
		 this.setState({Table: Table, cache: undefined,
		  movieTitles: undefined,
		  results: this.state.cache.total_results }
		  );//, ()=>console.log('Table: ',this.state.Table)
	}// end-ComponentDidUpdate()	

	onChange(e) {
		// this.setState({ [e.target.name]: e.target.value });
		// this.setState({cache: undefined})
	}
	validate = data => {
		const errors = {};
		if (!data.movie) errors.movie = "Can't be blank";
		// if (typeof this.state.listName === 'undefined') errors.listName = "Can't be blank";
		return errors;
	}	
	onSubmit = (e) => {	
		// console.log(e)
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
			+ data.movie +"&page="+this.state.activeItem,			
			responseType: 'json'
		}).then(res => 
		{
			 // console.log(res.data.total_pages)
		let titles = [];
		let length = res.data.results.length;
		for (let i=0;i<length;i++) {
			titles.push(res.data.results[i].title)
		}			
		// this.setState({movieTitles: titles})
		// Menu.classList.remove("invisible");
		this.setState({cache: res.data ,movieTitles: titles, Table: undefined,
		 listName: data.listName, total_pages: res.data.total_pages}, 
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
		/*if(this.refs.listName.value.length > 0) {

		}*/
		const { listName } = this.state;
		axios.post('/api/lists', { listTitle: listName,data: this.props.listThis }).then(
					(response) => {
			this.props.removeList();
			this.context.router.history.push('/MovieListPage')
					}
					).catch(err => 
					{
							console.log(this.refs.listName.value.length)
						if(this.refs.listName.value.length > 0){
					this.setState({errors: { global: "Click Submit, then Create List"}})
						} else if(this.refs.listName.value.length === 0) {
					 this.setState({errors: { global: "List name can't be blank!!!"}})													
						}
						else {
					 this.setState({errors: { global: "List name already taken!!!"}})													
						}
					}
					/*console.log(err.response.data.error.errors.listTitle.message)*/)
	}
	getData(i) {		
		// console.log(this.state.cache2[i]);
		const { cache2 } = this.state;
		const { addList, removeList } = this.props;
		removeList();
		// console.log('cache2:',cache2[i].listTitle)
		// console.log('cache2:',cache2[i].data.length)
		for(let j=0; j<cache2[i].data.length; j++) {
		addList(cache2[i].data[j]);
		}
		this.setState({currentList: i, listName: cache2[i].listTitle})
	}
	updateList(e) {
		// console.log(this.state.listName)
		if( typeof this.state.listName === 'undefined' ||
			typeof this.state.cache2[this.state.currentList] === 'undefined') return;
		const { listThis, removeList } = this.props;
		const { cache2, currentList } = this.state;
		let _id = cache2[currentList]._id;
		// console.log(_id)
		axios.put('/api/lists/update', { _id ,data: listThis}).then(response=> 
		{
			removeList();
			this.context.router.history.push('/MovieListPage')			
		}).catch(err=>console.log(err));
	}
	handleItemClick = (e, { name }) => {
		this.setState({activeItem: name.toString()},
			()=>this.onSubmit(e));//ignore warning
	}
	render(){
		// console.log(this.state.cache)
		const { total_pages, activeItem, errors, loading } = this.state;
		// console.log(movieTitles);
		if (this.state.searchIconDisplay) {						
			var searchbox = <i className="huge search icon"></i>
		} else {
			searchbox = <input autoFocus id="searchbox" ref='movie' type='text' placeholder='Enter a movie title...' />
		}
		let z = this.props.listThis.map((item,i) => {
			return (<li  style={{"listStyle": "none"}} onClick={(e)=> {
			// console.log(item)
			this.props.removeMovie(item.id);
			this.setState({loading: false})
			}} key={Date.now()+i}>
<i aria-hidden="true" className="window close icon"></i>			
			{item.title}</li>)//.toString()
		});		
		// console.log('Table:', this.state.Table)
		let arr9 = [];
		for(let k=1;k<=total_pages&&k<12;k++) {
			arr9.push(<Menu.Item key={Date.now()+k} name={k.toString()} 
				active={activeItem === k.toString()} onClick={this.handleItemClick} />)
		}
		let z2 = arr9.map((item,i)=> {
			return item;
		})
		return(<div>
		<form onChange={this.onChange} onSubmit={this.onSubmit}>
		{ errors.global && <Message negative> 
					<Message.Header>Something went wrong</Message.Header>
					<p>{errors.global}</p>
					</Message>}		
		   {/*!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>*/}
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
		 	<input disabled={loading} className="ui primary button" type="button"
		 	 onClick={() => this.createList()} id="space" value="Create List"/>
		   </div>

		   <div className="addToList">
		   <label>
		   <strong>Add to a list:</strong>
		   </label><br/>		   
	    <Dropdown selection id="addToList"
	    onChange={(e, { value }) => this.getData(value)}
	    options={this.state.menu} placeholder='Add movie(s) to a created list' /><br/>
	 	<input disabled={loading} className="ui primary button" type="button"
	 	 onClick={() => this.updateList('clicked')}
	 	 id="space" value="Update List"/>	    
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

		<div>
		{this.state.Table}
		<Menu 
		className={(typeof this.state.Table === 'undefined') ? "invisible" : ''}
		 id="borderlessMenu" borderless>
 		{z2}
		</Menu>		
		</div>
			</div>)
	}	
}

App.propTypes = {
	removeMovie: PropTypes.func.isRequired,
	removeList: PropTypes.func.isRequired,
	addList: PropTypes.func.isRequired,
	listThis: PropTypes.array.isRequired	
}

App.contextTypes = {
	router: PropTypes.object.isRequired
}

function mapStateToProps(state) {
	return {
			listThis: state.list
	}
}

export default connect(mapStateToProps, { addList, removeList, removeMovie })(App);


import React, {Component} from 'react';
import axios from 'axios';
import { Table, Image, Header, Button, Modal } from 'semantic-ui-react';
// import FaSearch from 'react-icons/lib/fa/search';
import '../../scss/homepage.css';

const ModalModalExample = () => (
  <Modal trigger={<Button>Show Modal</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content image>
      <Image wrapped size='medium' src='https://image.tmdb.org/t/p/w92/kBf3g9crrADGMc2AMAMlLBgSm2h.jpg' />
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>We've found the following gravatar image associated with your e-mail address.</p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
)

 const TableExampleCollapsing = (cache) => {//console.log('cache: ',cache.results) 	
 	let x = [], y = 'https://image.tmdb.org/t/p/w92';
 	 for (let i=0;i<20;i++) {
 		 x.push(
 		<Table.Body key={Date.now()+i}>
			<Table.Row onClick={() => {console.log(`${cache.results[i].title}`)
			return ModalModalExample()} }>
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
			errors: {},
			submitButton: false
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
		 let Table = TableExampleCollapsing(this.state.cache);
		 this.setState({Table: Table, cache: undefined,
		  movieTitles: undefined, results: this.state.cache.total_results }//, ()=>console.log('Table: ',this.state.Table)
		 	)
	}	

	onChange(e) {
		// this.setState({ [e.target.name]: e.target.value });
		// this.setState({cache: undefined})
	}
	validate = (data) => {
		const errors = {};
		if(!data.movie)	errors.movie = "Can't be blank";
		if(!data.listName)	errors.listName = "Can't be blank";
	}
	onSubmit(e) {	
		e.preventDefault();
		const { movie, listName } = this.refs;
		const data = {
			movie: movie.value.trim(),
			listName: listName.value.trim()
		}
		const errors = this.validate(data);
		this.setState({ errors });
		if(Object.keys(errors).length === 0) {
			this.setState({ submitButton: true});

		}
		axios({
			method: 'get',
			url: 'https://api.themoviedb.org/3/search/movie?api_key=19863b69e43adf58e326f33dad2b0ff1&query=' 
			+ data.movie,			
			responseType: 'json'
		}).then(res => 
		{
			 console.log(res.data.results)
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
	}//end onSubmit
	inputMovieTitle = (e) => {
		this.setState({searchIconDisplay: false})
		// return <input ref='movie' type='text' placeholder='Enter a movie title...' />		
	}	
	render(){
		// let movieTitles = this.state.movieTitles;
		// console.log(movieTitles);
		if (this.state.searchIconDisplay) {						
			var searchbox = <i className="huge search icon"></i>
		} else {
			searchbox = <input autoFocus id="searchbox" ref='movie' type='text' placeholder='Enter a movie title...' />
		}

		// console.log('Table:', this.state.Table)
		return(<div>
		<form onChange={this.onChange} onSubmit={this.onSubmit}>
		   
		   <div>
			<label>
			<strong>Search:</strong>
			</label>
		 	<div className="searchDiv" onClick={() => this.inputMovieTitle('clicked')}>		 
		  	{searchbox}
		  </div>
		  {errors.email && <InlineError text={errors.email} />}
		   </div>

		   <div className="createList">
			<label>
			<strong>List Name:</strong>
			</label><br/>
		 	<input ref='listName' id="createList" placeholder="Enter a name for your list" />		 
		   </div>

		   <div>
		<Button primary>Submit</Button>
		<span>{this.state.results} results</span>
			</div>
		</form>	

		<h1 >List</h1>

		<h1 className="ListName">{this.state.listName}</h1>
		<ul className="ListDisplay">
			<li>1</li>
			<li>2</li>
		</ul>

		{this.state.Table}
		
			</div>)
	}	
}

export default App;
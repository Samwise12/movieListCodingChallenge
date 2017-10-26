import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addList } from '../../actions/actions';
import HomePage from '../pages/HomePage';


class HomeContainer extends Component {
	render() {
		const { addList } = this.props;		
		return (
			<div>
				<HomePage addList={addList} />
			</div>
				)
	}
}

HomeContainer.propTypes = {
	addList: PropTypes.func.isRequired
}

export default connect(null, {addList})(HomeContainer);
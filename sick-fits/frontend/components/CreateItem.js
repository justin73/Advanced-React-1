import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';

class CreateItem extends Component {
	render() {
		return (
			<Form>
				<h2>Sell</h2>
			</Form>
		);
	}
}

export default CreateItem;

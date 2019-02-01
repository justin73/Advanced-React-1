import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
	query SINGLE_ITEM_QUERY($id: ID!) {
		item(where: { id: $id }) {
			id
			title
			description
			price
		}
	}
`;

const UPDATE_ITEM_MUTATION = gql`
	mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
		updateItem(id: $id, title: $title, description: $description, price: $price) {
			id
			title
			description
			price
		}
	}
`;

class UpdateItem extends Component {
	state = {};
	// here we defined the function using arrow function as an instance property
	// so inside this function we will have direct access to `this`, otherwise we have to use consturctor to bind the function with this
	handleChange = (e) => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		// use computed variable as properties { [var]: value }
		this.setState({ [name]: val });
	};
	updateItem = async (e, updateItemMutation) => {
		e.preventDefault();
		console.log('this.state ---> ', this.state);

		const res = await updateItemMutation({
			variables: {
				id: this.props.id,
				...this.state
			}
		});
	};

	render() {
		return (
			// first get item
			<Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
				{({ data, loading }) => {
					if (loading) return <p>loading ...</p>;
					if (!data.item) return <p>no item found for id {this.props.id}</p>;
					// then update it
					return (
						<Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
							{(updateItem, { loading, error }) => (
								<Form onSubmit={async (e) => this.updateItem(e, updateItem)}>
									<Error error={error} />
									<fieldset disabled={loading} aris-busy={loading.toString()}>
										<label htmlFor="file">
											Image
											<input
												type="file"
												id="file"
												name="file"
												placeholder="Upload an image"
												required
												onChange={this.uploadFile}
											/>
										</label>
										<label htmlFor="title">
											Title
											<input
												type="text"
												id="title"
												name="title"
												placeholder="Title"
												required
												onChange={this.handleChange}
												defaultValue={data.item.title}
											/>
										</label>
										<label htmlFor="price">
											Price
											<input
												type="number"
												id="price"
												name="price"
												placeholder="Price"
												required
												onChange={this.handleChange}
												defaultValue={data.item.price}
											/>
										</label>
										<label htmlFor="description">
											Description
											<input
												type="text"
												id="description"
												name="description"
												placeholder="Enter A Description"
												required
												onChange={this.handleChange}
												defaultValue={data.item.description}
											/>
										</label>
										<button type="submit">Sav{loading ? 'ing' : 'e'}</button>
									</fieldset>
								</Form>
							)}
						</Mutation>
					);
				}}
			</Query>
		);
	}
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };

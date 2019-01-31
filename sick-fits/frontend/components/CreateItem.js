import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';
const CREATE_ITEM_MUTATION = gql`
	mutation CREATE_ITEM_MUTATION(
		$title: String!
		$description: String!
		$price: Int!
		$image: String
		$largeImage: String
	) {
		createItem(title: $title, description: $description, price: $price, image: $image, largeImage: $largeImage) {
			id
		}
	}
`;

class CreateItem extends Component {
	state = {
		title: 'Cool Shoes',
		description: 'i love those shoes',
		image: 'dog.jpg',
		largeImage: 'large-dog.jpg',
		price: 0
	};
	// here we defined the function using arrow function as an instance property
	// so inside this function we will have direct access to `this`, otherwise we have to use consturctor to bind the function with this
	handleChange = (e) => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		// use computed variable as properties { [var]: value }
		this.setState({ [name]: val });
	};

	uploadFile = async (e) => {
		console.log('uploading files --->');

		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		// identify which preset target to upload to in cloudinary
		data.append('upload_preset', 'sickfits');

		const res = await fetch('https://api.cloudinary.com/v1_1/justin73/image/upload', {
			method: 'POST',
			body: data
		});

		const file = await res.json();
		console.log('file ---> ', file);
		this.setState({
			image: file.secure_url,
			largeImage: file.eager[0].secure_url
		});
	};

	render() {
		return (
			<Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
				{(createItem, { loading, error }) => (
					<Form
						onSubmit={async (e) => {
							//stop the form from submitting
							e.preventDefault();
							//call the mutation
							const res = await createItem();
							// change to the single item page
							Router.push({
								pathname: '/item',
								query: { id: res.data.createItem.id }
							});
						}}
					>
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
							{this.state.image && <img src={this.state.image} alt="Upload Preview" />}
							<label htmlFor="title">
								Title
								<input
									type="text"
									id="title"
									name="title"
									placeholder="Title"
									required
									onChange={this.handleChange}
									value={this.state.title}
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
									value={this.state.price}
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
									value={this.state.description}
								/>
							</label>
							<button type="submit">Submit</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };

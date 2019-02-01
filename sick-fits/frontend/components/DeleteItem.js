import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from './Items';

const DELETE_ITEM_MUTATION = gql`
	mutation DELETE_ITEM_MUTATION($id: ID!) {
		deleteItem(id: $id) {
			id
		}
	}
`;

class DeleteItem extends Component {
	// cache is from apollo client
	// payload the is response we get from the grapqhl server {data:{deleteItem:{id: xxx}}}
	update = (cache, payload) => {
		// manually update the cache on the client so it matches the server
		// 1. read the cache to get the item we want
		const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
		// 2. filter the deleted item out of the page
		data.items = data.items.filter((item) => item.id !== payload.data.deleteItem.id);
		// 3. refresh the cache
		cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
	};
	render() {
		return (
			<Mutation
				mutation={DELETE_ITEM_MUTATION}
				variables={{
					id: this.props.id
				}}
				// update will grant you access to the cache and the payload we got back from the deleted
				update={this.update}
			>
				{(deleteItem, { error }) => (
					<button
						onClick={() => {
							if (confirm('Are you sure you want to delete this item?')) {
								deleteItem();
							}
						}}
					>
						{this.props.children}
					</button>
				)}
			</Mutation>
		);
	}
}
export default DeleteItem;

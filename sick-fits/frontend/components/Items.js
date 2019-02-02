import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';
//read a query
const ALL_ITEMS_QUERY = gql`
	# we need to preset two variables, skip and first for the paginations, skip with default of 0 as start, first is binded with the perPage we redefined in the evn config
	query ALL_ITEMS_QUERY(skip: Int=0, $first: Int=${perPage}) {
		items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
			id
			title
			price
			description
			image
			largeImage
		}
	}
`;

const Center = styled.div`text-align: center;`;

const ItemsList = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 60px;
	max-width: ${(props) => props.theme.maxWidth};
`;

class Items extends Component {
	render() {
		return (
			<Center>
				<Pagination page={this.props.page}>
					<Query
						query={ALL_ITEMS_QUERY}
						// fetchPolycy = "network-only" // never using the cache
						variables={{
							skip: (this.props.page - 1) * perPage
						}}
					>
						{/* destructing payload into data , error and loading */}
						{({ data, error, loading }) => {
							if (loading) return <p>loading ...</p>;
							if (error) return <p>Error: {error.message}</p>;
							return (
								<ItemsList>{data.items.map((item) => <Item item={item} key={item.id} />)}</ItemsList>
							);
						}}
					</Query>
				</Pagination>
			</Center>
		);
	}
}
export default Items;
export { ALL_ITEMS_QUERY };

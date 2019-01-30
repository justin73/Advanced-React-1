import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';

//read a query
const ALL_ITEMS_QUERY = gql`
	query ALL_ITEMS_QUERY {
		items {
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
				{/* <Items /> */}
				<Query query={ALL_ITEMS_QUERY}>
					{/* destructing payload into data , error and loading */}
					{({ data, error, loading }) => {
						if (loading) return <p>loading ...</p>;
						if (error) return <p>Error: {error.message}</p>;
						return <ItemsList>{data.items.map((item) => <Item item={item} key={item.id} />)}</ItemsList>;
					}}
				</Query>
			</Center>
		);
	}
}
export default Items;
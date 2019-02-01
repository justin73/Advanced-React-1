import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';

const SingleIemStyles = styled.div`
	max-width: 1200px;
	margin: 2rem;
	box-shadow: ${(props) => props.theme.bs};
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	min-height: 800px;
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.details: {
		margin: 3rem;
		font-size: 2rem;
	}
`;

const SINGLE_ITEM_QUERY = gql`
	query SINGLE_ITEM_QUERY($id: ID!) {
		item(where: { id: $id }) {
			id
			title
			description
			largeImage
		}
	}
`;

export default class SingleItem extends Component {
	render() {
		return (
			<Query
				query={SINGLE_ITEM_QUERY}
				variables={{
					id: this.props.id
				}}
			>
				{({ loading, data, error }) => {
					if (loading) return <p>Loading ...</p>;
					if (error) return <Error error={error} />;
					if (!data.item) return <p>No item found for ID {this.props.id}</p>;
					const item = data.item;
					return (
						<SingleIemStyles>
							{/* using the Head here from the next js to overwrite the meta data, we could also use this for the favicon */}
							<Head>
								<title>Sick Fits | {item.title}</title>
							</Head>
							<img src={item.largeImage} alt={item.title} />
							<div className="details">
								<h2>Viewing {item.title}</h2>
								<p>{item.description}</p>
							</div>
						</SingleIemStyles>
					);
				}}
			</Query>
		);
	}
}

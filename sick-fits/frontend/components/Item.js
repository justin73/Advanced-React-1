import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Title from './styles/Title';
import ItemStyles from './styles/ItemStyles';
import PriceTag from './styles/PriceTag';

class item extends Component {
	render() {
		const { item } = this.props;
		return (
			<ItemStyles>
				{item.image && <img src={item.image} alt={item.title} />}
				<Title>
					<Link
						href={{
							pathname: 'item',
							query: { id: item.id }
						}}
					>
						{item.title}
					</Link>
				</Title>

				<PriceTag>{formatMoney(item.price)}</PriceTag>
				<p>{item.description}</p>
				<div className="buttonList">
					<Link
						href={{
							pathname: 'update',
							query: { id: item.id }
						}}
					>
						<a>Edit </a>
					</Link>
					<button> Add to Cart</button>
					<button>Delete</button>
				</div>
			</ItemStyles>
		);
	}
}

item.propTypes = {
	item: PropTypes.object.isRequired
	// item: PropTypes.shape({
	//   title: PropTypes.string.isRequired,
	//   price: PropTypes.number.isRequired
	// })
};

export default item;

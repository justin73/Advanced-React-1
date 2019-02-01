// import React from 'react'; //  this could be removed since Next.js will take care of this
import SingleItem from '../components/SingleItem';
const Item = (props) => (
	<div>
		<SingleItem id={props.query.id} />
	</div>
);

export default Item;

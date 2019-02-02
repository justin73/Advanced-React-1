import Items from '../components/Items';

// import React from 'react'; //  this could be removed since Next.js will take care of this

const Home = (props) => (
	<div>
		<Items page={parseFloat(props.query.page) || 1} />
	</div>
);

export default Home;

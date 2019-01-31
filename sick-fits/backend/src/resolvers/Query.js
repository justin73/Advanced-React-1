// in the query we need to have functions align with every single query in the schema.graphql
const { forwardTo } = require('prisma-binding');

const Query = {
	//each time when a req comes in, there are 4 types of params namely parent, args, context and info
	// context includes what we defined in the creatserver file, such as request headers, cookies, db,etc.

	// use forwardTo to directly use db(prisma.graphql) to handle your request and get the value back
	// which means you dont need any data check or mutate, this is a fastforward way to quick get the data
	items: forwardTo('db'),
	// async items(parent, args, ctx, info) {
	// 	const items = await ctx.db.query.items();
	// 	return items;
	// }
	item: forwardTo('db')
};

module.exports = Query;

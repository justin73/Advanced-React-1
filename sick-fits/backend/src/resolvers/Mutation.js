// every time when you put a mutation here, it has to match with the schema, otherwise, it throws error
const Mutations = {
	async createItem(parent, args, ctx, info) {
		// TODO: check if they are logged in

		//  ctx.db.mutation.function returns a promise
		// ctx.db refers to the prisma.graphql, since we want to add an item, so we need to use the function inside the Mutation
		// and inside the `type Mutation` we can see the correct function we want to use is `createItem`
		const item = await ctx.db.mutation.createItem(
			{
				data: { ...args }
			},
			info
		);

		return item;
	},

	updateItem(parent, args, ctx, info) {
		const updates = { ...args };
		delete updates.id;
		//run the udpate method
		return ctx.db.mutation.updateItem(
			{
				data: updates,
				where: {
					id: args.id
				}
			},
			info
		);
	}
};

module.exports = Mutations;

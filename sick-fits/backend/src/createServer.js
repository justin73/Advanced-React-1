// This is where we import the graphQL server
const { GraphQLServer } = require('graphql-yoga');

const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');

// create the GraphQL Yoga Server

// the reason why we need typeDefs here is that in the db.js, the typeDefs is defined for the prisma server
// but here for the graphql server, we also need to define its own schema
// and that is why we create a separate schema named schema.graphql

// schema.graphql cannot be empty since it requires resolvers of Mutation and Query
function createServer() {
	return new GraphQLServer({
		typeDefs: 'src/schema.graphql',
		resolvers: {
			Mutation,
			Query
		},
		resolverValidationOptions: {
			requireResolversForResolveType: false
		},
		context: (req) => ({ ...req, db })
	});
}

module.exports = createServer;

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { Router } from 'express'
import { makeExecutableSchema } from 'graphql-tools'

import resolvers from '../graph/resolvers'
import typeDefs from '../graph/typeDefs'


const schema = makeExecutableSchema({
	typeDefs,
	resolvers
})


const graphqlRouter = graphqlExpress(req => ({
	schema,
	context: {
		db: req.app.get('db')
	}
}))


const graphiqlRouter = graphiqlExpress({
	endpointURL: '/graphql'
})


export default Router()
	.get('/graphql', graphiqlRouter)
	.use('/graphql', graphqlRouter)

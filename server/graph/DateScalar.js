import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'


export default new GraphQLScalarType({
	name: 'Date',
	description: 'Date scalar',

	parseValue(value) {
		return parseInt(value) // value from the client
	},

	serialize(value) {
		return parseInt(value) // value sent to the client
	},

	parseLiteral(ast) {
		if (ast.kind === Kind.INT) {
			return parseInt(ast.value, 10) // ast value is always in string format
		}
		return null
	}
})

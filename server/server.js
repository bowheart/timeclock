import bodyParser from 'body-parser'
import db from 'diskdb'
import express from 'express'
import { resolve } from 'path'

import graphqlRouter from './routers/graphql'
import pageRouter from './routers/page'

import utilsMiddleware from './middleware/utils'
import webpackMiddleware from './middleware/webpack'


const app = express()
const PORT = process.env.PORT || 3000


// We're using diskdb as a light-weight, insecure alternative to mongo.
// Just for fun.
// This assumes /var/www/db is a folder on this server.
db.connect('/var/www/db', ['entries', 'tasks'])


app.set('db', db)
app.set('view engine', 'ejs')
app.set('views', resolve('assets', 'html'))


// Send to static router first
app.use(express.static(resolve('assets', 'js')))
app.use(express.static(resolve('assets', 'css')))

// Next defer to graphQL
app.use(bodyParser.json())
app.use(graphqlRouter)

// Next stick our custom middleware in front of our custom endpoints
app.use('*', utilsMiddleware)
app.use(webpackMiddleware)

// Lastly, hit up our custom endpoints.
app.use(pageRouter)


app.listen(PORT, () => {
	console.log('server running at http://localhost:' + PORT)
})

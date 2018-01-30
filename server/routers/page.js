import { Router } from 'express'
import { parse } from 'path'


export default Router()
	.get('/*', (req, res) => {
		let parsedPath = parse(req.originalUrl)

		if (parsedPath.ext) return res.sendStatus(404)

		res.render('home')
	})

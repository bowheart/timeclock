import { parse } from 'path'


export default (req, res, next) => {
	req.parsedUrl = parse(req.originalUrl)

	res.error = (message, status = 400) =>
		res.status(status).send(message)

	next()
}

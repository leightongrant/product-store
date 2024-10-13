const errorHandler = (err, req, res, next) => {
	if (err.status) {
		res.status(err.status).json({ message: err.message })
	}
	res.status(500).json({ message: err.message })
}

/**
 * Takes a status code, a message and the error object
 * to customize error messages
 *
 * @param {number} status - Custom Status
 * @param {string} message - Custom Message
 * @param {object} err - Error object
 * @returns {object}
 */
export const errorMessage = (status, message, err) => {
	err.message = message
	err.status = status
	return err
}

export const routeNotFound = (req, res, next) => {
	return next(
		errorMessage(404, 'The route you are looking for is not found', {})
	)
}

export default errorHandler

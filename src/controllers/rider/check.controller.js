import Rider from '../../schemas/rider.schema.js';

/**
 * Check if the user is a rider
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @returns if is authorized next, else status and message
 */
const authorizationController = async (req, res, next) => {
	const { id, email } = req;

	const existingRider = await Rider.findOne({
		where: { id: id, email: email },
	});
	if (!existingRider)
		return res.status(401).send({ errors: ['Usuario no autorizado'] });

	next();
};

export default authorizationController;

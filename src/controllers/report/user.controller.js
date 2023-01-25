import sequelize from '../../config/db.js';
import Bidder from '../../schemas/bidder.schema.js';
import Rider from '../../schemas/rider.schema.js';

/**
 * send the most frequent birthDays from bidder
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
export const birthBidderDayController = async (req, res) => {
	try {
		const data = await Bidder.findAll({
			attributes: [
				'birthDate',
				[sequelize.fn('COUNT', sequelize.col('birthDate')), 'count'],
			],
			group: 'birthDate',
			limit: 10,
			order: [['count', 'DESC']],
		});
		if (data.length === 0) return res.status(404).json(data);
		return res.status(200).json(data);
	} catch (error) {
		return res.status(500);
	}
};
/**
 * send the most frequent birthDays from rider
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
export const birthRiderDayController = async (req, res) => {
	try {
		const data = await Rider.findAll({
			attributes: [
				'birthDate',
				[sequelize.fn('COUNT', sequelize.col('birthDate')), 'count'],
			],
			group: 'birthDate',
			limit: 10,
			order: ['count', 'DESC'],
		});
		if (data.length === 0) return res.status(404).json(data);
		return res.status(200).json(data);
	} catch (error) {
		return res.status(500);
	}
};

const amountTripBidderController = async (req, res) => {};

const amountTripRiderController = async (req, res) => {};

/**
 * send the number of actives and inactive bidders
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
export const activeBidderController = async (req, res) => {
	try {
		const total = await Bidder.count();
		if (total === 0) return res.status(404).send({ errors: ['Sin datos'] });

		const active = await Bidder.count({ where: { active: true } });
		const noActive = total - active;

		const data = { active, noActive };
		return res.status(200).json(data);
	} catch (error) {
		return res.status(500);
	}
};

/**
 * send the number of actives and inactive riders
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
export const activeRiderController = async (req, res) => {
	try {
		const total = await Rider.count();
		if (total === 0) return res.status(404).send({ errors: ['Sin datos'] });

		const active = await Rider.count({ where: { active: true } });
		const noActive = total - active;

		const data = { active, noActive };
		return res.status(200).json(data);
	} catch (error) {
		return res.status(500);
	}
};

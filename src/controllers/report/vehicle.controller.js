import sequelize from '../../config/db.js';
import Vehicle from '../../schemas/vehicle.schema.js';
import { formatActiveReport } from '../../utils/arrayMethods.js';

const limit = 5;

/**
 *send the most frequent vehicle
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
export const frequentVehicleController = async (req, res) => {
	try {
		const data = await Vehicle.findAll({
			attributes: ['id', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
			group: ['id'],
			limit: limit,
			order: [['count', 'DESC']],
		});
		if (data.length === 0) return res.status(404).json(data);
		return res.status(200).json(data);
	} catch (error) {
		return res.status(500);
	}
};

/**
 *send number of active and inactive vehicles
 * @param {Object} req
 * @param {Object} res
 * @returns
 */
export const activeVehicleController = async (req, res) => {
	try {
		const total = await Vehicle.count();
		if (total === 0) return res.status(404).send({ errors: ['Sin datos'] });

		const active = await Vehicle.count({ where: { active: true } });
		const noActive = total - active;

		const data = formatActiveReport(active, noActive);
		return res.status(200).json(data);
	} catch (error) {
		return res.status(500);
	}
};

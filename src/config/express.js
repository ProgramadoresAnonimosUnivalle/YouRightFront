import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import Admin from '../schemas/admin.schema.js';
import adminRouter from '../routes/admin.routes.js';
import bidderRouter from '../routes/bidder.routes.js';
import riderRouter from '../routes/rider.routes.js';

const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//routes
app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/testAdmin', (req, res) => {
	Admin.create({
		email: 'test@correounivalle.edu.co',
		password: 'Unaclavesecreta1',
	}).then(admin => {
		admin
			.validPassword('Unaclavesecreta1', admin.password)
			.then(value => res.json(value));
	});
});

app.use('/admin', adminRouter);
app.use('/bidder', bidderRouter);
app.use('/rider', riderRouter);

export default app;

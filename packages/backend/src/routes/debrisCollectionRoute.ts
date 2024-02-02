// routes/battleReportsRoute.ts
import { Router } from 'express';
import getDebrisCollectionReports from '../controllers/getDebrisCollectionReports';

const router = Router();

// Define the route for fetching battle reports for a specific planet
// The `planet_id` will be provided as a query parameter
router.get('/', getDebrisCollectionReports);

export default router;

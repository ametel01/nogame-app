// routes/debrisCollectionRoute.ts
import { Router, Request, Response } from 'express';
import getDebrisCollectionReports from '../controllers/getDebrisCollectionReports';

const router = Router();

// Define the route for fetching debris collection reports for a specific planet
// The `planet_id` will be provided as a query parameter
router.get('/', async function(req: Request, res: Response) {
  await getDebrisCollectionReports(req, res);
});

export default router;

// backend/src/controllers/getBattleReports.ts
import { Request, Response } from 'express';
import fetchDebrisCollectionForPlanet from '../services/fetchDebrisCollectionsForPlanet';

export const getDebrisCollectionReports = async (
  req: Request,
  res: Response
) => {
  // Extract planet_id from request query parameters
  const planetId = parseInt(req.query.planet_id as string);

  // Check if planetId is a number
  if (isNaN(planetId)) {
    return res.status(400).json({ error: 'Invalid planet_id provided' });
  }

  try {
    const data = await fetchDebrisCollectionForPlanet(planetId);
    res.json(data);
  } catch (error) {
    console.error('Error fetching debris reports:', error);

    // Check if error is an instance of Error
    if (error instanceof Error) {
      // Now TypeScript knows that error is an Error, and has a message property
      res
        .status(500)
        .json({ error: 'Internal server error', message: error.message });
    } else {
      // If it's not an Error, handle it differently or just send a generic response
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

export default getDebrisCollectionReports;

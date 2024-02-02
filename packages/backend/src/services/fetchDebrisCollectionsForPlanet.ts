import pool from '../config/db'; // Ensure you have the correct path to your db config

export const fetchDebrisCollectionForPlanet = async (planetId: number) => {
  try {
    // Assuming you have a stored procedure or a direct SQL query equivalent to 'get_battle_reports_for_planet'
    const queryText = 'SELECT * FROM get_debris_collection_for_planet($1);'; // or a SELECT query if it's not a procedure
    const values = [planetId];

    const { rows } = await pool.query(queryText, values);
    return rows;
  } catch (error) {
    console.error('Error fetching debris collection reports:', error);
    return null;
  }
};

export default fetchDebrisCollectionForPlanet;

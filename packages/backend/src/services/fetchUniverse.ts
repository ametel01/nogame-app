import pool from '../config/db';

export const fetchUniverse = async () => {
  try {
    // Assuming you have a stored procedure or a direct SQL query equivalent to 'fetch_fleet_leaderboard'
    const queryText = 'SELECT * FROM get_universe();'; // or a SELECT query if it's not a procedure

    const { rows } = await pool.query(queryText);
    return rows;
  } catch (error) {
    console.error('Error fetching universe:', error);
    throw error;
  }
};

export default fetchUniverse;

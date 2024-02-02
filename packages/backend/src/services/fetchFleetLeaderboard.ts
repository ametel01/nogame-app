import pool from '../config/db'; // Ensure you have the correct path to your db config

export const fetchFleetLeaderboard = async () => {
  try {
    // Assuming you have a stored procedure or a direct SQL query equivalent to 'fetch_fleet_leaderboard'
    const queryText = 'SELECT * FROM fetch_fleet_leaderboard();'; // or a SELECT query if it's not a procedure

    const { rows } = await pool.query(queryText);
    return rows;
  } catch (error) {
    console.error('Error fetching fleet leaderboard:', error);
    throw error;
  }
};

export default fetchFleetLeaderboard;

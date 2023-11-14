import supabase from "../config/supabaseClient";

export const fetchFleetLeaderboard = async () => {
  const { data, error } = await supabase.rpc("fetch_fleet_leaderboard");

  if (error) {
    console.error("Error fetching fleet leaderboard:", error);
    throw error;
  }

  return data;
};

export default fetchFleetLeaderboard;

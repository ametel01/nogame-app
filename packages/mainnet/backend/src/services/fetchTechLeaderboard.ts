import supabase from "../config/supabaseClient";

export const fetchTechLeaderboard = async () => {
  const { data, error } = await supabase.rpc("fetch_tech_leaderboard");

  if (error) {
    console.error("Error fetching fleet leaderboard:", error);
    throw error;
  }

  return data;
};

export default fetchTechLeaderboard;

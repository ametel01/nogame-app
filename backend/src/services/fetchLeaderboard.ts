import supabase from "../config/supabaseClient";

export const fetchLeaderBoard = async () => {
  const { data, error } = await supabase.rpc("fetch_leaderboard"); // This is the name of your stored procedure

  if (error) {
    console.error("Error fetching leaderboard:", error);
    throw error;
  }

  return data;
};

export default fetchLeaderBoard;

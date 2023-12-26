import supabase from "../config/supabaseClient";

export const fetchUniverse = async () => {
  const { data, error } = await supabase.rpc("get_universe"); // This is the name of your stored procedure

  if (error) {
    console.error("Error fetching universe:", error);
    throw error;
  }

  return data;
};

export default fetchUniverse;

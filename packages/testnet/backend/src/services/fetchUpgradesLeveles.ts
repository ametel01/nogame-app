import supabase from "../config/supabaseClient";

export const fetchUpgradesLevels = async (planetId: number) => {
  const { data, error } = await supabase.rpc("get_upgrade_levels", {
    planet_id_param: planetId,
  });

  if (error) {
    console.error("Error fetching upgrades levels:", error);
    throw error;
  }

  return data;
};

export default fetchUpgradesLevels;

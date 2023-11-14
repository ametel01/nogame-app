import supabase from "../config/supabaseClient";

export const fetchBattleReportsForPlanet = async (planetId: number) => {
  const { data, error } = await supabase.rpc("get_battle_reports_for_planet", {
    planet_id_param: planetId,
  });

  if (error) {
    console.error("Error fetching battle reports:", error);
    return null;
  }

  if (data && data.length === 0) {
    console.log("No battle reports found for planet_id:", planetId);
    return [];
  }

  return data;
};

export default fetchBattleReportsForPlanet;

import supabase from "../config/supabaseClient";

type BattleReport = {
  battle_id: number;
  time: Date;
  attacker: string;
  defender: string;
};

export const fetchBattleReportsForPlanet = async (planetId: number) => {
  const { data, error } = await supabase.rpc("get_battle_reports_for_planet", {
    planet_id_param: planetId,
  });

  if (error) {
    console.error("Error fetching battle reports:", error);
    return null;
  }

  return data;
};

export default fetchBattleReportsForPlanet;

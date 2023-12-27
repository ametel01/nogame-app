import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Check the NODE_ENV and load the corresponding .env file
const envFile = process.env.NODE_ENV === "production" ? ".env" : ".env.local";
console.log(process.env.NODE_ENV);

dotenv.config({ path: envFile });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials in .env");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

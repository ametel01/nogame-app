// backend/src/config/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: '/var/www/no-game.xyz/nogame-app/packages/backend/.env' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials in .env");
}

// Create a single instance of the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

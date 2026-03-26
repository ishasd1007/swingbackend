import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://aikxifnothhlcqizgyjy.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || "sb_publishable_32yfVS-ZdyzliBlPaMF67Q_UYhr7Le1"

export const supabase = createClient(supabaseUrl, supabaseKey)
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://aikxifnothhlcqizgyjy.supabase.co"
const supabaseKey = "sb_publishable_32yfVS-ZdyzliBlPaMF67Q_UYhr7Le1"

export const supabase = createClient(supabaseUrl, supabaseKey)
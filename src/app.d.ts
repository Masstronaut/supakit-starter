// See https://kit.svelte.dev/docs/types#app
import type { Session, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '$lib/types/supabase';

declare global {
	declare namespace App {
		interface Supabase {
			Database: Database;
			SchemaName: 'public';
		}
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession: () => Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}

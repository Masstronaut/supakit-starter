// See https://kit.svelte.dev/docs/types#app
import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit/dist/types';
import type { Session } from '@supabase/supabase-js';
declare global {
	declare namespace App {
		// interface Error {}
		interface Locals {
			sb: TypedSupabaseClient;
			session: Session | null;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Platform {}
	}
}

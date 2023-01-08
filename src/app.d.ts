// See https://kit.svelte.dev/docs/types#app
import type { TypedSupabaseClient } from '@supabase/auth-helpers-sveltekit/dist/types';
import type { Session } from '@supabase/supabase-js';
import type { User } from '@prisma/client';
import type { Database } from './types/supabase';
declare global {
	declare namespace App {
		interface Supabase {
			Database: Database;
			SchemaName: 'public';
		}
		interface Locals {
			sb: TypedSupabaseClient;
			session: Session | null;
			user: User | null;
		}
		interface PageData {
			session: Session | null;
		}
		// interface Error {}
		// interface Platform {}
	}
}

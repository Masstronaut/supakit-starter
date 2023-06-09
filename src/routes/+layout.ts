// src/routes/+layout.ts
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { LayoutLoad } from './$types';
import type { Database } from '$lib/types/supabase';

// @@TODO: continue following supabase docs from here:
// https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#shared-load-functions-and-pages

/**
 * Access the client inside pages using `$page.data.supabase`
 * or data.supabase when using `export let data: PageData`.
 */
export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	// tells sveltekit that this load function should be executed
	// whenever invalidate is called to keep the page store in sync
	depends('supabase:auth');

	// The client is cached in the browser per supabase docs:
	// https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#shared-load-functions-and-pages
	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session, user: data.user };
};

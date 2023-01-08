import { supabase } from '$lib/supabase';
import { error as svelteError } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	createAvatarsBucket: async ({ locals }) => {
		if (!locals.session) {
			throw svelteError(403, 'Must be signed in to perform admin functions');
		}
		if (locals.session?.user.role !== 'admin') {
			throw svelteError(403, 'Must be an admin to perform admin functions');
		}

		supabase.storage.createBucket('avatars', { public: true });
		const { data, error } = await supabase.storage.createBucket('avatars', { public: true });
	}
};

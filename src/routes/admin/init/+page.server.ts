import { error as svelteError } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	createAvatarsBucket: async ({ locals }) => {
		const session = await locals.getSession();

		if (!session) {
			throw svelteError(403, 'Must be signed in to perform admin functions');
		}
		if (session?.user.role !== 'admin') {
			throw svelteError(403, 'Must be an admin to perform admin functions');
		}

		locals.supabase.storage.createBucket('avatars', { public: true });
		const { data, error } = await locals.supabase.storage.createBucket('avatars', { public: true });
	}
};

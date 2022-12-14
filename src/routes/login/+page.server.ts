import { error, redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.session !== null) {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	login: async ({ locals, request }) => {
		const formData = Object.fromEntries(await request.formData());
		const email = formData.email as string;
		try {
			await locals.sb.auth.signInWithOtp({ email });
		} catch (e) {
			console.log('Error: ', e);
			throw error(e.status, e.message);
		}
		return {
			success: true
		};
	}
};

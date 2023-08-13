import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();
	if (session !== null) {
		throw redirect(303, '/');
	}
};

export const actions: Actions = {
	login: async ({ locals: { supabase }, request, url }) => {
		const formData = await request.formData();
		const formEmail = formData.get('email') as string;
		const email = z.string().email().safeParse(formEmail);
		if (!email.success) {
			return {
				success: false,
				message: 'Invalid email address',
				email: formEmail
			};
		}
		const signInResult = await supabase.auth.signInWithOtp({
			email: email.data,
			options: {
				emailRedirectTo: `${url.origin}/auth/callback`
			}
		});
		if (signInResult.error) {
			console.log('AuthError: ', signInResult.error.message);
			return {
				success: false,
				message: signInResult.error.message,
				email
			};
		}
		return {
			success: true,
			email
		};
	}
};

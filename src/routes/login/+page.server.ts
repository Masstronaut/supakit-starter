import { redirect } from '@sveltejs/kit';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';

export const load: PageServerLoad = async ({ locals, parent }) => {
	const { session } = await parent();
	if (session !== null) {
		throw redirect(303, '/');
	}
};

const getURL = () => {
	let url: string = env?.VERCEL_URL ?? 'http://localhost:5173';
	url = url.startsWith('http') ? url : `https://${url}`;
	url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
	return url;
};

export const actions: Actions = {
	login: async ({ locals, request, fetch }) => {
		const formData = Object.fromEntries(await request.formData());
		const email = formData.email as string;
		const signInResult = await locals.supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: getURL()
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

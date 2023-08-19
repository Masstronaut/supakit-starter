import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';
import { validateUserAccountInfo } from '$lib/schemas/account';
import { createUser } from '$lib/server/createUser';

export const load = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) throw redirect(302, '/'); // redirect to home if user is already logged in
	return { session };
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();

		const parsedAccount = validateUserAccountInfo({
			email: formData.get('email') as string,
			password: formData.get('password') as string
		});
		if (!parsedAccount.success) {
			return {
				success: false,
				errors: parsedAccount.errors,
				message: 'Invalid email or password.'
			};
		}
		const { email, password } = parsedAccount;
		const result = await createUser({ email, password });
		if (!result.success) {
			return fail(500, {
				success: false,
				errors: {
					email: null,
					password: null
				},
				message: 'An unknown error occurred'
			});
		}
		const { user, team } = result;
		const session = await auth.createSession({
			userId: user.id,
			attributes: {}
		});
		locals.auth.setSession(session); // set session cookie

		// redirect to
		// make sure you don't throw inside a try/catch block!
		return {
			success: true,
			message: 'Account created successfully.'
		};
	}
} satisfies Actions;

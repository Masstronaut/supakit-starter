import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import type { Actions } from './$types';
import { validateUserAccountInfo } from '$lib/schemas/account';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();

		const parsedAccount = validateUserAccountInfo({
			email: formData.get('email') as string,
			password: formData.get('password') as string
		});
		if (!parsedAccount.success) {
			const hasEmailErrors =
				parsedAccount.errors.email && parsedAccount.errors.email.length > 0;
			const hasPasswordErrors =
				parsedAccount.errors.password &&
				parsedAccount.errors.password.length > 0;

			return {
				success: false,
				errors: parsedAccount.errors,
				message: `The ${hasEmailErrors && 'email '}${
					hasEmailErrors && hasPasswordErrors && 'and '
				}${hasPasswordErrors && 'password'} you provided are not valid.`
			};
		}
		try {
			const { email, password } = parsedAccount;
			const user = await auth.useKey('email', email.toLowerCase(), password);
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session); // set session cookie
		} catch (e) {
			if (e instanceof LuciaError) {
				if (
					e.message === 'AUTH_INVALID_KEY_ID' ||
					e.message === 'AUTH_INVALID_PASSWORD'
				) {
					// user doesn't exist or password is wrong.
					// Avoid leaking existing user emails by providing the same error message for both cases.
					return fail(400, {
						message:
							'The email and password combination you provided does not match any existing accounts.'
					});
				}
				// some other issue
				return fail(500, { message: 'Something went wrong.' });
			}
		}
		throw redirect(302, '/'); // redirect to home
	} // default
};

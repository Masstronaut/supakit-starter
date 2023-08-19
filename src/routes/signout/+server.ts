import { fail, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { auth } from '$lib/server/lucia';

export const POST = (async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw fail(401);
	await auth.invalidateSession(session.sessionId);
	locals.auth.setSession(null);
	throw redirect(302, '/');
}) satisfies RequestHandler;

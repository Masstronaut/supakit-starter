import '$lib/supabase';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { redirect, type Handle } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import type { User } from '@prisma/client';
import type { Session } from '@supabase/supabase-js';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

let user: User | null = null;

export const handle: Handle = async ({ event, resolve }) => {
	const { session, supabaseClient } = await getSupabase(event);

	event.locals.sb = supabaseClient;
	event.locals.session = session;

	if (session && !user) {
		user = await getUser(session);
	} else if (session && user && user.id !== session.user.id) {
		user = await getUser(session);
	}
	event.locals.user = user;

	if (event.url.pathname.startsWith('/settings') && !session) {
		throw redirect(303, '/login');
	} else if (event.url.pathname.startsWith('/admin')) {
		if (!session) {
			throw redirect(303, '/login');
		} else if (user && user.role !== 'admin') {
			throw redirect(303, '/');
		}
	}

	const response = resolve(event);

	return response;
};

async function getUser(session: Session): Promise<User | null> {
	if (!session) return null;
	try {
		const user = await prisma.user.findUniqueOrThrow({
			where: {
				id: session.user.id
			}
		});
		return user;
	} catch (e) {
		if (!(e instanceof PrismaClientKnownRequestError)) {
			console.error("An unexpected error occurred while trying to get the user's data", e);
			return null;
		}
		const error = e as PrismaClientKnownRequestError;
		// the user hasn't been added to the User table yet

		const { randomBytes } = await import('node:crypto');
		const id = randomBytes(4).toString('hex');
		const user: User = await prisma.user.create({
			data: {
				id: session.user.id,
				username: `${session.user.email!.split('@')[0]}${id}`,
				photo: `https://ui-avatars.com/api/?name=${session.user.email!.split('@')[0]}`,
				createdAt: new Date(Date.now())
			}
		});
		return user;
	}
}

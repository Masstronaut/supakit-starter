import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';
import { Prisma } from '@prisma/client';
import type { User } from '@prisma/client';
import type { Session } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	/**
	 * a little helper that is written for convenience so that instead
	 * of calling `const { data: { session } } = await supabase.auth.getSession()`
	 * you just call this `await getSession()`
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session as Session;
	};
	if (!event.locals.user) {
		event.locals.user = await getUser(await event.locals.getSession());
		console.log('getting the user from hooks.server.ts');
	} else {
		console.log('User was already cached in locals');
	}
	return resolve(event, {
		/**
		 * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
		 *
		 * https://github.com/sveltejs/kit/issues/8061
		 */
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
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
		if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
			console.error("An unexpected error occurred while trying to get the user's data", e);
			return null;
		}
		const error = e as Prisma.PrismaClientKnownRequestError;
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

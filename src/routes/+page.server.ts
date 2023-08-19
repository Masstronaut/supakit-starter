import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';
import { prisma } from '$lib/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/signin');
	const user = await prisma.user.findUnique({
		where: { id: session.user.id },
		include: { teams: true }
	});

	return {
		session,
		user
	};
};

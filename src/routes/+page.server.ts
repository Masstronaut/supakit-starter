import type { PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { supabase } from '$lib/supabase';

const prisma = new PrismaClient();

const createUserProfileEntry = async (userID: string | undefined, email: string | undefined) => {
	console.log('Creating user profile entry for: ', userID, email);
	if (userID === undefined) return;
	if (email === undefined) return;
	try {
		prisma.profile.findFirstOrThrow({
			where: {
				id: {
					equals: userID
				}
			}
		});
	} catch (e) {
		console.log("User didn't have a Profile entry. Creating one now...");
		if (e instanceof PrismaClientKnownRequestError) {
			const { randomBytes } = await import('node:crypto');
			const id = randomBytes(4).toString('hex');

			const writeUpdate = async () => {
				prisma.profile.create({
					data: {
						id: userID,
						username: `${email.slice(0, 6)}${id}`
					}
				});
			};

			writeUpdate()
				.then(async (e) => {
					console.log('Profile entry created');
					prisma.$disconnect();
				})
				.catch(async (e) => {
					console.log('critical error occurred in prisma');
					console.error(e);
					await prisma.$disconnect();
					process.exit(1);
				});
		} else {
			console.log('unexpected error occurred. Pls debug');
		}
	}
};

export const load: PageServerLoad = async (event) => {
	console.log("page '/' loaded");
	const { session, supabaseClient } = await getSupabase(event);
	if (!session) {
		console.log("ain't got no session chief");
		return;
	}
	console.log({ session });
	supabaseClient.auth.onAuthStateChange((event, session) => {
		console.log('An auth state change event occurred: ', event);
		if (event === 'SIGNED_IN') {
			console.log('Signed in: ', session?.user.email);
			createUserProfileEntry(session?.user.id, session?.user.email);
		}
	});
};

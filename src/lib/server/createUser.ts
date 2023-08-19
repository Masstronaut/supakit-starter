import { prisma } from '$lib/prisma';
import { generateLuciaPasswordHash, generateRandomString } from 'lucia/utils';
import { createKeyId } from 'lucia';
import { Prisma, type Team, type User } from '@prisma/client';

type CreateUserSuccess = {
	success: true;
	user: User;
	team: Team;
};
type CreateUserFailure = {
	success: false;
	error: string;
	code: string | undefined;
};
export const createUser = async (userData: {
	email: string;
	password: string;
}): Promise<CreateUserFailure | CreateUserSuccess> => {
	const { email, password } = userData;
	try {
		const queryResult = await prisma.team.create({
			include: {
				users: {
					include: {
						user: true
					}
				}
			},
			data: {
				name: 'My Team',
				created_date: new Date(Date.now()),
				id: generateRandomString(15),
				users: {
					create: {
						role: 'admin',
						user: {
							create: {
								created_date: new Date(Date.now()),
								email,
								id: generateRandomString(15),

								key: {
									create: {
										id: createKeyId('email', email.toLowerCase()),
										hashed_password: await generateLuciaPasswordHash(password)
									}
								}
							}
						}
					}
				}
			}
		});
		const user = queryResult.users[0].user;

		prisma.$disconnect();
		return {
			success: true,
			user,
			team: queryResult as Omit<typeof queryResult, 'TeamMember'>
		};
	} catch (e) {
		// check for unique constraint error in user table
		if (
			e instanceof Prisma.PrismaClientKnownRequestError &&
			e.code === 'P2002'
		) {
			return {
				success: false,
				error: 'The user account could not be created.',
				code: e.code
			};
		}
		return {
			success: false,
			error: 'An unknown error occurred.',
			code: undefined
		};
	}
};

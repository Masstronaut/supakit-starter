import { prisma } from '$lib/prisma';
import type { PageServerLoad } from './$types';
import type { User } from '@prisma/client';

const USERS_PER_PAGE = 20;
const DEFAULT_SORT = 'createdAt';
const DEFAULT_ORDER = 'desc';

export const load: PageServerLoad = async ({ url }) => {
	const page = parseInt(url.searchParams.get('page') ?? '1');
	const skip = page > 0 ? (page - 1) * USERS_PER_PAGE : 0;
	const sortQueryParam = url.searchParams.get('sort') ?? DEFAULT_SORT;
	const sort =
		sortQueryParam in ['id', 'createdAt', 'username', 'role'] ? sortQueryParam : DEFAULT_SORT;
	const sortOrderQueryParam = url.searchParams.get('sortOrder') ?? DEFAULT_ORDER;
	const order = sortOrderQueryParam in ['asc', 'desc'] ? sortOrderQueryParam : DEFAULT_ORDER;

	const users = await prisma.user.findMany({
		take: USERS_PER_PAGE,
		skip,
		orderBy: { [sort]: order },
		select: {
			id: true,
			photo: true,
			createdAt: true,
			username: true,
			role: true
		}
	});

	return { users, index: 0 };
};

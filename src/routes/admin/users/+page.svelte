<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Table } from '$lib/components/Table';
	import type { PageData } from './$types';
	export let data: PageData;

	const dateFormatter = Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
	let sort: { key: 'id' | 'username' | 'createdAt' | 'role'; order: 'asc' | 'desc' } = {
		key: 'id',
		order: 'asc'
	};
	$: users = data.users.map((user) => {
		return { ...user, createdAt: dateFormatter.format(new Date(user.createdAt)) };
	});

	$: sortedUsers = users.sort((a, b) => {
		if (sort) {
			if (sort.order === 'asc') {
				return a[sort.key] > b[sort.key] ? 1 : -1;
			} else {
				return a[sort.key] < b[sort.key] ? 1 : -1;
			}
		} else {
			return 0;
		}
	});
	function onSort(key: 'id' | 'username' | 'createdAt' | 'role') {
		if (key !== sort.key) {
			sort = { key, order: 'asc' };
		} else {
			sort.order = sort.order === 'asc' ? 'desc' : 'asc';
		}
		const query = $page.url.searchParams;
		query.set('sort', key);
		query.set('order', `${sort.order}`);
		goto(`?${query.toString()}`);
	}
</script>

<h1>Manage your users</h1>

<table class="table">
	<thead>
		<th on:click={() => onSort('username')}>Username</th>
		<th on:click={() => onSort('createdAt')}>Created Date</th>
		<th on:click={() => onSort('id')}>User ID</th>
	</thead>
	<tbody>
		{#each sortedUsers as user}
			<tr class="hover">
				<td
					><div class="flex items-center space-x-3">
						<div class="avatar">
							<div class="mask mask-squircle h-12 w-12">
								<img src={user.photo} alt="Avatar of {user.username}" />
							</div>
						</div>
						<div>
							<div class="font-bold">{user.username}</div>
							<div class="text-sm opacity-50">{user.role}</div>
						</div>
					</div></td>
				<td>{user.createdAt}</td>
				<td>{user.id}</td>
			</tr>
		{/each}
	</tbody>
</table>

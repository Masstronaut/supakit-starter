<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let items: Array<any>;
	export let index = 0;
	export let sort: { key: string; order: 'asc' | 'desc' } | undefined = undefined;
	$: sortedItems = items.sort((a, b) => {
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
	$: keys = Object.keys(items[0]) ?? Array<string>();

	const dispatch = createEventDispatcher();
	function onSort(key: string) {
		dispatch('sort', { key, order: sort?.order == 'asc' ? 'desc' : 'asc' });
	}
</script>

<table class="table">
	<thead>
		{#if index}
			<th />
		{/if}
		{#each keys as key}
			<th on:click={() => onSort(key)}>{key}</th>
		{/each}
	</thead>
	<tbody>
		{#each sortedItems as item, i}
			<tr class="hover">
				{#if index}
					<th>{index + i}</th>
				{/if}
				{#each keys as key}
					<td>{item[key]}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

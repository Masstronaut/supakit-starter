<script lang="ts">
	export let label: string;
	export let id: string;
	export let placeholder: string | undefined = undefined;
	export let value: string;
	export let required: boolean = false;
	export let errors: string[] | undefined = undefined;
	export let type: 'text' | 'email' | 'password' = 'text';
</script>

<div class="form-control w-full max-w-lg">
	<label class="label" for={id}>
		<span class="label-text">{label}</span>
		{#if required}
			<span class="label-text-alt text-red-400 font-light text-sm">Required</span>
		{/if}
	</label>
	<input
		{required}
		{id}
		name={id}
		{value}
		{type}
		{placeholder}
		class="input input-bordered w-full max-w-lg"
	/>
	{#if errors}
		<label for={id}>
			<ul class="p-1">
				{#each errors as error}
					<li class="text-red-500 text-xs">{error}</li>
				{/each}
			</ul>
		</label>
	{/if}
</div>

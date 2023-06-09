<script lang="ts">
	export let title = 'Popular questions';
	export let questions: { question: string; answer: string }[];
</script>

<div class="max-w-3xl flex flex-col mx-auto mt-24 gap-6">
	<h2 class="text-3xl font-bold text-center">{title}</h2>
	{#each questions as { question, answer }}
		<div class="rounded-lg bg-base-200 p-6">
			<h3 class="text-xl font-bold">{question}</h3>
			<p class="mt-4 text-base">{answer}</p>
		</div>
	{/each}
</div>

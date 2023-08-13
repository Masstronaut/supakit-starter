<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { CheckCircle } from '@steeze-ui/heroicons';
	import { z } from 'zod';
	import type { IconSource } from '@steeze-ui/svelte-icon/types';

	const tierSchema = z.object({
		title: z.string(),
		description: z.string(),
		price: z.number(),
		features: z.object({
			intro: z.string(),
			list: z.array(z.string())
		}),
		primary: z.boolean().optional(),
		url: z.string().url(),
		cta: z.string()
	});
	type TierData = z.infer<typeof tierSchema>;

	export let tiers: (TierData & { icon: IconSource })[];
	export let billingCadence: 'monthly' | 'yearly' | 'once' = 'monthly';
</script>

<div class="my-8 flex w-full flex-row justify-center gap-12">
	{#each tiers as tier}
		<section
			class="flex max-w-xs flex-1 flex-col rounded-md border border-solid border-base-content/30 p-4 text-base-content"
			class:primary={tier.primary}
			class:w-72={tier.primary}
			class:my-8={!tier.primary}
			class:my-6={tier.primary}
			class:text-primary-content={tier.primary}
			class:scale-110={tier.primary}>
			<div class="mt-4 h-10 w-10 self-center">
				<Icon src={tier.icon} theme="outline" class="text-base-content" />
			</div>
			<h3 class="mb-6 text-center text-3xl font-bold">{tier.title}</h3>
			<p class=" mb-2 text-center">
				$<span class="text-3xl font-bold">{tier.price}</span>
				{#if billingCadence === 'monthly'}
					/ month
				{:else if billingCadence === 'yearly'}
					/ year
				{:else if billingCadence === 'once'}{''}{/if}
			</p>
			<p class="mb-6 text-center">{tier.description}</p>
			<a class="btn-outline btn" class:btn-primary={tier.primary} href={tier.url}>
				{tier.cta}
			</a>
			<p class="mb-2 mt-6 text-center">{tier.features.intro}</p>
			<ul class="mt-2 self-center">
				{#each tier.features.list as feature}
					<li class="mb-2 flex list-none items-center">
						<Icon src={CheckCircle} theme="solid" class="mr-2 h-5 w-5 text-success" />
						<span>{feature}</span>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
</div>

<style lang="postcss">
	/* could maybe improve this, see
	 https://stackoverflow.com/a/57218554 */
	section {
		transition: all 0.3s ease;
		background: radial-gradient(
			50% 50% at 50% 0%,
			theme(colors.base-100) 0%,
			theme(colors.base-100) 100%
		);
	}
	section.primary {
		background: radial-gradient(
			50% 50% at 50% 0%,
			theme(colors.base-200) 0%,
			theme(colors.base-200) 100%
		);
		@apply border-base-content/70;
	}
	section.primary > a.btn {
		@apply btn-primary;
	}
	section:hover {
		background: radial-gradient(
			50% 50% at 50% 0%,
			theme(colors.primary / 0.2) 0%,
			theme(colors.base-200) 100%
		);
		@apply border-primary ring-1 ring-primary;
	}
	section:hover > a.btn {
		@apply btn-primary;
	}
</style>

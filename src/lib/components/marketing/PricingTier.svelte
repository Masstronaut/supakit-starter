<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { CheckCircle } from '@steeze-ui/heroicons';
	import { z } from 'zod';
	import { Button } from '$lib/components';
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

<div class="flex flex-row w-full justify-center gap-12 my-8">
	{#each tiers as tier}
		<section
			class="text-base-content flex-1 max-w-xs p-4 border-base-content/30 border-solid border rounded-md flex flex-col"
			class:primary={tier.primary}
			class:w-72={tier.primary}
			class:my-8={!tier.primary}
			class:my-6={tier.primary}
			class:text-primary-content={tier.primary}
			class:scale-110={tier.primary}>
			<div class="w-10 h-10 mt-4 self-center">
				<Icon src={tier.icon} theme="outline" class="text-base-content" />
			</div>
			<h3 class="text-3xl font-bold text-center mb-6">{tier.title}</h3>
			<p class=" text-center mb-2">
				$<span class="text-3xl font-bold">{tier.price}</span>
				{#if billingCadence === 'monthly'}
					/ month
				{:else if billingCadence === 'yearly'}
					/ year
				{:else if billingCadence === 'once'}{''}{/if}
			</p>
			<p class="text-center mb-6 ">{tier.description}</p>
			<a class="btn btn-outline" class:btn-primary={tier.primary} href={tier.url}>
				{tier.cta}
			</a>
			<p class="text-center mt-6 mb-2">{tier.features.intro}</p>
			<ul class="self-center mt-2">
				{#each tier.features.list as feature}
					<li class="list-none flex items-center mb-2">
						<Icon src={CheckCircle} theme="solid" class="w-5 h-5 text-success mr-2" />
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

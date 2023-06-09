<script lang="ts">
	import { PricingTier, FAQs } from '$lib/components/marketing';
	import { Hero } from '$lib/components/marketing';
	import FeatureSection from '$lib/components/marketing/FeatureSection.svelte';

	import { AcademicCap, User, BuildingOffice } from '@steeze-ui/heroicons';
	const tiers = [
		{
			icon: AcademicCap,
			title: 'Student',
			description: 'Graduate from tutorials and start building your first SaaS app',
			price: 0,
			features: {
				intro: 'Get started with a strong foundation:',
				list: [
					'End-to-end type safety',
					'TailwindCSS w/ Heroicons',
					'Preconfigured auth & db',
					'Free projects only'
				]
			},
			url: '#',
			cta: 'Get lifetime access'
		},
		{
			icon: User,
			title: 'Hacker',
			description: 'Everything you need to bring your SaaS product to market',
			price: 759,
			primary: true,
			features: {
				intro: 'Everything in the Student tier, plus:',
				list: [
					'One developer',
					'Unlimited projects',
					'Stripe integration',
					'User dashboard',
					'Admin panel'
				]
			},
			url: '#',
			cta: 'Get lifetime access'
		},
		{
			icon: BuildingOffice,
			title: 'Business',
			description: 'Grow your SaaS product faster with analytics and insights',
			price: 4871,
			features: {
				intro: 'Everything in the Hacker tier, plus:',
				list: ['Uptime monitoring', 'Page analytics', 'Payments view', '30min onboarding call']
			},
			url: '#',
			cta: 'Get lifetime access'
		}
	];

	const questions = [
		{
			question: 'Why did you choose this technology stack?',
			answer:
				'Great developer experience is an incredible tool for launching and iterating quickly. Being able to ship faster than the competition provides your business with a major advantage. I picked technologies that are a joy to build with, that can scale to support a growing business, and that are easy to maintain. Third-party services needed to make it easy for you to setup, flexible, and priced competitively.'
		},
		{
			question: 'What is the difference between the Hacker and Business tiers?',
			answer:
				'The Hacker tier is for developers who want to build their own SaaS product and is the best fit for someone who is launching their first paid product or is building side hustles.  The Business tier is best for developers who are experienced building their own products and want to grow it faster with analytics and insights. Typically these are full-time entrepreneurs who support themselves with their SaaS product.'
		}
	];

	const features = [
		{
			title: 'End-to-end type safety',
			description: 'With TypeScript and tRPC, all API calls',
			icon: AcademicCap
		},
		{
			title: 'TailwindCSS w/ Heroicons',
			description: 'With TypeScript and tRPC, all API calls',
			icon: AcademicCap
		},
		{
			title: 'Preconfigured auth & db',
			description: 'With TypeScript and tRPC, all API calls',
			icon: AcademicCap
		},
		{
			title: 'Free projects only',
			description: 'With TypeScript and tRPC, all API calls',
			icon: AcademicCap
		}
	];
</script>

<Hero />

<FeatureSection {features} />

<PricingTier {tiers} billingCadence="once" />

<FAQs {questions} />

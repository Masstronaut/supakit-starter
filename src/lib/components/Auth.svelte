<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { z } from 'zod';
	import toast from 'svelte-french-toast';
	import { Input, Button } from '$lib/components';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { page } from '$app/stores';
	let loading = false;

	let emailSent = false;
	let sentEmailAddress = '';
	const submitLogin: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					if (!result.data?.success) {
						toast.error('Something went wrong with Login. Please try again.');
						break;
					}
					toast.success('📨 A login link has been sent to your email!');
					emailSent = true;
					console.log(result);
					sentEmailAddress = result.data.email;
					break;
				case 'error':
					toast.error('Something went wrong with Login. Please try again.');
					break;
				default:
					await applyAction(result);
			}
			await update();
			loading = false;
		};
	};

	let value: string = '';
	const emailSchema = z.string().email({ message: 'Please enter a valid email address.' });
	let errors = [];
	$: emailParseResult = emailSchema.safeParse(value);
	$: {
		if (emailParseResult.success) {
			errors = [];
		} else {
			errors = ['something went wrong'];
		}
	}
</script>

{#if !emailSent}
	<form
		method="post"
		action={`${$page.url.origin}/login?/login`}
		class="mx-auto mt-12 w-full max-w-lg"
		use:enhance={submitLogin}>
		<h1 class="text-center text-3xl font-medium dark:text-white">Login/Signup</h1>
		<p class="text-center dark:text-white">We will send you a magic link. Click it to sign in.</p>
		<div class="mb-6 grid gap-6">
			<div>
				<Input
					label="Email address"
					id="email"
					placeholder="John.Doe@gmail.com"
					type="email"
					{value}
					required={true}
					errors={[]} />
			</div>
			<Button {loading} disabled={loading} type="submit"
				>{loading ? 'Loading' : 'Send magic link'}</Button>
		</div>
	</form>
{:else}
	<div class="mx-auto mt-12 w-full max-w-lg">
		<h1 class="text-center text-3xl font-medium dark:text-white">Login/Signup</h1>
		<p class="text-center dark:text-white">
			We have sent your magic link to <em>{sentEmailAddress}</em>. Click it to sign in.
		</p>
	</div>
{/if}

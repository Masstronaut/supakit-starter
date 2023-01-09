<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { z } from 'zod';
	import toast from 'svelte-french-toast';
	import { Input } from '$lib/components';
	import Button from './Button.svelte';

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
		action="/login?/login"
		class="w-full max-w-lg mx-auto mt-12"
		use:enhance={submitLogin}
	>
		<h1 class="text-3xl font-medium text-center dark:text-white">Login/Signup</h1>
		<p class="text-center dark:text-white">We will send you a magic link. Click it to sign in.</p>
		<div class="grid gap-6 mb-6">
			<div>
				<Input
					label="Email address"
					id="email"
					placeholder="John.Doe@gmail.com"
					type="email"
					{value}
					required={true}
					errors={[]}
				/>
			</div>
			<Button {loading} disabled={loading} type="submit"
				>{loading ? 'Loading' : 'Send magic link'}</Button
			>
		</div>
	</form>
{:else}
	<div class="w-full max-w-lg mx-auto mt-12">
		<h1 class="text-3xl font-medium text-center dark:text-white">Login/Signup</h1>
		<p class="text-center dark:text-white">
			We have sent your magic link to <em>{sentEmailAddress}</em>. Click it to sign in.
		</p>
	</div>
{/if}

<script lang="ts">
	import { enhance } from '$app/forms';

	import { Alert } from '$lib/components';
	import type { ActionData } from './$types';

	export let form: ActionData;
	$: emailErrors = form?.errors?.email || [];
	$: passwordErrors = form?.errors?.password || [];
</script>

<h1>Sign in</h1>

{#if form?.message}
	{#if form.success}
		<Alert variant="success">{form.message}</Alert>
	{:else}
		<Alert variant="error">{form.message}</Alert>
	{/if}
{/if}
<form method="post" use:enhance>
	<div class="form-control w-full max-w-xs">
		<label for="email" class="label">
			<span class="label-text">Email</span>
		</label>
		<input
			required
			id="email"
			name="email"
			type="email"
			placeholder="johndoe@gmail.com"
			class="input-bordered input w-full max-w-xs" />
		<label class="label" for="email">
			{#each emailErrors as error}
				<span class="label-text-alt text-red-500">{error}</span>
			{/each}
		</label>
	</div>
	<div class="form-control w-full max-w-xs">
		<label for="Password" class="label">
			<span class="label-text">Password</span>
		</label>
		<input
			required
			id="password"
			name="password"
			type="password"
			class="input-bordered input w-full max-w-xs" />
		<label class="label" for="Password">
			<span class="label-text-alt text-red-500">
				{#if passwordErrors.length}
					<ul>
						{#each passwordErrors as error}
							<li>{error}</li>
						{/each}
					</ul>
				{/if}
			</span>
		</label>
	</div>
	<input type="submit" value="Sign in" class="btn-primary btn" />
</form>
Don't have an account yet?&nbsp;
<a href="/signup" class="text-primary">Sign up</a>

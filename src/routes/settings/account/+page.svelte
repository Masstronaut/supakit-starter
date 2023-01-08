<script lang="ts">
	import { Button, EmailInput } from '$lib/components';

	let email: string = '';
</script>

<h2 class="text-3xl">Account settings</h2>

<div class="flex flex-col w-full space-y-12">
	<div class="w-full mt-8">
		<h3 class="text-2xl font-medium mb-2">Change email</h3>
		<p class="text-base-content ">Your email is used to sign in to your account.</p>
		<form action="?/updateEmail" method="post">
			<EmailInput bind:value={email} id="email" />
			<Button type="submit">Change email</Button>
		</form>
	</div>
	<div class="divider" />
</div>

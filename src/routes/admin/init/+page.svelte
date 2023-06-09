<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import type { LayoutData } from '../../$types';

	export let data: LayoutData;
	$: ({ supabase, session } = data);
	data.session?.user.role;

	const avatarStatusDescriptionOptions = {
		loading: 'Checking if the avatar bucket has been created...',
		exists: 'The avatar bucket has been created.',
		'not-exists': "The avatar bucket hasn't been created yet."
	};
	let avatarBucketStatus: 'loading' | 'exists' | 'not-exists' = 'loading';
	$: avatarStatusDescription = avatarStatusDescriptionOptions[avatarBucketStatus];

	console.log(avatarStatusDescription);

	const getBucket = async () => {
		const { data, error } = await supabase.storage.getBucket('avatars');
		if (error !== null) {
			console.log('Something went wrong getting the avatars bucket:');
			console.log({ error });
			if (error.name === 'StorageApiError' && error.message === 'The resource was not found') {
				avatarBucketStatus = 'not-exists';
			}
		} else if (data !== null) {
			console.log("Successfully got the bucket 'avatars':");
			console.log({ data });
			avatarBucketStatus = 'exists';
		}
	};

	const makeBucket = async () => {
		const { data, error } = await supabase.storage.createBucket('avatars', { public: true });
		if (error !== null) {
			console.log('Something went wrong making the avatars bucket:');
			console.log({ error });
		} else if (data !== null) {
			console.log("Successfully made the bucket 'avatars':");
			console.log({ data });
		}
	};
	let createBucketLoading = false;
	onMount(async () => {
		await getBucket();
	});
</script>

<div class="card w-96 bg-base-100 shadow-xl">
	<figure class="px-10 pt-10">
		<img src="https://placeimg.com/400/225/people" alt="a person" class="rounded-xl" />
	</figure>
	<div class="card-body items-center text-center">
		<h2 class="card-title">User avatar storage bucket</h2>
		<p>{avatarStatusDescription}</p>
		{#if avatarBucketStatus === 'not-exists'}
			<form method="post" class="card-actions" action="?/createAvatarsBucket" use:enhance>
				<button type="submit" class="btn-primary btn">Make avatars bucket</button>
			</form>
		{/if}
	</div>
</div>

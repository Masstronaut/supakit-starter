<script lang="ts">
	export let loading = false;
	export let disabled = false;
	export let type: 'submit' | 'button' | 'reset' | null | undefined = 'button';
</script>

<button class:loading class:btn-disabled={disabled} class="btn btn-primary" {type}>
	<slot />
</button>

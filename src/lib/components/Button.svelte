<script lang="ts">
	export let loading = false;
	export let disabled = false;
	export let palette: 'primary' | 'secondary' | 'accent' | 'ghost' = 'primary';
	export let variant: 'solid' | 'outline' = 'solid';
	export let type: 'submit' | 'button' | 'reset' | null | undefined = 'button';
</script>

<button
	class="btn"
	class:loading
	class:btn-disabled={disabled}
	class:btn-primary={palette === 'primary'}
	class:text-primary-content={palette === 'primary'}
	class:btn-secondary={palette === 'secondary'}
	class:text-secondary-content={palette === 'secondary'}
	class:btn-accent={palette === 'accent'}
	class:text-accent-content={palette === 'accent'}
	class:btn-ghost={palette === 'ghost'}
	class:text-base-content={palette === 'ghost'}
	class:btn-outline={variant === 'outline'}
	{type}
>
	<slot />
</button>

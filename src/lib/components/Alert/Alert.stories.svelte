<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { Alert } from '$lib/components';
</script>

<Meta
	title="Component/Alert"
	component={Alert}
	parameters={{ layout: 'centered' }}
	argTypes={{
		variant: {
			control: {
				type: 'radio'
			},
			options: ['default', 'info', 'warning', 'success', 'error']
		}
	}} />

<Template let:args>
	<Alert {...args}>This is a(n) {args.variant} alert message</Alert>
</Template>
<!-- this is a description for the default story! -->
<Story name="Default" />

<Story name="Info" source args={{ variant: 'info' }} />

<Story name="Success" source args={{ variant: 'success' }} />
<Story name="Error" source args={{ variant: 'error' }} />

<Story name="Warning" source args={{ variant: 'warning' }} />
<Story name="With button" let:args>
	<Alert {...args} variant>
		<div>
			<h3 class="font-bold">New message!</h3>
			<div class="text-xs">You have 1 unread message</div>
		</div>
		<button class="btn-sm btn">See</button>
	</Alert>
</Story>

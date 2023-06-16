<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { Button } from '$lib/components';
</script>

<Meta
	title="Component/Button"
	component={Button}
	parameters={{ layout: 'centered' }}
	argTypes={{
		loading: {
			control: {
				type: 'boolean'
			},
			options: [true, false]
		},
		disabled: {
			control: {
				type: 'boolean'
			},
			options: [true, false]
		},
		palette: {
			control: {
				type: 'select'
			},
			options: ['primary', 'secondary', 'accent', 'ghost']
		},
		variant: {
			control: {
				type: 'select'
			},
			options: ['solid', 'outline']
		},
		type: {
			control: {
				type: 'select'
			},
			options: ['submit', 'button', 'reset']
		}
	}} />

<Template let:args>
	<Button {...args} on:clicked={args.clicked}>Click me</Button>
</Template>

<Story name="Disabled" args={{ disabled: true }} />

<Story name="Loading" source args={{ loading: true }} />

<!-- Dynamic snippet should be disabled for this story -->
<Story name="Button No Args" let:args>
	<Button {...args}>Label</Button>
</Story>

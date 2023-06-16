<script>
	import { Meta, Template, Story } from '@storybook/addon-svelte-csf';
	import { Table } from '$lib/components/Table';

	// mock items
	const items = [
		{
			id: '123abc',
			name: 'John Doe',
			email: 'test@email.me'
		},
		{
			id: '456def',
			name: 'Jane Doe',
			email: 'test2@email.you'
		}
	];
</script>

<Meta
	title="Component/Table"
	component={Table}
	parameters={{ layout: 'centered' }}
	args={{
		items
	}}
	argTypes={{
		items: {
			control: {
				type: 'object'
			}
		},
		index: {
			control: {
				type: 'number'
			}
		}
	}} />

<Template let:args>
	<Table {...args} />
</Template>

<Story name="Basic" />

<Story name="With Index" args={{ index: 1 }} />

<Story name="with paginated index" args={{ index: 20 }} />

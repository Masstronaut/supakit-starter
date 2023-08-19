// See https://kit.svelte.dev/docs/types#app
import type { User } from '@prisma/client';

declare global {
	declare namespace App {
		interface Locals {
			auth: import('lucia').AuthRequest;
		}
		// interface PageData {}
		// interface Error {}
		// interface Platform {}
	}
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = Omit<User, 'id'>;
		type DatabaseSessionAttributes = {};
	}
}
// Allegedly this is important for lucia. I don't know why. 🤷‍♂️
export {};

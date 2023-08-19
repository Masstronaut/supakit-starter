import { z } from 'zod';

export const passwordSchema = z
	.string()
	.min(8, { message: 'Password must be at least 8 characters' })
	.max(255, { message: 'Password must be less than 255 characters' })
	.regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{0,}$/, {
		message:
			'Password must contain an uppercase letter, lowercase letter, and number'
	});

export const emailSchema = z
	.string()
	.email({ message: 'Email address must be valid' });

export const validateUserAccountInfo = (account: {
	email: string;
	password: string;
}):
	| { success: true; email: string; password: string }
	| {
			success: false;
			errors: { email?: string[] | undefined; password?: string[] | undefined };
	  } => {
	const parsedAccount = z
		.object({
			email: emailSchema,
			password: passwordSchema
		})
		.safeParse(account);
	if (!parsedAccount.success) {
		return {
			success: false,
			errors: parsedAccount.error.flatten().fieldErrors
		};
	}
	return {
		success: true,
		email: parsedAccount.data.email,
		password: parsedAccount.data.password
	};
};

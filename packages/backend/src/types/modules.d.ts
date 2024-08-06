declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;
			JWT_SECRET: string;
			JWT_EXPIRATION: string;
			CLIENT_URL: string;
			BACK_URL: string;
			EMAIL_USERNAME: string;
			EMAIL_PASSWORD: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};

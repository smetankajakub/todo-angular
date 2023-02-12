import { writeFile } from 'fs';
const targetPath = './src/environments/environment.prod.ts';
import dotenv from 'dotenv';
dotenv.config();
const envConfigFile = `export const environment = {
	production: ${process.env.PRODUCTION},
	apiUrl: '${process.env.API_URL}',
	firebaseConfig: {
		apiKey: '${process.env.FIREBASE_API_KEY}',
		authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
		databaseURL: '${process.env.FIREBASE_DATABASE_URL}',
		projectId: '${process.env.FIREBASE_PROJECT_ID}',
		storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
		messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
		appId: '${process.env.FIREBASE_APP_ID}',
	}
};`;
writeFile(targetPath, envConfigFile, function (err) {
	if (err) {
		throw console.error(err);
	} else {
		console.log(
			`Angular environment.production.ts file generated correctly at ${targetPath} \n`
		);
	}
});

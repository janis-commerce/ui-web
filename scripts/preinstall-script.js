const isRootInstall = process.env.npm_lifecycle_event === 'preinstall';

if (!isRootInstall) {
	process.exit(0); // No ejecutar si se está instalando como dependencia
}

if (process.env.npm_execpath.indexOf('yarn') === -1) {
	console.error('You must use Yarn to install dependencies:');
	console.error('  $ yarn install');
	process.exit(1);
}

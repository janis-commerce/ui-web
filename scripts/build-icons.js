'use strict';

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const DEFAULT_SIZE = 24;
const VALID_SIZES = [24, 16];

/* eslint-disable no-console */
/**
 * show message and exit with code 1
 * @param {string} message
 * @param {string} err
 */
const exit = (message, err) => {
	console.log(chalk.red(message), err);
	process.exit(1);
};

const getSizeFromTags = (tags) => {
	if (!tags.length) return DEFAULT_SIZE;

	const tagSize = Number(tags[0]);
	return VALID_SIZES.includes(tagSize) ? tagSize : DEFAULT_SIZE;
};

/**
 * Make icons { iconName: { path, size } }
 * @param {object} selection
 * @returns {object}
 */
const makeIcons = (selection) =>
	selection.icons.reduce((acc, { icon, properties }) => {
		acc[properties.name] = {
			path: icon.paths.join(' '),
			size: getSizeFromTags(icon.tags)
		};

		return acc;
	}, {});

console.log('reading selection.json');
fs.readFile(path.join(__dirname, '/resources/selection.json'), 'utf8', (err, data) => {
	if (err) return exit('error al leer el archivo\n', err);

	let icons;
	try {
		console.log('making icons...');
		icons = makeIcons(JSON.parse(data));
	} catch (e) {
		return exit('selection.json is not valid', e);
	}
	console.log('writing icons.json');
	fs.writeFileSync(
		path.resolve(__dirname, '../src/web/components/Icon/icons.json'),
		JSON.stringify(icons, null, '\t')
	);
	console.log(chalk.green('Completed!'));
});

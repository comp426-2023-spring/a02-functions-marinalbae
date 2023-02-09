#!/usr/bin/env node
import minimist from 'minimist';
import fetch from 'node-fetch';
import moment from 'moment-timezone';

var args = minimist(process.argv.slice(2));

if (args.h) {
	console.log('Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE\n    -h            Show this help message and exit.\n    -n, -s        Latitude: N positive; S negative.\n    -e, -w        Longitude: E positive; W negative.\n    -z            Time zone: uses tz.guess() from moment-timezone by default.\n    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.\n    -j            Echo pretty JSON from open-meteo API and exit.');
	process.exit(0);
}

var timezone = moment.tz.guess();
var longitude = 0;
var latitude = 0;

if (args.n) {
	latitude = parseFloat(args.n);
}
if (args.s) {
	latitude = parseFloat(args.n)*-1;
}
if (args.e) {
	longitude = parseFloat(args.e);
}
if (args.w) {
	longitude = parseFloat(args.w)*-1;
}
if (args.z) {
	timezone = arg.z;
}


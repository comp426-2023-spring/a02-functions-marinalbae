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

if (args.n && !args.s) {
	latitude = parseFloat(args.n);
}
if (args.s && !args.n) {
	latitude = parseFloat(args.s)*-1;
}
if (args.e && !args.w) {
	longitude = parseFloat(args.e);
}
if (args.w && !args.e) {
	longitude = parseFloat(args.w)*-1;
}
if (args.z) {
	timezone = args.z;
}

const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&timezone=' + timezone);
const data = await response.json();

var days = 0;
if (args.d) {
	 days = args.d;
} else {
	days = 1;
}

if (days == 0) {
  console.log("today.");
} else if (days > 1) {
  console.log("in " + days + " days.");
} else {
  console.log("tomorrow.");
}

if (args.j) {
	console.log(data);
	process.exit(0);
}

if (data.daily.precipitation_hours[days] != 0) {
	console.log('You might need your galoshes ');
} else if (data.daily.precipitation_hours[days] == 0) {
	console.log('You will not need your galoshes ');
}

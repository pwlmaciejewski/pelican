# Pelican [![Build Status](https://secure.travis-ci.org/fragphace/pelican.png?branch=master)](http://travis-ci.org/fragphace/pelican)

YouTube web server with real-time queue. 
Ideal as a music server in your workplace.

## Installation

	npm install -g pelican

## Usage

```
$ pelican start
Pelican started at port 3000
Always remember that Pelican is based on trust and compassion

Player:	 http://localhost:3000/player
Songs:	 http://192.168.1.7:3000/songs
```

More information: `pelican -h`

## Tests

	npm test

## Changelog

__Next release__

* More informative `pelican start` output
* Couple of bug fixes
* Project rewritten in coffeescript
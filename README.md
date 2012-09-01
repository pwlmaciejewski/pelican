# Pelican

YouTube web server with real-time queue.

[![Build Status](https://secure.travis-ci.org/fragphace/pelican.png?branch=master)](http://travis-ci.org/fragphace/pelican)

## Installation

	sudo npm install -g pelican

## Start

Pelican starts as a daemon:

	pelican start

## Usage

After starting a daemon, server admin can launch YouTube player by entering `http://localhost:3000/player`.

Clients can add new songs to queue in `http://[pelican server address]:3000/songs`.

## Tests

	npm test

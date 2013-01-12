fs = require 'fs'

module.exports = 
	ajax: (options) ->
		# TEED - Garden
		if options.url == 'https://gdata.youtube.com/feeds/api/videos/KD1NTfTF21I?v=2&alt=json'
			options.success JSON.parse fs.readFileSync('fixtures/youtubeResponses/teed.garden.json').toString()

		# Amelie
		else if options.url == 'https://gdata.youtube.com/feeds/api/videos/WYGFNjEL7Jw?v=2&alt=json'
			options.success JSON.parse(fs.readFileSync('fixtures/youtubeResponses/amelie.json').toString())

		# Epic sax guy
		else if options.url == 'https://gdata.youtube.com/feeds/api/videos/8ZcmTl_1ER8?v=2&alt=json'
			options.success JSON.parse(fs.readFileSync('fixtures/youtubeResponses/saxguy.json').toString())

		else 
			options.error
				status: 400
				responseTest: '<errors xmlns=\'http://schemas.google.com/g/2005\'><error><domain>GData</domain><code>InvalidRequestUriException</code><internalReason>Invalid id</internalReason></error></errors>'
			
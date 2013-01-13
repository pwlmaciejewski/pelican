define [
	'backbone', 
	'mustache', 
	'text!/templates/songThumb.tmpl'
], (Backbone, Mustache, template) ->
	Backbone.View.extend
		initialize: ->
			@model.on 'change', =>
				@render()

		render: ->
			@$el.html Mustache.render(template, @model.toJSON())
			@
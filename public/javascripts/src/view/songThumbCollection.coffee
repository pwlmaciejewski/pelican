define [
	'underscore', 
	'backbone', 
	'view/songThumb'
], (_, Backbone, SongThumb) ->
	Backbone.View.extend
		tagName: 'ul'

		attributes:
			className: 'songThumbCollection'

		initialize: ->
			@collection.on 'reset', @reset.bind(@)

			@collection.on 'add', (model) =>
				@add model

			@collection.on 'remove', (model) =>
				@remove model

		empty: ->
			'<li class="empty">No songs in queue</li>'

		reset: ->
			@$el.html this.empty()
			@collection.each @add.bind(this)

		add: (model) ->
			@$el.find('.empty').remove()

			view = new SongThumb
				model: model,
				tagName: 'li'
			@views.push view

			@$el.append view.el
			view.render()
			view.$el.hide()
			view.$el.fadeIn()

		remove: (model) ->
			@views = _(this.views).reject (view) =>
				reject = view.model == model
				if reject
					view.$el.fadeOut =>
						view.remove()
						unless @views.length
							@$el.html @empty()
				reject

		views: []
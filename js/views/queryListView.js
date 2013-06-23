define(['jquery', 'underscore', 'backbone', 'text!templates/queryListView.html', 'util/constants', 'views/queryView'], 
        function($, _, Backbone, queryListViewTemplate, Constants, QueryView) {

	function applyVentBindings(callback1, callback2) {
		Constants.VENT.on(Constants.EVENTS.QUERY_ADDED, callback1);
		Constants.VENT.on(Constants.EVENTS.DATA_CLEARED, callback2);
	}

    var QueryListView = Backbone.View.extend({

        el: $("#queries"),
		
        initialize: function(options) {
			_.bindAll(this);
			this.queries = options.queries;
			this.listenTo(this.queries, 'add', this.addOne);
			this.listenTo(this.queries, 'reset', this.render);
			applyVentBindings(this.addQuery, this.clearAll);
		},
        
        render: function() {
            var compiledTemplate = _.template(queryListViewTemplate);
            this.$el.html(compiledTemplate);
            this.addAll();
        },
	
		events: {
		},
		
		addQuery: function(query) {
			this.queries.add(query);
		},

		clearAll: function() {
			this.queries.reset();
		},

		addOne: function(query) {
	      	var view = new QueryView({model: query});
	      	$("#query-list").append(view.render().el);
    	},

		addAll: function() {
			this.queries.each(this.addOne, this);
		}
    });
    
    return QueryListView;
});
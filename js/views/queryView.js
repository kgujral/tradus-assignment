define(['jquery', 'underscore', 'backbone', 'text!templates/queryView.html', 'util/preProcessor', 'models/query'], 
        function($, _, Backbone, queryViewTemplate, PreProcessor, Query) {

    var QueryView = Backbone.View.extend({

        initialize: function() {
			_.bindAll(this);
		},
        
        render: function() {
            var compiledTemplate = _.template(queryViewTemplate, { query: this.model.toJSON() } );
            this.$el.html(compiledTemplate);
            return this;
        },
	
		events: {
			'click .run-query' : 'searchPages'
		},
	
		searchPages: function() {
			var output = _.pluck(PreProcessor.searchPages( this.model ), 'page').toString();
			this.$('.query-result').html(output || 'No Pages found!');
			return false;
		}
		
    });
    
    return QueryView;
});
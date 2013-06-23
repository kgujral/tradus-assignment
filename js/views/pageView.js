define(['jquery', 'underscore', 'backbone', 'text!templates/pageView.html'], 
        function($, _, Backbone, pageViewTemplate) {

    var PageView = Backbone.View.extend({

        initialize: function() {
			_.bindAll(this);
		},
        
        render: function() {
            var compiledTemplate = _.template(pageViewTemplate, { page: this.model.toJSON() } );
            this.$el.html(compiledTemplate);
            return this;
        }
    });
    
    return PageView;
});
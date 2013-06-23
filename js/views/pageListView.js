define(['jquery', 'underscore', 'backbone', 'text!templates/pageListView.html', 'util/constants', 'views/pageView'], 
        function($, _, Backbone, pageListViewTemplate, Constants, PageView) {

	function applyVentBindings(callback1, callback2) {
		Constants.VENT.on(Constants.EVENTS.PAGE_ADDED, callback1);
		Constants.VENT.on(Constants.EVENTS.DATA_CLEARED, callback2);
	}

    var PageListView = Backbone.View.extend({

        el: $("#pages"),
		
        initialize: function(options) {
			_.bindAll(this);
			this.pages = options.pages;
			this.listenTo(this.pages, 'add', this.addOne);
			this.listenTo(this.pages, 'reset', this.render);
			applyVentBindings(this.addPage, this.clearAll);
		},
        
        render: function() {
            var compiledTemplate = _.template(pageListViewTemplate);
            this.$el.html(compiledTemplate);
            this.addAll();
        },
	
		events: {
		},
		
		addPage: function(page) {
			this.pages.add(page);
		},

		clearAll: function() {
			this.pages.reset();
		},

		addOne: function(page) {
	      	var view = new PageView({model: page});
	      	$("#page-list").append(view.render().el);
    	},

		addAll: function() {
			this.pages.each(this.addOne, this);
		}
    });
    
    return PageListView;
});
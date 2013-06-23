define(['underscore', 'backbone', 'localStorage'], function(_, Backbone, Store) {
    
    var Page = Backbone.Model.extend({
    	localStorage: new Store("Page"),
    	init: function(options) {
    		this.name = options.name || '';
    		this.keywords = options.keywords || [];
    	},
    	toString: function() {
    		return this.get('name');
    	}
    });
    
    return Page;
});
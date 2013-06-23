define(['underscore', 'backbone', 'localStorage'], function(_, Backbone, Store) {
    
    var Query = Backbone.Model.extend({
    	localStorage: new Store("Query"),
    	init: function(options) {
    		this.name = options.name || '';
    		this.keywords = options.keywords || [];
    	},
    	toString: function() {
    		return '[name='+this.get('name')+', keywords='+this.get('keywords')+']';
    	}
    });
    
    return Query;
});
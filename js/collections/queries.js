define(['backbone', 'models/query', 'localStorage'], function(Backbone, Query, Store) {
    
    var Queries = Backbone.Collection.extend({
    	localStorage: new Store("Query"),
        model: Query
    });
    
    return Queries;
});
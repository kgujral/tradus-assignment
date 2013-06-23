define(['backbone', 'models/page', 'localStorage'], function(Backbone, Page, Store) {
    
    var Pages = Backbone.Collection.extend({
    	localStorage: new Store("Page"),
        model: Page
    });
    
    return Pages;
});
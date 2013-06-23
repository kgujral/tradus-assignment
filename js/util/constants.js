define(['backbone'], function(Backbone) {
    
   return {
   		TEXT : {
   			DELIMITER: ' ',
        INVALID_DATA: 'The data must start with a \'P\' or a \'Q\' and must be followed by keywords separated by spaces.',
        ADDED_SUCCESSFULLY: 'Added Successfully !'
   		},
   		EVENTS : {
   			PAGE_ADDED : 'page.added',
   			QUERY_ADDED : 'query.added',
   			DATA_CLEARED : 'data.cleared'
   		},
   		KEYWORD_PAGE_INDEX: {},
        VENT : _.extend({}, Backbone.Events),
        TOTAL_KEYWORDS : 8
   };

});
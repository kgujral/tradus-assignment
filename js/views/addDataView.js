define(['jquery', 'underscore', 'backbone', 'text!templates/addData.html', 'models/query', 'models/page',
		'collections/pages', 'collections/queries', 'util/preProcessor', 'util/constants', 'localStorage'], 
	function($, _, Backbone, addDataTemplate, Query, Page, Pages, Queries, PreProcessor, Constants, Store) {

    var AddDataView = Backbone.View.extend({
        el: $("#add-data"),
		
        initialize: function(options) {
			_.bindAll(this);

			this.pages = options.pages;
			this.queries = options.queries;
			this.$alert = $('.alert'); 
			this.queryCount = this.queries.length;
			this.pageCount = this.pages.length;
		},
	
		events: {
			'submit #add-data-form' : 'addData',
			'click #reset-all' : 'resetStorage'
		},
		
		render : function() {
			var compiledTemplate = _.template(addDataTemplate);
            this.$el.append(compiledTemplate);
		},

		close: function() {
			this.undelegateEvents();
		},
		
		addData: function(e) {
			e.preventDefault();
			this.$alert.hide();	
			var $dataTextBox = $('#data-text');
			try {
				parseAndSaveData($dataTextBox.val(), this);
				$dataTextBox.val('');
				this.$alert.removeClass('alert-error').addClass('alert-success').html(Constants.TEXT.ADDED_SUCCESSFULLY);
			} catch(err) {
				this.$alert.removeClass('alert-success').addClass('alert-error').html(Constants.TEXT.INVALID_DATA);
			}
			this.$alert.fadeIn();
			return false;
		},

		resetStorage: function() {
			new Store('Page')._clear();
			new Store('Query')._clear();
			Constants.VENT.trigger(Constants.EVENTS.DATA_CLEARED);
			this.queryCount = 0;
			this.pageCount = 0;
			console.log('All queries and pages cleared.');
		}
    });

//	private functions
    function parseAndSaveData(data, view) {
		var validPattern = /^[p|q][\s].+/;
		if( !validPattern.test( data.toLowerCase() ) ) {
			throw "Invalid input string :" + data;
		}
		var bbData = createPageOrQueryData(data, view);
		bbData.save();
		console.log('Saved '+ bbData);
	};

    function createPageOrQueryData(data, view) {
    	var returnValue;
    	if( data.toLowerCase().indexOf('p') == 0 ) {
			view.pageCount++;
			returnValue = new Page( { name: 'P'+view.pageCount, keywords: extractKeywords(data) } );
			PreProcessor.createIndex(returnValue);
			Constants.VENT.trigger(Constants.EVENTS.PAGE_ADDED, returnValue);
		}
		else {
			view.queryCount++;
			returnValue = new Query( { name: 'Q'+view.queryCount, keywords: extractKeywords(data) } );
			Constants.VENT.trigger(Constants.EVENTS.QUERY_ADDED, returnValue);
		}
		return returnValue;
    }

    function extractKeywords(data) {
    	data = data.substring(2).trim().replace( /\s\s+/g, ' ' );
    	return data.split(Constants.TEXT.DELIMITER);
    }
//	end of private functions
    return AddDataView;
});
define(['backbone', 'util/preProcessor', 'views/addDataView', 'views/queryListView', 'views/pageListView', 
        'collections/queries', 'collections/pages'], 
    function(Backbone, PreProcessor, AddDataView, QueryListView, PageListView, Queries, Pages) {
    var AppRouter = Backbone.Router.extend({
        routes: {
			''	: 'showHome'
        },
        
		showHome: function() {
            var queries = new Queries();
            var pages = new Pages();

            setupInitialData(pages, queries);

            new AddDataView({pages: pages, queries: queries}).render();
            new QueryListView({queries: queries}).render();            
            new PageListView({pages: pages}).render();            
        }
        
    });

    var initialize = function() {
        new AppRouter();
        Backbone.history.start();
    };

    // Setting up initial demo data from localstorage.
    function setupInitialData(pages, queries) {
        console.log('Setting up initial data from local storage.');
        pages.fetch();      //fetching from localstorage so callback not required
        queries.fetch();    //fetching from localstorage so callback not required

        pages.each(function(onePage) {
            console.log('Creating index for already existing page: ' + onePage.toString());
            PreProcessor.createIndex(onePage);
        });

        console.log('Existing queries : ');
        queries.each(function(oneQuery) {
            console.log(oneQuery.toString());
        });
        console.log('Initial data setup completed.');
    }
    return {
        initialize: initialize
    };
});
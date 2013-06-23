define(['util/constants'], function(Constants) {

    return  {
        createIndex : function(page) {
        	var keywords = page.get('keywords');
        	for ( var i = 0 ; i < keywords.length ; i++ ) {
        		var keyword = keywords[i].toLowerCase();
        		var pageToInsert = {page: page, weight: Constants.TOTAL_KEYWORDS - i};
        		var indexedPages = Constants.KEYWORD_PAGE_INDEX[ keyword ];
        		if( indexedPages ) {
					indexedPages.push( pageToInsert );
        		} else {
        			Constants.KEYWORD_PAGE_INDEX[ keyword ] = [ pageToInsert ];
        		}

        	}
        	console.log("created index for "+ page.toString());
        },

        searchPages : function(query) {
        	var keywords = query.get('keywords');
        	var output = [];
        	for ( var i = 0 ; i < keywords.length ; i++ ) {
        		var keyword = keywords[i].toLowerCase();
        		var indexedPages = Constants.KEYWORD_PAGE_INDEX[ keyword ];
        		if( indexedPages ) {
	        		for ( var j = 0 ; j < indexedPages.length ; j++ ) {
	        			addToOutput(output, indexedPages[ j ], Constants.TOTAL_KEYWORDS - i);
	        		}
        		}
        	}
			return output.slice(0, 5);        	
        }

    };

    function addToOutput(output, page, weight) {
        var pageToInsert = {page: page.page.clone(), weight: page.weight};
    	pageToInsert.weight *= weight;
    	var itemIndex = contains(output, pageToInsert);
    	if(itemIndex != -1) {
			var exisitingPage = output.splice(itemIndex, 1);
			pageToInsert.weight += exisitingPage[0].weight;
    	}
		var position = sortedIndex(output, pageToInsert);
		output.splice(position, 0, pageToInsert);
    	var str = '';
		
    }

    function contains(arr, value) {
    	for(var i = 0; i < arr.length; i++) {
    		var item = arr[i];
    		if( item.page.get('id') === value.page.get('id') )
    			return i;
    	}
    	return -1;
    }

    function sortedIndex(indexedPages, pageToInsert) {
	    var index = 0;
	    _.each(indexedPages, function(page) {
	        if(page.weight > pageToInsert.weight) {
	            index ++;
	        } else if( page.weight == pageToInsert.weight && page.page.get('name') < pageToInsert.page.get('name') ) {
	            index ++;
	        } else {
	        	return index;
	        }
	    });
	    return index;
	}
});
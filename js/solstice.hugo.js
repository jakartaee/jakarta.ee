// only use this code if jquery has been defined
(function($, document) {
	// check to make sure that we have a table class to set
	if (typeof tableClasses !== 'undefined' && tableClasses != null) {
		// on document ready, inject table classes
		$(document).ready(function() {
			$('main table').each(function(index) {
				// dont add classes if there are already some set
				if ($(this).attr("class") == null) {
					$(this).addClass(tableClasses);
				}
			});
		});
	}
})(jQuery, document);
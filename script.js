// Custom sorting plugin
(function($) {
  $.fn.sorted = function(customOptions) {
    var options = {
      reversed: false,
      by: function(a) { return a.text(); }
    };
    $.extend(options, customOptions);
    $data = $(this);
    arr = $data.get();
    arr.sort(function(a, b) {
      var valA = options.by($(a));
      var valB = options.by($(b));
      if (options.reversed) {
        return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;				
      } else {		
        return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;	
      }
    });
    return $(arr);
  };
})(jQuery);

// DOMContentLoaded
$(function() {

  // bind radiobuttons in the form
  var $filterType = $('#filter input[name="type"]');
 // var $filterSort = $('#filter input[name="sort"]');

  // get the first collection
  var $applications = $('#hiddenTotal');
  console.log($applications);
  
  var $data = $applications.clone();
  console.log($data)

  // clone applications to get a second collection

  // attempt to call Quicksand on every form change
  $filterType.change(function(e) {
    if ($($filterType+':checked').val() == 'all') {
      var $filteredData = $data.find('li');
	  console.log('Data with no sort: '+$filteredData.html());
    } else {
      var $filteredData = $data.find('li[data-type=' + $($filterType+":checked").val() + ']');
	  for(var i=0; i<$filteredData.length; i++)
	  {
	  console.log('Data After sort from '+$filterType.html().toString()+': '+$filteredData[i].innerHTML);
	  }
    }

    // if sorted by size
   
    // finally, call quicksand
    $applications.quicksand($filteredData, {
      duration: 800,
      easing: 'easeInOutQuad'
    }, newPagination($filteredData.clone(), $filteredData.length));

  });

});
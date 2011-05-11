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
  var $filterMaterial = $('#filter input[name="material"]');
  console.log($filterMaterial);
  
  
  // get the first collection
  var $applications = $('#hiddenTotal');
  console.log($applications);
  
  var $data = $applications.clone();
  console.log($data)

  // clone applications to get a second collection

  $filterType.change(function(e){
	console.log(e.currentTarget)
	$filterType.attr('selected','false');
	e.currentTarget.setAttribute('selected','true');						  
  });
  
 $filterMaterial.change(function(e){
	$filterMaterial.attr('selected','false');
	e.currentTarget.setAttribute('selected','true');						  
  });

  // attempt to call Quicksand on every form change
  $filterType.add($filterMaterial).change(function(e) {
	console.log("o material escolhido é:"+$($filterMaterial+'[selected = true]').val());
	console.log("o filterType escolhido é:"+$($filterType+'[selected = true]').val());
    if ($($filterType+'[selected=true]').val() == 'all') {
      var $filteredData = $data.find('li');
	  console.log('Data with no sort');
    } else {
	  var $firstFiltered = $data.find('li[data-type=' + $($filterType+'[selected=true]').val() + ']');
      var $filteredData = new Array();
	  for(var j=0; j<$firstFiltered.length; j++)
	  {
		console.log("Data from the first Sort:"+$firstFiltered[j]);
		console.log("Material escolhido: "+$($filterMaterial+'[selected=true]').val())
		if($firstFiltered[j].getAttribute('data-material')==$($filterMaterial+'[selected=true]').val())
		{
			console.log("Yeeah")
			$filteredData.push($firstFiltered[j]);
		}
	  }
	  
	  
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
        
            // This is a very simple demo that shows how a range of elements can
            // be paginated.
            // The elements that will be displayed are in a hidden DIV and are
            // cloned for display. The elements are static, there are no Ajax 
            // calls involved.
        

			var _firstTimer = true;			// This is the flag to check if it's the first time the pagination is initiated
			var $sortResults = new Array;   // This is an array to be populated with the new elements from the sorting
			
			/**
             * Callback function that displays the content.
             *
             * Gets called every time the user clicks on a pagination link.
             *
             * @param {int} page_index New Page index
             * @param {jQuery} jq the container with the pagination links as a jQuery object
             */
            function pageselectCallback(page_index, jq){
				var items_per_page = 6;

				
				
				var max_elem = Math.min((page_index+1)*items_per_page,members.length)  ;           
				
				//Check the firstTimer Flag
				if(_firstTimer == true){
					/**
					 *
					 * TRUE - creates the first pagination using all the elements hidden
					 * in the hiddenTotal UL and animates the pagination and collection transition
					 */
					 $('#Searchresult').fadeOut('slow', function(){
					 console.log('função callback do fadeout do searchResults')	
					 showCollection();
					 });
					 function showCollection(){
					 	$('#Searchresult').empty();
					
						 for(var i=page_index*items_per_page;i<max_elem;i++){
							var newcontent =$('#hiddenTotal li:eq('+i+')').clone();
							$('#Searchresult').append(newcontent);
						 }
					 	$('#Searchresult').fadeIn('slow');
						console.log('função FadeIn')	
					 }
				}else{
					/**
					 *
					 * FALSE - Creates the pagination using the elements found in the resultant
					 * array from the sorting process. Animates the transition between pages and
					 * collections
					 */
					$('#Searchresult').fadeOut('slow', function(){
						console.log('função callback do fadeout do searchResults')
						
						showNewCollection();
					});
					
					function showNewCollection(){
						$('#Searchresult').empty();
						console.log('Nova Paginação');
						for(var i=page_index*items_per_page;i<max_elem;i++){
							var newcontent =$sortResults[i];
							console.log(i);
							console.log('Novo conteudo de sortResults: '+$sortResults[i].innerHTML);
							$('#Searchresult').append(newcontent);
							
						}
						$('#Searchresult').fadeIn('slow');
					}
				}
				
				return false;
            }
			
			
			/**
			 * Function to redo pagination everytime the sorting type is changed
			 * it receives the new collection of sorted elements and the new collection
			 * length and calls the the initPagination.
			 */
			function newPagination(newColl,membersLength){
				_firstTimer = false;
				//$('#Searchresult').empty();
				console.log('Ktos na func newPagination? '+membersLength)
				console.log('nova colecao: '+newColl[1]);	
					//var newcontent =newColl.('li:eq('+i+')').clone();
					//$('#Searchresult').append(newcontent);
				$sortResults = newColl;
				
				initPagination(membersLength);
			}
           
            /** 
             * Initialisation function for pagination
             */
            function initPagination(membersLength) {
				//console.log('Chamou?');
				//console.log('Ktos? '+members.length);
				if(membersLength != null) members.length = membersLength;
                $("#Pagination").pagination(members.length , {
                    callback: pageselectCallback,
                    items_per_page:6
                });
             }
            
            // When document is ready, initialize pagination
            $(document).ready(function(){ 
				members = $('#hiddenTotal li');
                initPagination();
            });
            
            
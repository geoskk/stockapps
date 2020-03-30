


$(document).ready(function(){
	
	
	
	//get symbol test
	//var url = "index.html#stock=SBIN";
	var url = window.location.href;
	var argument = url.split('#').pop().split('=').pop();
	//alert(argument)
	$( "#symbolList" ).val(argument)
	
	
  /*  
 var basket=[]; 
 
  for(var i=0;i<nseStockList.length;i++){
      optionText = nseStockList[i]; 
      optionValue = nseStockList[i]; 
      $('#symbolList').append(`<option value="${optionValue}">${optionText}</option>`); 
    }
*/
 

  $("#validate_btn").click(function(){

    var selexchange=$( "#exchange option:selected" ).text();
	//var selsymbol=$( "#symbolList option:selected" ).text();
	var selsymbol=$( "#symbolList" ).val();
    var selquantity=Number($( "#quantity" ).val());
    var seltransType=$('input[name="transType"]:checked').val();
    var selorderType=$('input[name="orderType"]:checked').val();
    var selprice=Number($( "#price" ).val());

    var orderObj={
        "exchange": selexchange,
        "tradingsymbol": selsymbol,
        "quantity": selquantity,
        "order_type": selorderType,
        "transaction_type": seltransType,
        "price": selprice
    };



   // basket.push(orderObj);

 //   console.log(basket);


    // Only run your custom code once KiteConnect has fully initialised.
    // Use KiteConnect.ready() to achieve this.
  //  KiteConnect.ready(function() {
    // Initialize a new Kite instance.
        // You can initialize multiple instances if you need.
        var kite = new KiteConnect("jhhu416s4mxu6ntg");

        //console.log(selexchange, selsymbol,selquantity,seltransType, selorderType, selprice);
        console.log(orderObj);
        kite.add(orderObj);

        // Register an (optional) callback.
        kite.finished(function(status, request_token) {
          alert("Finished. Status is " + status);
        });

        // Render the in-built button inside a given target
        //kite.renderButton("#default-button");

        // OR, link the basket to any existing element you want
        kite.link("#custom-button");
 //   });


});


});

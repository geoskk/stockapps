
	$(document).ready(function() {


		var sectorList;
		$.getJSON("assets/js/sectorscsv.json", function(result){
		sectorList=result;
			//console.log(">>>>>"+result);
            //$.each(result, function(i, field){
                //$("div").append(field.value + " ");
				//console.log(field+";;;;"+i)
            //});
        });

	

		window.initKiteTrade=function(code){
			//alert("code:"+code);
			
			
			$("#trading_symbol").val(code);
			$("#kiteOrderModal").modal();

				//alert($('#trading_symbol').val());
				//alert($('input[name=buyorsell]:checked').val());
				//alert($('#quantity_num').val());
				//alert($('input[name=marketorlimit]:checked').val());
				//alert($('#limit_price').val());
			
		
		
			$('#submitKiteOrder').click(function(){
				var trading_symbol = $('#trading_symbol').val();
				var buyorsell = $('input[name=buyorsell]:checked').val();
				var quantity_num = Number($('#quantity_num').val());
				var marketorlimit = $('input[name=marketorlimit]:checked').val();
				var limitprice = Number($('#limit_price').val());
				
				
				
				
				// Only run your custom code once KiteConnect has fully initialised.
				// Use KiteConnect.ready() to achieve this.
				//KiteConnect.ready(function() {
					// Initialize a new Kite instance.
					// You can initialize multiple instances if you need.
					var kite = new KiteConnect("dr7sx8p17908n0oa");

					// Add a stock to the basket
					kite.add({
						"exchange": "NSE",
						"tradingsymbol": trading_symbol,
						"quantity": quantity_num,
						"transaction_type": buyorsell,
						"order_type": marketorlimit,
						"price": limitprice
					});

					/* // Add another stock
					kite.add({
						"exchange": "NSE",
						"tradingsymbol": "SBIN",
						"quantity": 1,
						"order_type": "LIMIT",
						"transaction_type": "SELL",
						"price": 105
					}); */



					// Register an (optional) callback.
					kite.finished(function(status, request_token) {
						alert("Finished. Status is " + status);
					});

					/* // Render the in-built button inside a given target
					kite.renderButton("#default-button"); */

					// OR, link the basket to any existing element you want
					kite.link("#submitKiteOrder");
				//});
				
				
				
			});
			
			//$('#submitKiteOrder').modal("hide");
			//return;
			
			

		
			}
		
		


		function externalUrlStockView(){
							var selSectorValue=$("#selSector").val();
			var selSiteValue=$("#selSite").val();

		//	alert(selSiteValue.indexOf("NSE")>=0);
			//return;
			$.each(sectorList, function(valui, field){







				if(field.Sector==selSectorValue){
						//console.log(field.Sector+";;;;"+valui)


						if(selSiteValue.indexOf("Chartink")>=0){
							window.open("http://chartink.com/stocks/"+valui+".html", '_blank');
						}
						if(selSiteValue.indexOf("Trendlyne")>=0){
							window.open("https://trendlyne.com/equity/"+valui, '_blank');
						}
						if(selSiteValue.indexOf("NSE")>=0){
							window.open("https://www.nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?symbol="+valui, '_blank');
						}
						if(selSiteValue.indexOf("Screener")>=0){
							window.open("https://www.screener.in/company/"+valui, '_blank');
						}
						if(selSiteValue.indexOf("Fundata")>=0){
							window.open("https://fundata.in/Report.html?Id="+valui, '_blank');
						}
						if(selSiteValue.indexOf("Bazaartrend")>=0){
							window.open("http://www.bazaartrend.com/index.php?exchange=NSE&country=INDIA&stock="+valui, '_blank');
						}
						if(selSiteValue.indexOf("Nseguide")>=0){
							window.open("https://nseguide.com/charts.php?name="+valui, '_blank');
						}
						if(selSiteValue.indexOf("Yahoo")>=0){
							window.open("https://in.finance.yahoo.com/quote/"+valui+".NS", '_blank');
						}

					}



			});
		}


		function viewSectorStocks(){
			
			
 
 
 
			var selSectorValue=$("#selSector").val();
			$("#chart_div").html("");
			$.each(sectorList, function(data, field){
	

				if(field.Sector==selSectorValue){
					
					console.log(field.Sector+data);
					
					
					
					var context='<li>'+data+': <a target="_blank" title="TrendLyne" href="https://trendlyne.com/equity/' + data + '">TrendLyne</a>-' + '<a target="_blank" title="Chartink"  href="http://chartink.com/stocks/' + data + '.html">Chartink</a>-' + '<a target="_blank" title="Screener"  href="https://www.screener.in/company/' + data + '">Screener</a>-<a target="_blank" title="NSE"  href="https://www.nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?symbol=' + data + '">NSE</a>-<a target="_blank" title="TradingView" href="https://www.tradingview.com/chart/?symbol=NSE:' + data + '">TradingView</a>-<a target="_blank" title="Yahoo" href="https://in.finance.yahoo.com/chart/' + data + '.NS">Yahoo</a>-<a target="_blank" title="Senibull" href="https://web.sensibull.com/optionchain?tradingsymbol=' + data + '">Senibull</a>-<a title="Kite Trade" onclick="window.initKiteTrade(\''+data+'\')" >Kite</a></li>';
					
					$("#chart_div").append(context);
				} 
				});
 
		}


		//$("#load-data").click(viewStockWatch);
		//$("#load-indexdata").click(viewIndexWatch);
		$("#open-all").click(externalUrlStockView);
		
		
		
		
		
		
		$("#selSector").change( viewSectorStocks );


});

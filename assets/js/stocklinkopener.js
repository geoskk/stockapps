var getColorForPercentage = function(pct) {
		var cfac = (Math.abs(pct) / 5);
		var ccode = 0;
		if (pct < 0) ccode = 'rgba(255,0,0,' + cfac + ')';
		else ccode = 'rgba(0,255,0,' + cfac + ')';
		return ccode;
	}

var rowData;

	$(document).ready(function() {

		//Common Navigation
		//$('#navSec').load('blocks.html #navBlock');
		//$('#footerSec').load('blocks.html #footerBlock');


		//var proxyUrl = '/ba-proxy.php?url=';
		var proxyUrl = 'http://file-web.apps.us-east-1.online-starter.openshift.com/ba-proxy.php?url=';


		var sectorList;
		$.getJSON("assets/js/sectorscsv.json", function(result){
		sectorList=result;
			//console.log(">>>>>"+result);
            //$.each(result, function(i, field){
                //$("div").append(field.value + " ");
				//console.log(field+";;;;"+i)
            //});
        });

		function viewStockWatch() {
			//var contUrl = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/' + $("#stockListSelect").val() + 'StockWatch.json';
			var contUrl = 'https://beta.nseindia.com/api/equity-stockIndices?index=' + $("#stockListSelect").val();
			$.ajax({
				type: 'GET',
				//url: proxyUrl + encodeURIComponent(contUrl),
				url: proxyUrl + contUrl,
				dataType: "json",
				success: function(data) {




					//console.log(data.contents.data);

					rowData=data.contents.data;


					var newRowDataArray=[['Stock', 'Group', 'volume', 'change'],['Global',null,0,0],
										  ['Auto','Global',0,0],
										  ['Bank','Global',0,0],
										  ['Finance','Global',0,0],
										  ['Communication','Global',0,0],
										  ['Cement','Global',0,0],
										  ['Electric','Global',0,0],
										  ['FMCG','Global',0,0],
										  ['IT','Global',0,0],
										  ['Materials','Global',0,0],
										  ['Misc','Global',0,0],
										  ['Metal','Global',0,0],
										  ['Oil','Global',0,0],
										  ['Pharma','Global',0,0],
										  ['Realty','Global',0,0],
										  ['Textiles','Global',0,0],
										  ['Trading','Global',0,0],
										  ['Media','Global',0,0],
										  ['Mineral','Global',0,0],
										  ['Transport','Global',0,0],
										  ['Infra','Global',0,0]
										  ];


					for(var i=0;i<rowData.length;i++){

						var stdata=[];

						stdata.push(rowData[i].symbol)
						if(sectorList[rowData[i].symbol]!=undefined)
						stdata.push(sectorList[rowData[i].symbol].Sector)
						else
						stdata.push("Misc");
						stdata.push(Number(rowData[i].trdVol))
						stdata.push(Number(rowData[i].per))

						newRowDataArray.push(stdata);

					}


					//console.log(newRowDataArray);

		google.charts.load('current', {'packages':['treemap']});
      google.charts.setOnLoadCallback(drawChart);
	   function showStaticTooltip(row, size, value) {
		//row+" : "+size+" : "+value+" : "+
			if(row<21){
				return '<div style="background:#fd9; padding:10px; border-style:solid">'+"Symbol : "+row +"</div>";
			}else{

		  var symbol=rowData[row-21].symbol;
		   return '<div style="background:#fd9; padding:10px; border-style:solid">' +
		   '<u><a target="_blank" title="TrendLyne" href="https://trendlyne.com/equity/' + symbol + '">TrendLyne</a>' +" "+ '<a target="_blank" title="Chartink"  href="http://chartink.com/stocks/' + symbol + '.html">Chartink</a>' +" "+ '<a target="_blank" title="Screener"  href="https://www.screener.in/company/' + symbol + '">Screener</a>'+"<br>"+'<a target="_blank" title="NSE"  href="https://www.nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?symbol=' + symbol + '">NSE</a>'+" "+'<a target="_blank" title="TradingView" href="https://www.tradingview.com/chart/?symbol=NSE:' + symbol + '">TradingView</a>'+" "+'<a target="_blank" title="Yahoo" href="https://in.finance.yahoo.com/chart/' + symbol + '.NS">Yahoo</a></u>'+"<br>"+
				"Symbol : "+rowData[row-21].symbol+"<br>"+
				"Open : "+rowData[row-21].open+"<br>"+
				"High : "+rowData[row-21].high+"<br>"+
				"Low : "+rowData[row-21].low+"<br>"+
				"Last Traded Price : "+rowData[row-21].ltP+"<br>"+
				"Change value : "+rowData[row-21].ptsC+"<br>"+
				"Change % : "+rowData[row-21].per+"<br>"+
				"Traded Volume : "+rowData[row-21].trdVol+"<br>"+
				"Traded Value : "+rowData[row-21].ntP+"<br>"+
				"Monthly % : "+rowData[row-21].mPC+"<br>"+
				"Yearly % : "+rowData[row-21].yPC+"<br>"+
				"52 Week High : "+rowData[row-21].wkhi+"<br>"+
				"52 Week Low : "+rowData[row-21].wklo+"<br>"+
				 'Read more...</div>';


			}



  }

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
				KiteConnect.ready(function() {
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
				});
				
				
				
			});
			
			//$('#submitKiteOrder').modal("hide");
			//return;
			
			

		
			}
		
		
		
		
      function drawChart() {

		var dataTable = google.visualization.arrayToDataTable(newRowDataArray);


        tree = new google.visualization.TreeMap(document.getElementById('chart_div'));

        tree.draw(dataTable, {
          minColor: '#f00',
          midColor: '#ddd',
          maxColor: '#0d0',
          headerHeight: 15,
          fontColor: 'black',
          showScale: true,
		  generateTooltip: showStaticTooltip
        });

      }
				var table;
					table = $('#stockTable').DataTable({
						responsive: true,
						scrollY:        "400px",
						scrollX:        true,
						fixedColumns:   {
							leftColumns: 1
						},
						data: data.contents.data,
						"destroy": true,
						"pageLength": 250,
						columns: [
							{ data: 'symbol', title: 'Symbol'},
							{ data: 'open' , title: 'Open'},
							{ data: 'high' , title: 'High'},
							{ data: 'low' , title: 'Low'},
							{ data: 'ltP' , title: 'Last'},
							{ data: 'ptsC' , title: 'Change'},
							{ data: 'per' , title: 'Change %'},
							{ data: 'trdVol' , title: 'Vol (lacs)'},
							/*{ data: 'trdVolM' , title: 'trdVolM'}, */
							{ data: 'ntP' , title: 'Value (Crs)'},
							/*{ data: 'mVal' , title: 'Value (M)'},*/
							{ data: 'wkhi' , title: 'wkhi'},
							{ data: 'wklo' , title: 'wklo'},
							/*{ data: 'wkhicm_adj' , title: 'wkhicm_adj'},
							{ data: 'wklocm_adj' , title: 'wklocm_adj'},
							{ data: 'cAct' },*/
							{ data: 'mPC' , title: 'Month %'},
							{ data: 'yPC' , title: 'Year %'},
							{ title: 'Low %'},
							{ title: 'High %'},

							{ title: '52wk %'},
							{ title: 'Sector'}
						],
						"columnDefs": [
							/*{
								"targets": [ 0,9,11,12 ],
								"visible": false
							},		*/
							{
								"targets": [0],
								"render": function(data, type, full, meta) {
									return data + '<u><a target="_blank" title="TrendLyne" href="https://trendlyne.com/equity/' + data + '">L</a>-' + '<a target="_blank" title="Chartink"  href="http://chartink.com/stocks/' + data + '.html">c</a>-' + '<a target="_blank" title="Screener"  href="https://www.screener.in/company/' + data + '">s</a>-<a target="_blank" title="NSE"  href="https://www.nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?symbol=' + data + '">n</a>-<a target="_blank" title="TradingView" href="https://www.tradingview.com/chart/?symbol=NSE:' + data + '">t</a>-<a target="_blank" title="Yahoo" href="https://in.finance.yahoo.com/chart/' + data + '.NS">Y</a>-<a target="_blank" title="Senibull" href="https://web.sensibull.com/optionchain?tradingsymbol=' + data + '">SB</a>-<a title="Kite Trade" onclick="window.initKiteTrade(\''+data+'\')" >KT</a></u>';


									//https://www.nseindia.com/live_market/dynaContent/live_watch/option_chain/optionKeys.jsp?symbol=BANKNIFTY
									//https://in.finance.yahoo.com/chart/SBIN.NS

									//https://kite3.zerodha.com/ext/chart/NSE/ICICIBANK/1270529

									//<a rel="popover" data-img="http://stockcharts.com/c-sc/sc?s=VEDL.IN&p=D&b=5&g=0&i=0&">Image 1</a>
								}
							}, {
								"targets": [6],
								"render": function(data, type, full, meta) {
									return '<span style="background:' + getColorForPercentage(data) + '">' + data + '</span>';
								}
							}, {
								"targets": [13],
								"render": function(data, type, full, meta) {
									var openv = Number(full.open.replace(',', ''));
									var lowv = Number(full.low.replace(',', ''));
									var val = (((lowv - openv) / openv) * 100).toFixed(2);
									return '<span style="background:' + getColorForPercentage(val) + '">' + val + '</span>';
								}
							}, {
								"targets": [14],
								"render": function(data, type, full, meta) {
									var openv = Number(full.open.replace(',', ''));
									var highv = Number(full.high.replace(',', ''));
									var val = (((highv - openv) / openv) * 100).toFixed(2);
									return '<span style="background:' + getColorForPercentage(val) + '">' + val + '</span>';
								}
							}, {
								"targets": [15],
								"render": function(data, type, full, meta) {
									var wkhiv = Number(full.wkhi.replace(',', ''));
									var wklov = Number(full.wklo.replace(',', ''));
									var wklast = Number(full.ltP.replace(',', ''));
									var val = (((wklast - wklov) / (wkhiv - wklov)) * 100).toFixed(2);
									//console.log(wkhiv, wklov, wklast, val);
									return '<span>' + val + '</span>';
								}
							}, {
								"targets": [16],
								"render": function(data, type, full, meta) {
									/*Sector Data*/

									if((sectorList[full.symbol]) == undefined){
										return '<span>' + "--" + '</span>';
									}else{
										return '<span>' + sectorList[full.symbol].Sector + '</span>';
									}

								}
							}
						]
					});
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert(textStatus)
						// error_fn(jqXHR, textStatus, errorThrown);
				}
			});


		}





		function viewIndexWatch() {
			var contUrl = 'https://www.nseindia.com/live_market/dynaContent/live_watch/stock_watch/liveIndexWatchData.json';
			$.ajax({
				type: 'GET',
				url: proxyUrl + encodeURIComponent(contUrl),
				dataType: "json",
				success: function(data) {
					var indextable = $('#indexTable').DataTable({
						responsive: true,
						scrollY:        "400px",
						scrollX:        true,
						fixedColumns:   {
							leftColumns: 1
						},
						data: data.contents.data,
						"destroy": true,
						"pageLength": 250,
						columns: [


						/*{"timeVal":"Nov 24, 2017 15:32:24","indexName":"NIFTY 50","previousClose":"10,348.75","open":"10,366.80","high":"10,404.50","low":"10,362.25","last":"10,389.70","percChange":"0.40","yearHigh":"10,490.45","yearLow":"7,893.80","indexOrder":"0.00"},*/


							{ data: 'indexName', title: 'indexName'},
							{ data: 'previousClose' , title: 'previousClose'},
							{ data: 'open' , title: 'open'},
							{ data: 'high' , title: 'high'},
							{ data: 'low' , title: 'low'},
							{ data: 'last' , title: 'last'},
							{ data: 'percChange' , title: 'percChange %'},
							{ data: 'yearHigh' , title: 'yearHigh'},
							{ data: 'yearLow' , title: 'yearLow'},
							{ data: 'indexOrder' , title: 'indexOrder'},

						],
						"columnDefs": [
							{
								"targets": [6],
								"render": function(data, type, full, meta) {
									return '<span style="background:' + getColorForPercentage(data) + '">' + data + '</span>';
								}
							}
						]
					});
				},
				error: function(jqXHR, textStatus, errorThrown) {
					alert(textStatus)
						// error_fn(jqXHR, textStatus, errorThrown);
				}
			});
		}






function viewLiveAnalyze(eve){


 var contUrl="";
contUrl='https://www.nseindia.com/live_market/dynaContent/live_analysis/'+$( "#"+eve.target.id ).val();

	//alert(contUrl);

				function makeKeyArray(arr){

				var objArr=[];

				for(var i=0;i<arr.length;i++){
				objArr[i]={ data: arr[i], title: arr[i]};
				}
				return objArr;
				}
		$.ajax({
		   type: 'GET',
		   url:proxyUrl+encodeURIComponent(contUrl),
		   dataType: "json",

		   success: function(xdata){
		   var dataArr=xdata.contents.data;
		   var keysArr=Object.keys(dataArr[0]);
		   var table;
		  table =  $('#fnostocksTable').DataTable( {
				data: dataArr,
				"destroy": true,
				"pageLength": 250,
				columns: makeKeyArray(keysArr),

				"columnDefs": [
						{
					"targets": [ 0 ],
					"render": function ( data, type, full, meta ) {
						  return data+'<u><a target="_blank" title="Google Finance" href="https://www.google.com/finance?q=NSE%3A'+data+'">g</a>|'+'<a target="_blank" title="Chartink"  href="http://chartink.com/stocks/'+data+'.html">c</a>|'+'<a target="_blank" title="Screener"  href="https://www.screener.in/company/'+data+'">s</a>|<a target="_blank" title="NSE"  href="https://www.nseindia.com/live_market/dynaContent/live_watch/get_quote/GetQuote.jsp?symbol='+data+'">n</a></u>';
					}
				  }

				]



			} );



		   },
		   error: function(jqXHR, textStatus, errorThrown) {
			alert(textStatus)
			  // error_fn(jqXHR, textStatus, errorThrown);
		   }
		});
}

          //viewLiveAnalyze();
	$( "#liveAnalySelect" ).change( viewLiveAnalyze );
	$( "#liveOptionSelect" ).change( viewLiveAnalyze );





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
		


		$("#load-data").click(viewStockWatch);
		$("#load-indexdata").click(viewIndexWatch);
		$("#open-all").click(externalUrlStockView);
		
		
		
		
		
		
		$("#selSector").change( viewSectorStocks );


});

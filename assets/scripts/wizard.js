(function($){
	init = function() {
		chunk("init");
  	};

  	chunk = function(chunkState) {
		var nodeList = $(".wizard-ctrl ul li");
		var nodeCount = $(nodeList).length;
		var nodeContainerWidth = $('.wizard-ctrl').width()- ( (nodeCount - 2 ) * 10 + 10 );
		var nodeWidth = (Math.floor(nodeContainerWidth/nodeCount) < 68) ? 68 : Math.floor(nodeContainerWidth/nodeCount)
		var nodeCols = Math.floor(nodeContainerWidth/nodeWidth);
		var nodeToPackCount = nodeCount - nodeCols;
        var packSide = "none";
        var isExpand = false;

        // Determine which state we are in
		if(chunkState === "init"){
			isExpand = false;
		}
		if(chunkState === "resize"){
			isExpand = false;
		}
		if(chunkState === "expand"){
			isExpand = true;
		}

		// Determine pack side
		packSide = isNodePackedState(nodeCount, nodeCols, isExpand);			

		// Reset widths and attributes of each node
		setBaseWidths(nodeCount, nodeList, nodeWidth);

		// Pack nodes
		pack(nodeList, nodeWidth, nodeCount, nodeToPackCount, packSide);		
	};


	setBaseWidths = function(nodeCount, nodeList, nodeWidth) {
		// Set widths for all nodeCols / reset padding / visibility
	    for (i=0; i<nodeCount; i++) { 
	        $(nodeList).eq(i).css("width", nodeWidth + "px");

	        if(i === 0){
	        	$(nodeList).eq(i).css("padding-right", "5px");
	        } else if(i === (nodeCount - 1)){
	        	$(nodeList).eq(i).css("padding-left", "5px");
	        } else {
	        	$(nodeList).eq(i).css("padding-left", "5px");
	        	$(nodeList).eq(i).css("padding-right", "5px");
	        }

	        // Reset hidden text
	        $(nodeList).eq(i).children(".node-text").css("visibility", "visible");   	        
	    }
	};	


	pack = function(nodeList, nodeWidth, nodeCount, nodeToPackCount, packSide) {
		var leftOvers = (nodeToPackCount * (nodeWidth - 36) );
		var halfLeftOvers = Math.floor(leftOvers/nodeToPackCount + 2);
        var packedWidth = 9;

		if( nodeToPackCount > 0 ){
		    for (i=0; i < nodeToPackCount; i++) { 
		        var nodeIndex = 0;

		        // Calculate nodeIndex value
		    	if(packSide === "right"){ 
		    		nodeIndex = nodeCount - 2 - i;
		    	}

		    	if(packSide === "left"){ 
		    		nodeIndex = i;
		    	}

		        // Adjust item width/styling
		        $(nodeList).eq(nodeIndex).css("width", packedWidth + "px");
		    	$(nodeList).eq(nodeIndex).css("padding-left", "0");
		    	$(nodeList).eq(nodeIndex).css("padding-right", "0");

		        // Hide text
		        $(nodeList).eq(nodeIndex).children(".node-text").css("visibility", "hidden");

		        // Buffer out the right or left packs to make up for the px's we lose on shrink
				if(packSide === "right"){ 
				    if(i === nodeToPackCount){
				    	$(nodeList).eq(nodeIndex).css("padding-left", halfLeftOvers + "px");
				    }
				    if(i === 0){
				        $(nodeList).eq(nodeIndex).css("padding-right", halfLeftOvers + "px");
				    }		    	
				}
				if(packSide === "left"){ 
				    if(i === nodeToPackCount){
				    	$(nodeList).eq(nodeIndex).css("padding-right", (halfLeftOvers * 2) + "px");
				    }
				}
		    }

		    if(packSide === "right"){ 
				for (i=0; i < nodeCount; i++) { 
					var firstPackNode = isNodePacked( (nodeList).eq(i).find('div[id^="node-"]') );
					if( firstPackNode ){
						var firstPackNodeOffset = (nodeList).eq(i).offset();
						$(".clickToExpand").css("left", firstPackNodeOffset.left - 470).show();
						i = nodeCount;
					}
				}
			} else {
				$(".clickToExpand").css("left", "0").show();
			}
		} else {
			$(".wizard-ctrl .clickToExpand").hide();
		}
	};


	isNodePacked = function(clickedNode) {
		var packState = false;
		var isVisible = clickedNode.parent("li").children(".node-text").attr("style");

		if(typeof isVisible !== "undefined"){
			if(isVisible.indexOf("hidden") > -1){
				packState = true;
			} else {
				packState = false;
			}

		} else {
			packState = false;
		}

        return packState;
	};	


	isNodePackedState = function(nodeCount, nodeCols, isExpand) {
		var packState = "none";
		var anyPackedNodes = false;
		var isNodeOnePacked = isNodePacked($("#node-1"));
		
		if(isExpand === true){
			if(isNodeOnePacked === true){
				packState = "right";
			} else {
				packState = "left";
			}
		} else {
			if(nodeCount > nodeCols ){
				anyPackedNodes = true;
			}
			if(anyPackedNodes === true){
				if(isNodeOnePacked === true){
					packState = "left";
				} else {
					packState = "right";
				}
			}
		}

        return packState;
	};	

})(jQuery);
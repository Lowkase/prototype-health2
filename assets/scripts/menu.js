(function($){
	menu = function(selectedNode) {
        var nodeString = selectedNode.attr('id');
        var nodeDash = nodeString.indexOf("-");
        var nodeNum = nodeString.slice(nodeDash + 1, nodeString.length );
        var node = "#nodemenu-" + nodeNum; 

        var windowWidth = $( window ).width();
        var visitOffset = 470;
        var menu = $(".m-node-menu");
        var nodeTriangle = $(".wizard-ctrl .triangle");
        var nodeOffset = selectedNode.offset();   
        var nodeOffsetLeft = nodeOffset.left;


        // Check if menu already open
        if ( $(node).is(':visible') && ( ! isMenuHorizonal() ) ) {
            // Hide menu and triangle
            $(nodeTriangle).hide();
            $(node).hide();                
        } else {
            // Remove styling from menu and triangle
            $(menu).hide().removeAttr("style");
            $(nodeTriangle).hide().removeAttr("style");

            // Calculate menu position
            if ( isMenuHorizonal() ) {
                // Hide ul / show m-owl
                menu.find("ul").hide();
                menu.find(".m-owl").show();

                $(node).css("left", "10px");
            } else {
                // Show ul / hide m-owl
                menu.find("ul").show();
                menu.find(".m-owl").hide();

                // Determine if the width of the menu (200px) will overflow the viewport
                if( nodeOffsetLeft + 200 >= windowWidth ){
                    $(node).css("left", (windowWidth - visitOffset - 210) + "px");
                } else {
                    $(node).css("left", (nodeOffsetLeft - visitOffset) + "px");
                }
            }

            // Calculate triangle postion
            $(nodeTriangle).css("left", (nodeOffsetLeft - visitOffset) + "px");

            // Show menu and triangle
            $(nodeTriangle).show();
            $(node).show();

            // Selected node gets the highlight
            $(".node").removeClass("node-selected");
            $(selectedNode).addClass("node-selected");
        }
    };

    menuReset = function() {
        // If horizonal showing then don't close + reposition layout
        if ( isMenuHorizonal() ) {
            $(".form").css("top", "180px");
        } else {
            $(".form").css("top", "110px");
            $(".m-node-menu").hide();
            $(".wizard-ctrl .triangle").hide();            
        }
    };

    isMenuHorizonal = function(){
        var currentMenu = $(".m-node-menu");
        var menuHorizontal = $(".m-node-menu-horizontal");
        var result = false; 
        if ( currentMenu.is(menuHorizontal) ) {
            result = true;
        } else {
            result = false;
        }

        return result;
    }

})(jQuery);
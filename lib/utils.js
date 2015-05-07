"use strict";

var Utils = {
	parseMCFormatCodes: function(name) {
		var spancount = name.split("§").length - 1;
		name = name.replace(/§0/g, "<span style=\"color:#000000;\">");
		name = name.replace(/§1/g, "<span style=\"color:#0000AA;\">");
		name = name.replace(/§2/g, "<span style=\"color:#00AA00;\">");
		name = name.replace(/§3/g, "<span style=\"color:#00AAAA;\">");
		name = name.replace(/§4/g, "<span style=\"color:#AA0000;\">");
		name = name.replace(/§5/g, "<span style=\"color:#AA00AA;\">");
		name = name.replace(/§6/g, "<span style=\"color:#FFAA00;\">");
		name = name.replace(/§7/g, "<span style=\"color:#AAAAAA;\">");
		name = name.replace(/§8/g, "<span style=\"color:#555555;\">");
		name = name.replace(/§9/g, "<span style=\"color:#5555FF;\">");
		name = name.replace(/§a/g, "<span style=\"color:#55FF55;\">");
		name = name.replace(/§b/g, "<span style=\"color:#55FFFF;\">");
		name = name.replace(/§c/g, "<span style=\"color:#FF5555;\">");
		name = name.replace(/§d/g, "<span style=\"color:#FF55FF;\">");
		name = name.replace(/§e/g, "<span style=\"color:#FFFF55;\">");
		name = name.replace(/§f/g, "<span style=\"color:#FFFFFF;\">");
		name = name.replace(/§k/g, "<span>");
		name = name.replace(/§l/g, "<span style=\"font-weight: bold;\">");
		name = name.replace(/§m/g, "<span style=\"text-decoration: line-through;\">");
		name = name.replace(/§n/g, "<span style=\"text-decoration: underline;\">");
		name = name.replace(/§o/g, "<span style=\"font-style: italic;\">");
		name = name.replace(/§r/g, "<span style=\"font-style: normal; text-decoration: none; font-weight: normal; color:#000000;\">");
		name = name.replace(/§/g, "<span>");
		for ( var i = 0; i < spancount; i++ ) name = name + "</span>";
		return name;
	},
	formatHost: function(server){
		var hostarray = server.host.split(/:/g);
		if (hostarray.length > 1){
			if (hostarray.length === 2){
				server.host = hostarray[0];
				server.port = hostarray[1];
			}else{
				console.log("Configuration error: Invalid host (" + server.host + "). Too many \":\", using default \"0.0.0.0\". ");
				server.host = "0.0.0.0";
			}
		}
		return server;
	},
	isIP: function(string){
		return !isNaN(parseInt(string.substring(0,1)));
	}
};

module.exports = Utils;
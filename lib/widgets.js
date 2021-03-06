"use strict";

var Widgets = { },

	NodeBB = require('./nodebb'),
	Utils  = require('./utils'),
	Config = require('./config'),

	async = require('async');

Widgets['chat']          = require('./widgets/chat');
Widgets['directory']     = require('./widgets/directory');
Widgets['gallery']       = require('./widgets/gallery');
Widgets['map']           = require('./widgets/map');
Widgets['ping-graph']    = require('./widgets/ping-graph');
Widgets['players-graph'] = require('./widgets/players-graph');
Widgets['players-grid']  = require('./widgets/players-grid');
Widgets['status']        = require('./widgets/status');
Widgets['top-graph']     = require('./widgets/top-graph');
Widgets['top-list']      = require('./widgets/top-list');
Widgets['tps-graph']     = require('./widgets/tps-graph');

Widgets.renderChat         = function (widget, callback) { render("chat", widget, callback); };
Widgets.renderDirectort    = function (widget, callback) { render("directory", widget, callback); };
Widgets.renderGallery      = function (widget, callback) { render("gallery", widget, callback); };
Widgets.renderMap          = function (widget, callback) { render("map", widget, callback); };
Widgets.renderPingGraph    = function (widget, callback) { render("ping-graph", widget, callback); };
Widgets.renderPlayersGraph = function (widget, callback) { render("players-graph", widget, callback); };
Widgets.renderPlayersGrid  = function (widget, callback) { render("players-grid", widget, callback); };
Widgets.renderStatus       = function (widget, callback) { render("status", widget, callback); };
Widgets.renderTopGraph     = function (widget, callback) { render("top-graph", widget, callback); };
Widgets.renderTopList      = function (widget, callback) { render("top-list", widget, callback); };
Widgets.renderTPSGraph     = function (widget, callback) { render("tps-graph", widget, callback); };

function formatWidget(widget, callback) {
	if (widget.data.sid === void 0 || isNaN(parseInt(widget.data.sid, 10)) || parseInt(widget.data.sid, 10) < 0) {
		console.log('Invalid sid: ' + widget.data.sid);
		return callback("error", '');
	}

	// Temp
	widget.data.isServerOnline = true;

	widget.data.parseFormatCodes = widget.data.parseFormatCodes == "on" ? true : false;
	widget.data.url              = Config.getAvatarUrl();

	async.parallel({
		status: async.apply(NodeBB.db.getObject, "mi:server:" + widget.data.sid),
		config: function (next) {
			next(null, Config.settings.get('servers.' + widget.data.sid));
		}
	}, function (err, payload) {
		if (err || !payload.status || !payload.config) return callback(err, '');

		widget.data.status  = payload.status;
		widget.data.config  = payload.config;

		widget.data.name	= widget.data.parseFormatCodes ? Utils.parseMCFormatCodes(payload.config.name) : payload.config.name;
		widget.data.address	= payload.config.address;
		widget.data.motd    = widget.data.parseFormatCodes ? Utils.parseMCFormatCodes(payload.status.motd) : payload.status.motd;

		widget.data.title = widget.data.title.replace(/\{\{motd\}\}/, widget.data.motd);
		widget.data.title = widget.data.title.replace(/\{\{name\}\}/, widget.data.name);
		widget.data.container = widget.data.container.replace(/\{\{motd\}\}/, widget.data.motd);
		widget.data.container = widget.data.container.replace(/\{\{name\}\}/, widget.data.name);

		callback(null, widget.data);
	});
}

function render(type, widget, callback) {
	formatWidget(widget, function (err, data) {
		if (err) return callback(null, data);

		Widgets[type].render(data, function (err, data) {
			if (err) return callback(err, data);

			NodeBB.app.render('widgets/' + type, data, function(err, html) {
				NodeBB.translator.translate(html, function(translatedHTML) {
					callback(err, translatedHTML);
				});
			});
		});
	});
}

module.exports = Widgets;

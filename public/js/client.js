"use strict";

__MIDIR = "/plugins/nodebb-plugin-minecraft-integration/public/";

MinecraftIntegration = { };

socket.on('mi.ping', function (data) {
	console.log("I got a ping! I feel special!");
	console.log(data);

	// Update Players
	console.log('Getting avatar template');
	$.get(__MIDIR + '/templates/partials/playerAvatars.tpl' + "?v=" + config['cache-buster'], function(avatarTemplate) {
		console.log('Got avatar template');
		$('[data-widget="mi-status"][data-sid="' + data.sid + '"]').each(function(i, $widget){
			console.log('Found Widget');
			$widget = $($widget);
			if (data.players) {
				try {
					data.players = JSON.parse(data.players);
				}catch (e){
					data.players = [ ];
				}
				console.log('Found Players');
				$widget.find('.mi-avatar').each(function (i, el) {
					console.log('Found Player: ' + $(el).data('original-title'));
					if (data.players.indexOf($(el).data('original-title')) < 0) {
						$(el).fadeToggle(600, 'linear', function(){
							$(el).remove();
						});
					}
				});

				for (var i in data.players) {
					if (!$widget.find('.mi-avatar[data-original-title="' + data.players[i] + '"]').length) {
						// Temp
						var $avatar = $($.parseHTML('<img src="http://cravatar.eu/avatar/{player}/40" class="mi-avatar" style="display:none;border-style:solid;border-width:6px;border-radius:4px;border-color:black;" data-original-title="{player}"/>'.replace(/\{player\}/g, data.players[i])));
						$avatar.appendTo($widget.find('.avatars'));
						$avatar.fadeToggle(600, 'linear');
					}
				}
			}
		});
	});
});

define('admin/plugins/minecraft-integration', function () {
	MinecraftIntegration.init = function () {
		require([__MIDIR + 'js/acp.js'], function (miACP) {
			miACP.load();
		});
	};

	return MinecraftIntegration;
});

$(document).ready(function() {
	var $body = $('body');
	$body.tooltip({
		selector: '.has-tooltip, .mi-avatar',
		container: 'body'
	});
	$body.popover({
		selector: '.has-popover',
		container: 'body'
	});
});

var rtime = new Date(1, 1, 2000, 12,00,00);
var timeout = false;
var delta = 300;
$(window).resize(function() {
	rtime = new Date();
	if (timeout === false) {
		timeout = true;
		setTimeout(resizeend, delta);
	}
});

function resizeend() {
	if (new Date() - rtime < delta) {
		setTimeout(resizeend, delta);
	} else {
		timeout = false;
		resizeCanvases();
	}
}

function resizeCanvases() {
	if (typeof Chart == 'undefined') {
		require(['/vendor/chart.js/chart.min.js'], function(Chart){
			$('.canvasResizable').each(function(i, e){
				var heightRatio = $(e).attr('height-ratio');
				heightRatio = typeof heightRatio == 'undefined' ? 3 : parseInt(heightRatio);
				heightRatio = isNaN(heightRatio) ? 3 : heightRatio < 1 ? 3 : heightRatio;
				$(e).attr('width', $(e).parent().width());
				$(e).attr('height', $(e).parent().width() / heightRatio);
				$(e).css('width', $(e).parent().width());
				$(e).css('height', $(e).parent().width() / heightRatio);
				var data = window[$(e).attr('id') + 'Data'];
				var options = window[$(e).attr('id') + 'Options'];
				switch ($(e).attr('chart-type')) {
					case "Pie":
					case "pie":
						new Chart($(e)[0].getContext('2d')).Pie(data, options);
						break;
					case "Donut":
					case "donut":
						new Chart($(e)[0].getContext('2d')).Pie(data, options);
						break;
					case "Line":
					case "line":
					default:
						new Chart($(e)[0].getContext('2d')).Line(data, options);
						break;
				}
			});
			var Chartjs = Chart.noConflict();
		});
	}

	$('.mcweIFrame').each(function(){
		var heightRatio = $(this).attr('height-ratio');
		heightRatio = typeof heightRatio == 'undefined' ? 2 : parseInt(heightRatio);
		heightRatio = isNaN(heightRatio) ? 2 : heightRatio < 1 ? 2 : heightRatio;
		$(this).attr('width', $(this).parent().width());
		$(this).attr('height', $(this).parent().width() / heightRatio);
		$(this).css('width', $(this).parent().width());
		$(this).css('height', $(this).parent().width() / heightRatio);
	});
}

$(window).on('action:widgets.loaded', function (event, data) {
    $('.mi-container').each(function(index){
		var parent = $(this).parent();
		if (!$(parent).prop('widget-area')) {
			$(parent).css('padding-top', '0').css('padding-left', '0').css('padding-right', '0').css('padding-bottom', '0');
		}
	});
	resizeCanvases();

	$('.mcwe-widget-status, .mcwe-widget-minimap').each(function(){
		var $widget = $(this);
		$widget.find('h3').css('max-width', '90%');
		$widget.find('>.panel').prepend('<i style="position:relative;right:6px;top:6px;font-size:22px;" class="fa fa-compass pointer pull-right has-tooltip mcwe-modalmapicon" data-title="Open Map" data-toggle="modal" data-target="#mcwe-modal-'+ $widget.data('mcwe-mid') +'" style="font-size: 20px;"></i>');
	});
});

$(window).on('action:ajaxify.end', function (event, url) {
	url = url.url.split('?')[0].split('#')[0];

	console.log('ajaxify.end: ' + url);

	function formatTitle($panel) {
		var $title = $panel.find('>.panel-heading strong'),
			title = $panel.find('>.panel-body [name="title"]').val();

		if (!title) {
			$title.html($title.text().split(' - ')[0]);
			return;
		}

		title = title.replace(/\{\{motd\}\}/g, $panel.data('motd'));
		title = title.replace(/\{\{name\}\}/g, $panel.data('name'));
		title = title.replace(/[§&][0123456789abcdefklmnor]/g, '');

		$title.html($title.text().split(' - ')[0] + ' - ' + title);
	}

	function initACPWidgets() {
		var IDcounter = 1;

		$('.widget-area').on('mouseup', '> .panel > .panel-heading', function (e) {
			var $heading = $(this),
				$panel = $heading.parent(),
				$body = $heading.next(),
				widget = $panel.data('widget');

			if ($(this).parent().is('.ui-sortable-helper') || $(e.target).closest('.delete-widget').length) return;

			switch (widget) {
				case 'widgetMCServerStatus':
					return (function () {
						if ( !$body.hasClass('mcwe-ajaxed') ) {
							$body.addClass('mcwe-ajaxed');

							$.get('/api/minecraft-integration/server/' + $body.find('[name="sid"]').val() + "?v=" + config['cache-buster'], function (server) {
								if (server && server.motd && server.name) {
									$panel.data('motd', server.motd);
									$panel.data('name', server.name);
									formatTitle($panel);
								}else{
									$panel.data('motd', '');
									$panel.data('name', '');
								}

								$body.find('[name="title"]').on('input', function (e) {
									formatTitle($panel);
								});

								$body.find('input.ajaxSelectSibling').each(function(index){
									var MCWESN = $(this);
									if (MCWESN.val()) {
										MCWESN.prev().val($(this).val());
									}else{
										var first = MCWESN.prev().find('option:first'),
											selected = MCWESN.prev().find('option:selected');
										if (selected) {
											MCWESN.val( selected.val() );
										}else{
											if (first) {
												MCWESN.val( first.val() );
												MCWESN.prev().val( first.val() );
											}
										}
									}
									MCWESN.prev().on('change', function(){
										MCWESN.val($(this).val());
									});
								});
								$body.find('input.ajaxInputColorPicker').each(function(index){
									if ($(this).val() === '') $(this).val('000000');
									var MCWECP = $(this);
									var id = 'ajaxInputColorPicker' + IDcounter;
									MCWECP.attr('id',id);
									$('#'+id).ColorPicker({
										color: MCWECP.val() || '#000000',
										onChange: function(hsb, hex) {
											MCWECP.val(hex);
											MCWECP.css('color', '#' + hex);

											if(MCWECP.is('[preview]')) {
												MCWECP.parents('.panel-body').find('.mcWidgetPreview').find(MCWECP.attr('preview')).each(function(){$(this).css('color', '#' + MCWECP.val())});
											}
										},
										onShow: function(colpkr) {
											$(colpkr).css('z-index', 1051);
										}
									}).css('color', '#' + $(this).val()).bind('keyup', function(){
										$(this).ColorPickerSetColor($(this).val());
										$(this).css('color', '#' + $(this).val());
									});
									if(MCWECP.is('[preview]')) {
										MCWECP.parents('.panel-body').find('.mcWidgetPreview').find(MCWECP.attr('preview')).each(function(){$(this).css('color', '#' + MCWECP.val())});
									}
									IDcounter++;
								});
							});
						}
					}());
			}
		});
	};

	switch (url) {
		case 'admin/extend/widgets':
			return initACPWidgets();
	}
});

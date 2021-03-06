<div class="mi-container" data-widget="mi-status" data-sid="{sid}">
    <table class="table widget-table">
        <tbody>
            <!-- IF showMOTD -->
            <tr>
                <td class="td-label" colspan="2">
                    <span<!-- IF colorMOTD --> style="color:#{colorMOTD}"<!-- ENDIF colorMOTD -->>
                        {motd}
                    </span>
                </td>
            </tr>
            <!-- ENDIF showMOTD -->

            <!-- BEGIN customaftername -->
            <tr>
                <td class="td-label">
                    <span<!-- IF colorLabels --> style="color:#{colorLabels}"<!-- ENDIF colorLabels -->>
                        <strong>{customaftername.label}</strong>
                    </span>
                </td>
                <td>
                    <span<!-- IF colorText --> style="color:#{colorText}"<!-- ENDIF colorText -->>
                        {customaftername.text}
                    </span>
                </td>
            </tr>
            <!-- END customaftername -->

            <tr>
                <td class="td-label">
                    <span<!-- IF colorLabels --> style="color:#{colorLabels}"<!-- ENDIF colorLabels -->>
                        <strong>Status</strong>
                    </span>
                </td>
                <td>
                    <span<!-- IF colorText --> style="color:#{colorText}"<!-- ENDIF colorText -->>
                    <!-- IF isServerOnline -->
                        <a class="fa fa-check-circle text-success has-tooltip" data-placement="top" data-title="Pinged server at {serverIP}:{serverPort}"></a>&nbsp;<strong><span class="text-success">Online</span></strong><!-- IF showPlayerCount -->&nbsp;(<span class="online-players">{onlinePlayers}</span>/<span class="max-players">{maxPlayers}</span>)<!-- ENDIF showPlayerCount -->
                    <!-- ENDIF isServerOnline -->
                    <!-- IF isServerOffline -->
                        <a class="fa fa-exclamation-circle text-danger has-tooltip" data-placement="top" data-title="Pinged server at {serverIP}:{serverPort}"></a>&nbsp;<strong><span class="text-danger">Offline</span></strong>
                    <!-- ENDIF isServerOffline -->
                    <!-- IF isServerRestarting -->
                        <a class="fa fa-question-circle text-info has-tooltip" data-placement="top" data-title="Pinged server at {serverIP}:{serverPort}"></a>&nbsp;<strong><span class="text-info">Restarting</span></strong>
                    <!-- ENDIF isServerRestarting -->
                    </span>
                </td>
            </tr>

            <!-- BEGIN customafterstatus -->
            <tr>
                <td class="td-label">
                    <span<!-- IF colorLabels --> style="color:#{colorLabels}"<!-- ENDIF colorLabels -->>
                        <strong>{customafterstatus.label}</strong>
                    </span>
                </td>
                <td>
                    <span<!-- IF colorText --> style="color:#{colorText}"<!-- ENDIF colorText -->>
                        {customafterstatus.text}
                    </span>
                </td>
            </tr>
            <!-- END customafterstatus -->

            <tr>
                <td class="td-label">
                    <span<!-- IF colorLabels --> style="color:#{colorLabels}"<!-- ENDIF colorLabels -->>
                        <strong>Address</strong>
                    </span>
                </td>
                <td>
                    <span<!-- IF colorText --> style="color:#{colorText}"<!-- ENDIF colorText -->>
                        {address} <!-- IF showIP -->[{host}<!-- IF port -->:{port}<!-- ENDIF port --><!-- ENDIF showIP --><!-- IF showIP -->]<!-- ENDIF showIP -->
                    </span>
                </td>
            </tr>

            <!-- BEGIN customafteraddress -->
            <tr>
                <td class="td-label">
                    <span<!-- IF colorLabels --> style="color:#{colorLabels}"<!-- ENDIF colorLabels -->>
                        <strong>{customafteraddress.label}</strong>
                    </span>
                </td>
                <td>
                    <span<!-- IF colorText --> style="color:#{colorText}"<!-- ENDIF colorText -->>
                        {customafteraddress.text}
                    </span>
                </td>
            </tr>
            <!-- END customafteraddress -->

            <!-- IF showVersion -->
            <tr>
                <td class="td-label">
                    <span<!-- IF colorLabels --> style="color:#{colorLabels}"<!-- ENDIF colorLabels -->>
                        <strong>Version</strong>
                    </span>
                </td>
                <td>
                    <span<!-- IF colorText --> style="color:#{colorText}"<!-- ENDIF colorText -->>
                        {version}

                        <!-- IF hasMods -->&nbsp;<a class="fa fa-cog text-info has-popover" data-html="true" data-title="<h6><b>Mod List</b></h6>" data-placement="bottom"<!-- ENDIF hasMods --><!-- BEGIN modList -->{modList.modid}<!-- IF @first -->   data-content="&lt;h6&gt;<!-- ENDIF @first --><!-- IF @last -->&lt;/h6&gt;"<!-- ELSE --><!-- IF !@first -->, <!-- ENDIF !@first --><!-- ENDIF @last --><!-- END modList --><!-- IF hasMods -->></a><!-- ENDIF hasMods -->

                        <!-- IF hasPlugins --> <a class="fa fa-plug text-info has-popover" data-html="true" data-title="<h6><b>[[plugin_list]]</b></h6>" data-placement="bottom"></a><!-- ENDIF hasPlugins -->
                    </span>
                </td>
            </tr>
            <!-- ENDIF showVersion -->

            <!-- BEGIN customafterversion -->
            <tr>
                <td class="td-label">
                    <span<!-- IF colorLabels --> style="color:#{colorLabels}"<!-- ENDIF colorLabels -->>
                        <strong>{customafterversion.label}</strong>
                    </span>
                </td>
                <td>
                    <span<!-- IF colorText --> style="color:#{colorText}"<!-- ENDIF colorText -->>
                        {customafterversion.text}
                    </span>
                </td>
            </tr>
            <!-- END customafterversion -->

            <!-- IF showAvatars -->
            <tr>
                <td class="td-label">
                    <span<!-- IF colorLabels --> style="color:#{colorLabels}"<!-- ENDIF colorLabels -->>
                        <strong>Players</strong>
                    </span>
                </td>
                <td class="avatars">
                </td>
            </tr>
            <!-- ENDIF showAvatars -->

            <!-- BEGIN customafterplayers -->
            <tr>
                <td class="td-label">
                    <span<!-- IF colorLabels --> style="color:#{colorLabels}"<!-- ENDIF colorLabels -->>
                        <strong>{customafterplayers.label}</strong>
                    </span>
                </td>
                <td>
                    <span<!-- IF colorText --> style="color:#{colorText}"<!-- ENDIF colorText -->>
                        {customafterplayers.text}
                    </span>
                </td>
            </tr>
            <!-- END customafterplayers -->

        </tbody>
    </table>
    <!-- IF showMiniMap -->
    <iframe class="mi-iframe" src="{minimapURI}" height-ratio="2"></iframe>
    <!-- ENDIF showMiniMap -->
    <!-- IF mapURI -->
    <!-- IMPORT partials/modalMap.tpl -->
    <!-- ENDIF mapURI -->
</div>

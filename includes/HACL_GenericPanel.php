<?php
/* 
 * B2browse Group
 * patrick.hilsbos@b2browse.com
 */

/**
 * Description of HACL_GenericPanel
 *
 * @author hipath
 */
class HACL_GenericPanel {

    private $saved = false;
    private $header;
    private $footer;
    private $content;


    function __construct($panelid, $name="") {

        $this->header = <<<HTML
	<!-- start of panel div-->
	<div id="$panelid" class="panel haloacl_panel">
		<!-- panel's top bar -->
		<div id="title_$panelid" class="panel haloacl_panel_title">
			<span class="haloacl_panel_expand-collapse">
				<a href="javascript:YAHOO.haloacl.togglePanel('$panelid');"><div id="exp-collapse-button_$panelid" class="haloacl_panel_button_collapse"></div></a>
			</span>
                        <div class="haloacl_panel_nameDescr">
                            <span id="haloacl_panel_name_$panelid" class="panel haloacl_panel_name">Right</span>
                            <span id="haloacl_panel_descr_$panelid" class="panel haloacl_panel_descr"></span>
                        </div>
                        <div class="haloacl_panel_statusContainer">
                            <span id="haloacl_panel_status_$panelid" class="haloacl_panel_status_notsaved">Not Saved</span>
                        </div>
			<span class="button haloacl_panel_close">
				<a href="javascript:YAHOO.haloacl.removePanel('$panelid');"><div id="close-button_$panelid" class="haloacl_panel_button_close"></div></a>
			</span>
		</div>
		<!-- end of panel's top bar -->
HTML;

        $this->footer = <<<HTML
        </div> <!-- end of panel div -->
        <script type="javascript>
            //status handling
            genericPanelSetSaved_$panelid = function(saved) {
                if (saved) {
                    $('haloacl_panel_status_$panelid').textContent = 'Saved';
                    $('haloacl_panel_status_$panelid').setAttribute("class", "haloacl_panel_status_saved");
                } else {
                    $('haloacl_panel_status_$panelid').textContent = 'Not Saved';
                    $('haloacl_panel_status_$panelid').setAttribute("class", "haloacl_panel_status_notsaved");
                }
            }

            genericPanelSetName_$panelid = function(name) {
                $('haloacl_panel_name_$panelid').textContent = name;
            }

            genericPanelSetDescr_$panelid = function(descr) {
                $('haloacl_panel_descr_$panelid').textContent = descr;
            }
            


        </script>
HTML;


    }

    function extendFooter($extension) {
        $this->footer .= $extension;
    }

    function getFooter() {
        return $this->footer;
    }

    function getHeader() {
        return $this->header;
    }

    function setContent($newContent) {
        $this->content = $newContent;
    }

    function getPanel() {


        return $this->header . $this->content . $this->footer;

    }

    function getSaved() {
        return $this->saved;
    }

    function setSaved($newSavedStatus) {
        $this->saved = $newSavedStatus;

    }
}
?>
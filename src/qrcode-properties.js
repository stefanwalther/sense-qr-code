/*global define*/
define([], function () {
  'use strict';

	// ****************************************************************************************
	// Value Properties
	// ****************************************************************************************
    var text = {
        ref: "props.text",
        label: "QR Code Value",
        type: "string",
        expression: "optional",
		defaultValue: "Qlik Sense",
        show: true
    };

	// ****************************************************************************************
	// Layout Properties
	// ****************************************************************************************

	var align = {
		ref: "props.align",
		label: "Alignment",
		type: "string",
		component: "buttongroup",
		defaultValue: "left",
		options: [
			{
				value: "left",
				label: "Left"
			},
			{
				value: "center",
				label: "Center"
			},
			{
				value: "right",
				label: "Right"
			}
		]
	};

	var colorLight = {
		ref: "props.colorLight",
		type: "string",
		label: "Color Light (Hex Color Code)",
		defaultValue: "#ffffff"
	};

	var colorDark = {
		ref: "props.colorDark",
		type: "string",
		label: "Color Dark (Hex Color Code)",
		defaultValue: "#333333"
	};







	// ****************************************************************************************
	// Property Panel Definition
	// ****************************************************************************************

    var propPanelDefinition = {
        uses: "settings",
        items: {
            value: {
                type: "items",
                label: "Value",
                items: {
                    text: text
                }
            },
			layout: {
				type: "items",
				label: "Layout",
				items: {
					align: align,
					colorLight: colorLight,
					colorDark: colorDark
				}
			}
        }
    };


    // Return values
    return {
        type: "items",
        component: "accordion",
        items: {
            settings: propPanelDefinition

        }
    };

});

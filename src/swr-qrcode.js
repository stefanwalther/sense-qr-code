/*global
            define,
            require,
            window,
            console,
            _
*/
/*jslint    devel:true,
            white: true
 */
define([
        'jquery',
        'underscore',
		'qvangular',
        './qrcode-properties',
        './qrcode-initialproperties',
        './lib/js/extensionUtils',
        'text!./lib/css/main.css',

		// no return value
		'./lib/external/qrcodejs/qrcode.min'

	],
function ($, _, qvangular, props, initProps, extensionUtils, cssContent) {
    'use strict';

    extensionUtils.addStyleToHeader(cssContent);

	qvangular.directive( 'swrQrCode', function (  ) {
		return {
			restrict: "E",
			replace: true,
			scope: false,
			link: function ( $scope, $element ) {

				function makeCode( ) {

					var objectId = 'qrcode_' + $scope.layout.qInfo.qId;
					if ($( objectId ).length > 0) {
						$element.empty();
					}

					$element.empty();
					var $qrCodeContainer = $( document.createElement( 'div') );
					$qrCodeContainer.attr('id', objectId );
					$qrCodeContainer.addClass( 'swr_Qr_Code');
					$qrCodeContainer.css('text-align', $scope.layout.props.align );
					$element.append( $qrCodeContainer );

					var options = getOptions();
					var qrCode = new QRCode( objectId, options );
				}

				function getOptions (  ) {

					var h = $element.prop("offsetHeight") !== 0 ? $element.prop("offsetHeight") : $($element.offsetParent()).prop("offsetHeight"),
						w = $element.prop("offsetWidth") !== 0 ? $element.prop("offsetWidth") : $($element.offsetParent()).prop("offsetWidth" ),
						height = h > w ? w : h;

					//if ( $scope.layout.props.autoLayout ) {
					//	console.log( 'scope', $scope );
					//}

					var options = {
						text: $scope.layout.props.text,
						width : height,
						height : height,
						colorLight:  $scope.layout.props.colorLight,
						colorDark: $scope.layout.props.colorDark
					};

					return options;
				}

				$scope.$watchCollection( "layout.props", function ( newVal, oldVal ) {
					if (newVal !== oldVal ) {
						//console.log( 'watch collection', newVal );
						makeCode();
					}
				});

				$scope.$watch(
					function () {
						return [$element[0].offsetWidth, $element[0].offsetHeight].join('x');
					},
					function ( newVal ) {
						makeCode();
					}
				);
				makeCode();


			}
		}
	});

    return {

        definition: props,
        initialProperties: initProps,
        snapshot: { canTakeSnapshot: true },
        template: '<swr-qr-code qv-extension class="swr_Qr_Code"/>'
    };

});

module.exports = (function () {
	"use strict";
	var shake = {};

	var shakeCallBack = null;

	// Start watching for a shake gesture
	shake.startWatch = function (onShake, _sensitivity, onError) {
		if (typeof (onShake) !== "function") {
			return;
		}

		cordova.exec(
			onShake,
			onError,
			"CDVShake",
			"startWatch",
			[]
		);
		shakeCallBack = onShake;
	};

	// Stop watching for a shake gesture
	shake.stopWatch = function () {
		cordova.exec(
			function () { }, // success
			function () { }, // error
			"CDVShake",
			"stopWatch",
			[]
		);
	};

	return shake;
})();

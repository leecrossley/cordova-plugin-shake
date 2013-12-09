
module.exports = (function () {
    "use strict";
    var shake = {},
        watchId = null,
        options = { frequency: 300 },
        previousAcceleration = { x: null, y: null, z: null },
        shakeCallBack = null;

    // Start watching the accelerometer for a shake gesture
    shake.startWatch = function (onShake) {
        if (onShake) {
            shakeCallBack = onShake;
        }
        watchId = navigator.accelerometer.watchAcceleration(getAccelerationSnapshot, handleError, options);
    };

    // Stop watching the accelerometer for a shake gesture
    shake.stopWatch = function () {
        if (watchId !== null) {
            navigator.accelerometer.clearWatch(watchId);
            watchId = null;
        }
    };

    // Gets the current acceleration snapshot from the last accelerometer watch
    function getAccelerationSnapshot() {
        navigator.accelerometer.getCurrentAcceleration(assessCurrentAcceleration, handleError);
    }

    // Assess the current acceleration parameters to determine a shake
    function assessCurrentAcceleration(acceleration) {
        var accelerationChange = {};
        if (previousAcceleration.x !== null) {
            accelerationChange.x = Math.abs(previousAcceleration.x, acceleration.x);
            accelerationChange.y = Math.abs(previousAcceleration.y, acceleration.y);
            accelerationChange.z = Math.abs(previousAcceleration.z, acceleration.z);
        }
        if (accelerationChange.x + accelerationChange.y + accelerationChange.z > 30) {
            // Shake detected
            if (typeof shakeCallBack === "function") {
                shakeCallBack();
            }
            shake.stopWatch();
            setTimeout(shake.startWatch, 1000);
            previousAcceleration = {
                x: null,
                y: null,
                z: null
            };
        } else {
            previousAcceleration = {
                x: acceleration.x,
                y: acceleration.y,
                z: acceleration.z
            };
        }
    }

    // Handle errors here
    function handleError() {
    }

    return shake;
})();

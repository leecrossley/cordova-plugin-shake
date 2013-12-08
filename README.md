## Shake Gesture Detection Plugin for Apache Cordova

Cordova Plugin to detect when a physical device performs a shake gesture. Developed for Apache Cordova CLI >= 3.0.0.

### 1 step install

```
cordova plugin add https://github.com/leecrossley/cordova-plugin-shake-detection.git
```

### Usage

You **do not** need to reference any JavaScript, the Cordova plugin architecture will add a shake object to your root automatically when you build.

**NB:** There is no native component to this plugin.

```js
var onShake = function () {
  // Code fired when a shake is detected
};

// Start watching for shake gestures and call "onShake"
shake.startWatch(onShake);

// Stop watching for shake gestures
shake.stopWatch();
```

## License

[MIT License](http://ilee.mit-license.org)
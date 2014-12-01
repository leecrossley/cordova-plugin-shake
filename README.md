## Shake Gesture Detection for Cordova / PhoneGap

Apache Cordova / PhoneGap Plugin to detect when a physical device performs a shake gesture.

This is based on a standalone JavaScript implementation I wrote last year ([gist](https://gist.github.com/leecrossley/4078996)).

### 1 step install

```
cordova plugin add https://github.com/leecrossley/cordova-plugin-shake-detection.git
```

### Usage

You **do not** need to reference any JavaScript, the Cordova plugin architecture will add a shake object to your root automatically when you build.

**NB:** There is no native component to this plugin but it depends on the device motion plugin (added when this plugin is added).

### Example

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

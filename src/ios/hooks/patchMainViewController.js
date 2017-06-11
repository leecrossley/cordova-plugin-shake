module.exports = function (ctx) {
	var fs = ctx.requireCordovaModule('fs');
	var path = ctx.requireCordovaModule('path');

	function patchMainViewController(fileName) {
		var data = fs.readFileSync(fileName, "utf8");

		var toReplace = "@implementation MainViewController";
		var replaceWith = "@implementation MainViewController\n" +
			"\n" +
			"// added by cordova-plugin-shake\n" +
			"- (void) motionEnded:(UIEventSubtype)motion withEvent:(UIEvent*)event {\n" +
			"\tif (event.type == UIEventTypeMotion && event.subtype == UIEventSubtypeMotionShake) {\n" +
			"\t\t[[NSNotificationCenter defaultCenter] postNotificationName:@\"CDVShakeDeviceShaken\" object:self];\n" +
			"\t}\n" +
			"}";
		if (data.indexOf("motionEnded") < 0) {
			var result = data.replace(new RegExp(toReplace, "g"), replaceWith);
			fs.writeFileSync(fileName, result, "utf8")
			process.stdout.write(fileName + " patched\n");
		}
	}

	function getProjectName(rootDir) {
		var configFile = path.join(rootDir, "config.xml");
		var contents = fs.readFileSync(configFile, "utf8");
		if (contents) {
			var lines = contents.split(/\r?\n/);
			for (var i = 0; i < lines.length; i++) {
				var line = lines[i].trim();
				var pos1 = line.indexOf("<name>");
				var pos2 = line.indexOf("</name>");
				if (pos1 === 0 && pos2 > pos1) {
					return line.slice(6, pos2);
				}
			}
		}
		throw ("name tag in file " + configFile + " not found");
	}

	var rootDir = ctx.opts.projectRoot;
	if (rootDir) {
		try {
			// get project name from config.xml 
			var projectName = getProjectName(rootDir);

			var mainViewControllerFile = path.join("platforms", "ios", projectName, "Classes", "MainViewController.m");
			if (!fs.existsSync(mainViewControllerFile)) {
				throw "file " + mainViewControllerFile + " does not exist";
			}
			patchMainViewController(mainViewControllerFile);
		} catch (e) {
			process.stdout.write(e);
		}
	}
}

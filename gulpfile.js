
var gulp = require("gulp-help")(require("gulp"));
var exec = require("child_process").exec;
var os = require("os");


function tsc(cb, configPath) {
    var cmd = os.platform() === "win32" ? "node_modules\\.bin\\tsc" : "./node_modules/.bin/tsc";

    cmd = cmd + " -p " + configPath;

    exec(cmd, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
}

gulp.task("compile", false, [], function (cb) {
    tsc(cb, "tsconfig.json");
});
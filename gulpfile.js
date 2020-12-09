var { src, dest, watch, series } = require("gulp");
var clean = require("gulp-clean-css");
var htmlmin = require("gulp-htmlmin");
var babel = require("gulp-babel");
var uglify = require("gulp-uglify");
var prefixer = require("gulp-autoprefixer");
var concat = require("gulp-concat");
// 当前函数 是用于处理css的压缩的
function doCss() {
    return src("./web/**/*.css")
        .pipe(clean())
        .pipe(dest("./publish"))
}
// 当前函数 是用于给css添加前缀的
function addPreFix() {
    return src("./web/**/*.css")
    .pipe(prefixer())
    .pipe(dest("./publish/"))
}

// 定义用于压缩HTML的函数
function doHTML() {
    return src("./web/**/*.html")
        .pipe(htmlmin({
            // 是否压缩空白
            "collapseWhitespace": true,
            // 是否压缩style标签及其中的css代码
            "minifyCSS": true,
            // 是否压缩script标签及其中的js代码
            "minifyJS": true,
            // 是否移除没有属性值的HTML标准属性
            "removeEmptyAttributes": true
        }))
        .pipe(dest("./publish"))
}

// 定义用于转换ES6为ES5的函数
function ES6ToES5() {
    // 定位所有的js
    return src("./web/**/*.js")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(dest("./publish/"))
}

function doJS() {
    return src("./web/**/*.js")
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(uglify())
        .pipe(dest("./publish/"))
}


module.exports.doCss = doCss;
module.exports.doHTML = doHTML;
module.exports.ES6ToES5 = ES6ToES5;
module.exports.doJS = doJS;
module.exports.addPreFix = addPreFix;
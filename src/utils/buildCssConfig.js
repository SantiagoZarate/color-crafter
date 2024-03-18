function convertToCSS(input) {
    var cssProperties = "";
    for (var key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key)) {
            var value = input[key];
            var _a = value.match(/\d+/g) || [], hue = _a[0], saturation = _a[1], lightness = _a[2];
            if (hue && saturation && lightness) {
                cssProperties += "--".concat(key, ": ").concat(hue, "deg ").concat(saturation, "% ").concat(lightness, "%;\n        ");
            }
        }
    }
    return "\n    @layer base {\n      :root {\n        ".concat(cssProperties, "\n      }\n    }\n  ");
}
var myColors = {
    primary: "hsla(30deg, 40%, 50%)",
    border: "hsla(30deg, 40%, 50%)",
};
console.log(convertToCSS(myColors));

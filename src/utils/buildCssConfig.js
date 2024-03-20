function convertToCSS(input) {
    var cssColorVariables = "";
    var cssColorOpositeMode = "";
    var twConfig = "";
    for (var key in input) {
        twConfig += "".concat(key, ": (hsl(var(--").concat(key, "))/ <alpha-value>),\n    ");
        if (Object.prototype.hasOwnProperty.call(input, key)) {
            var value = input[key];
            var _a = value.match(/\d+/g) || [], hue = _a[0], saturation = _a[1], lightness = _a[2];
            if (hue && saturation && lightness) {
                var opositeLight = 100 - Number(lightness);
                cssColorVariables += "--".concat(key, ": ").concat(hue, "deg ").concat(saturation, "% ").concat(lightness, "%;\n      ");
                cssColorOpositeMode += "--".concat(key, ": ").concat(hue, "deg ").concat(saturation, "% ").concat(opositeLight, "%;\n      ");
            }
        }
    }
    var cssProps = "\n  @layer base {\n    :root {\n      ".concat(cssColorVariables, "\n    }\n\n    [data-theme=\"dark\"] {\n      ").concat(cssColorOpositeMode, "\n    }\n  }\n");
    var twProps = "\n  colors {\n    ".concat(twConfig, "\n  }\n");
    return {
        twProps: twProps,
        cssProps: cssProps,
    };
}
var myColors = {
    primary: "hsl(30deg,40%,50%)",
    secondary: "hsl(30deg,40%,10%)",
    border: "hsl(30deg,40%,35%)",
};
console.log(convertToCSS(myColors).cssProps);

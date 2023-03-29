//节流方法
export const throttle = (func, delay) => {
    var prev = Date.now();
    return function() {
        var now = Date.now()
        var _this = this;
        var args = arguments
        if (now - prev >= delay) {
            func.apply(_this, args)
            prev = Date.now()
        }
    }
}
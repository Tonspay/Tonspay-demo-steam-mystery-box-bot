const menu = require("./menu");

function pathRouter(data) {
    var ret = {
        command: "unknown",
        params: []
    }
    var tmp_0 = data.split(" ");
    if (tmp_0.length > 0) {
        var tmp_1 = tmp_0[0].split("/");
        if (tmp_1.length > 0) {
            ret.command = tmp_1[1]
        }
        for (var i = 1; i < tmp_0.length; i++) {
            ret.params.push(tmp_0[i])
        }
    }
    return ret;
}


module.exports = {
    menu,
    pathRouter
}
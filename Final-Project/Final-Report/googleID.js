function router(myLocation) {
    var h = (myLocation.hash || "#").substr(1)

    var components = h.split("/")
    for(var i=0; i<components.length; i++) {
        components[i] = decodeURIComponent( components[i].replace(/_/g, " ") )
        if (components[i].indexOf("/") >= 0)
            return { page: "error", error: "404 Not Found.  The URL appears to be incorrect." }
    }
    h = components.join("/")

    var m
    if (h == "" || h == "/") return { page: "welcome" }
    m = h.match(new RegExp("/user/([^/]+)/folder/([^/]+)/program/([^/]+)/edit$"))
    if (m) return { page: "edit", user: m[1], folder: m[2], program: m[3] }
    m = h.match(new RegExp("/user/([^/]+)/folder/([^/]+)/program/([^/]+)/loadURL/(.+)$"))
    if (m) return { page: "load", user: m[1], folder: m[2], program: m[3], loadURL: m[4]}
    m = h.match(new RegExp("/user/([^/]+)/folder/([^/]+)/program/([^/]+)/share$"))
    if (m) return { page: "share", user: m[1], folder: m[2], program: m[3] }
    m = h.match(new RegExp("/user/([^/]+)/folder/([^/]+)/program/([^/]+)/option/([^/]+)"))
    if (m) return { page: m[4], user: m[1], folder: m[2], program: m[3], option:m[4] }
    m = h.match(new RegExp("/user/([^/]+)/folder/([^/]+)/program/([^/]+)$"))
    if (m) return { page: "run", user: m[1], folder: m[2], program: m[3] }
    m = h.match(new RegExp("/user/([^/]+)/folder/([^/]+)/$"))
    if (m) return { page: "folder", user: m[1], folder: m[2] }
    m = h.match(new RegExp("/user/([^/]+)/$"))
    if (m) return { page: "user", user: m[1] }

    m = h.match(new RegExp("/gdID/(.+)$"))
    if (m) return { page: "runGDfile", gdID: m[1]}

    m = h.match(new RegExp("/action/([^/]+)$"))
    if (m) return { page: "action", action: m[1] }
    return { page: "error", error: "404 Not Found.  The URL appears to be incorrect." }
}

module.exports = router
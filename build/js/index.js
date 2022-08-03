if ('serviceWorker' in navigator) {
window.navigator.serviceWorker.register("/uv-sw.js", {scope: __uv$config.prefix})
}

var Stomp = new StompBoot({
  bare_server: "/bare/",
  directory: "/stomp/",
  loglevel: StompBoot.LOG_ERROR,
  codec: StompBoot.CODEC_XOR
})

if ('serviceWorker' in navigator) {
window.navigator.serviceWorker.register("/dip-sw.js", {scope: __DIP.config.prefix })
}

navigator.serviceWorker.register("/osana/sw.js", {
  scope: __osana$config.prefix,
  updateViaCache: "none"
})

if ('serviceWorker' in navigator) {
navigator.serviceWorker.register("/aero-sw.js", {
  scope: "/go/",
  // Don't cache http requests
  updateViaCache: 'none',
  type: 'module'
})
}

function searchURL(url) {
if (url.match(/^https?:\/\//)) {
return url;
} else if (url.includes('.') && !url.includes(" ")) {
return "https://" + url
} else {
//custom search engine later
return "https://www.google.com/search?q=" + encodeURIComponent(url)
}
}

function getLink(url) {
url = searchURL(url)
var type = localStorage.getItem("type") || "Ultraviolet"

switch(type) {
case "Ultraviolet":
return "." + __uv$config.prefix + __uv$config.encodeUrl(url)
break;
case "Stomp":
return "." + Stomp.html(url)
break;
case "DIP":
return "." + __DIP.config.prefix + __uv$config.encodeUrl(url)
break;
case "Osana":
return "." + __osana$config.prefix + __osana$config.codec.encode(url)
break;
case "Aero":
return "." + "/go/" + url
break;
default:
return "." + __uv$config.prefix + __uv$config.encodeUrl(url)
break;
}
}
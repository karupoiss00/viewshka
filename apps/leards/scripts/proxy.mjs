import {ReverseProxyPathMapper} from "reverse_proxy_pathmapper";

const PROXY_PORT = 3000
const FRONTEND_URL = "http://localhost:4200"
const BACKEND_URL = "http://localhost:8080"

const pathMapper = {
	"/api/v1/?(.*)": BACKEND_URL,
	"/?(.*)": FRONTEND_URL,
}

new ReverseProxyPathMapper({}, pathMapper).serve(PROXY_PORT);

setTimeout(() => {
	console.log(`[ PROXY ] on http://localhost:${PROXY_PORT}`)
}, 7000)
import {ReverseProxyPathMapper} from "reverse_proxy_pathmapper";

const PROXY_PORT = 80
const FRONTEND_URL = "http://0.0.0.0:3000"
const BACKEND_URL = "http://localhost:8080"

const pathMapper = {
	"/api/v1/?(.*)": BACKEND_URL,
	"/?(.*)": FRONTEND_URL,
}

new ReverseProxyPathMapper({}, pathMapper).serve(PROXY_PORT);
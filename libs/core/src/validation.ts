
function isValidPassword(password: string) {
	return password.length >= 8
}

function isValidUsername(name: string) {
	return name.length > 1
}
const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function isValidEmail(str: string): boolean {
	return emailReg.test(str)
}

export {
	isValidEmail,
	isValidPassword,
	isValidUsername,
}
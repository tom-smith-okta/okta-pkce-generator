////////////////////////////////////////////////////

require('dotenv').config()

const cors = require('cors')

const crypto = require('crypto');

const express = require('express')

///////////////////////////////////////////////////

const app = express()

app.use(cors())

const port = process.env.PORT || 3000

///////////////////////////////////////////////////

app.listen(port, function () {
	console.log('App listening on port ' + port + '...')
})

///////////////////////////////////////////////////

function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}

//////////////////////////////////////////////////
// ROUTES
//////////////////////////////////////////////////

app.get('/favicon.ico', function (req, res) {
	res.sendStatus(200)
})

app.get('/', function (req, res) {

	const code_verifier = base64URLEncode(crypto.randomBytes(32))

	console.log("code verifier: " + code_verifier)

	const code_challenge = base64URLEncode(sha256(code_verifier))

	console.log("code challenge: " + code_challenge)

	const obj = {
		code_challenge: code_challenge,
		code_verifier: code_verifier
	}

	res.json(obj)
})

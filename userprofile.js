var myHeaders = new Headers()
myHeaders.set("Cache-Control", "no-store")
var urlParams = new URLSearchParams(window.location.search)
var tokens
var domain = "gaulish"
var region = "us-east-1"
var appClientId = "t5j2po234u7b3cha128fbkcpe"
var userPoolId = "us-east-1_SiWOmGPzw"
var redirectURI = "https://gaulish.io"

var key_id
var keys

//verify token
async function verifyToken(token) {
  console.log("verify token:", token)
  //get Cognito keys
  keys_url =
    "https://cognito-idp." +
    region +
    ".amazonaws.com/" +
    userPoolId +
    "/.well-known/jwks.json"
  await fetch(keys_url)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      keys = data["keys"]
    })

  //Get the kid (key id)
  var tokenHeader = parseJWTHeader(token)
  key_id = tokenHeader.kid

  //search for the kid key id in the Cognito Keys
  const key = keys.find((key) => key.kid === key_id)
  if (key === undefined) {
    console.log("Public key not found in Cognito jwks.json")
    return "Public key not found in Cognito jwks.json"
  }

  //verify JWT Signature
  var keyObj = KEYUTIL.getKey(key)
  var isValid = KJUR.jws.JWS.verifyJWT(token, keyObj, { alg: ["RS256"] })
  if (isValid) {
  } else {
    console.log("Signature verification failed")
    return "Signature verification failed"
  }

  //verify token has not expired
  var tokenPayload = parseJWTPayload(token)
  if (Date.now() >= tokenPayload.exp * 1000) {
    console.log("Token expired")
    return "Token expired"
  }

  //verify app_client_id
  var n = tokenPayload.aud.localeCompare(appClientId)
  if (n != 0) {
    console.log("Token was not issued for this audience")
    return "Token was not issued for this audience"
  }
  console.log("verified!")
  return "verified"
}

//Convert Payload from Base64-URL to JSON
const decodePayload = (payload) => {
  const cleanedPayload = payload.replace(/-/g, "+").replace(/_/g, "/")
  const decodedPayload = atob(cleanedPayload)
  const uriEncodedPayload = Array.from(decodedPayload).reduce((acc, char) => {
    const uriEncodedChar = ("00" + char.charCodeAt(0).toString(16)).slice(-2)
    return `${acc}%${uriEncodedChar}`
  }, "")
  const jsonPayload = decodeURIComponent(uriEncodedPayload)

  return JSON.parse(jsonPayload)
}

//Parse JWT Payload
const parseJWTPayload = (token) => {
  console.log("JWTPayload", token)
  const [, payload] = token.split(".")
  const jsonPayload = decodePayload(payload)

  return jsonPayload
}

//Parse JWT Header
const parseJWTHeader = (token) => {
  console.log("the token:", token)
  const [header] = token.split(".")
  const jsonHeader = decodePayload(header)

  return jsonHeader
}

//Generate a Random String
const getRandomString = () => {
  const randomItems = new Uint32Array(28)
  crypto.getRandomValues(randomItems)
  const binaryStringItems = randomItems.map(
    (dec) => `0${dec.toString(16).substr(-2)}`
  )
  return binaryStringItems.reduce((acc, item) => `${acc}${item}`, "")
}

//Encrypt a String with SHA256
const encryptStringWithSHA256 = async (str) => {
  console.log("str", str)
  const PROTOCOL = "SHA-256"
  const textEncoder = new TextEncoder()
  const encodedData = textEncoder.encode(str)
  return crypto.subtle.digest(PROTOCOL, encodedData)
}

//Convert Hash to Base64-URL
const hashToBase64url = (arrayBuffer) => {
  console.log("arrayBuffer", arrayBuffer)
  const items = new Uint8Array(arrayBuffer)
  const stringifiedArrayHash = items.reduce(
    (acc, i) => `${acc}${String.fromCharCode(i)}`,
    ""
  )
  const decodedHash = btoa(stringifiedArrayHash)

  const base64URL = decodedHash
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
  return base64URL
}

// Main Function
async function main() {
  var code = urlParams.get("code")
  console.log("we are in main!", code)

  //If code not present then request code else request tokens
  if (code == null) {
    // Create random "state"
    var state = getRandomString()
    sessionStorage.setItem("pkce_state", state)

    // Create PKCE code verifier
    var code_verifier = getRandomString()
    sessionStorage.setItem("code_verifier", code_verifier)

    // Create code challenge
    var arrayHash = await encryptStringWithSHA256(code_verifier)
    var code_challenge = hashToBase64url(arrayHash)
    sessionStorage.setItem("code_challenge", code_challenge)

    // Redirtect user-agent to /authorize endpoint
    location.href =
      "https://" +
      domain +
      ".auth." +
      region +
      ".amazoncognito.com/oauth2/authorize?response_type=code&state=" +
      state +
      "&client_id=" +
      appClientId +
      "&redirect_uri=" +
      redirectURI +
      "&scope=openid&code_challenge_method=S256&code_challenge=" +
      code_challenge
  } else {
    // Verify state matches
    state = urlParams.get("state")
    if (sessionStorage.getItem("pkce_state") != state) {
      alert("Invalid state")
    } else {
      // Fetch OAuth2 tokens from Cognito
      code_verifier = sessionStorage.getItem("code_verifier")
      await fetch(
        "https://" +
          domain +
          ".auth." +
          region +
          ".amazoncognito.com/oauth2/token?grant_type=authorization_code&client_id=" +
          appClientId +
          "&code_verifier=" +
          code_verifier +
          "&redirect_uri=" +
          redirectURI +
          "&code=" +
          code,
        {
          method: "post",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
        .then((response) => {
          console.log("response:", response)
          return response.json()
        })
        .then((data) => {
          // Verify id_token
          tokens = data
          var idVerified = verifyToken(tokens.id_token)
          Promise.resolve(idVerified).then(function (value) {
            if (value.localeCompare("verified")) {
              alert("Invalid ID Token - " + value)
              return
            }
          })
          console.log("tokens, idVerified:", tokens, idVerified)
          // Display tokens
          document.getElementById("id_token").innerHTML = JSON.stringify(
            parseJWTPayload(tokens.id_token),
            null,
            "\t"
          )
          document.getElementById("access_token").innerHTML = JSON.stringify(
            parseJWTPayload(tokens.access_token),
            null,
            "\t"
          )
        })

      // Fetch from /user_info
      await fetch(
        "https://" +
          domain +
          ".auth." +
          region +
          ".amazoncognito.com/oauth2/userInfo",
        {
          method: "post",
          headers: {
            authorization: "Bearer " + tokens.access_token,
          },
        }
      )
        .then((response) => {
          console.log("response", response)
          return response.json()
        })
        .then((data) => {
          // Display user information
          console.log("data", JSON.stringify(data))

          document.getElementById("userInfo").innerHTML = JSON.stringify(
            data,
            null,
            "\t"
          )
        })
    }
  }
}
main()

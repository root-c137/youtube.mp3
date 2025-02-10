

export const EasyFetch = (Url, Data = null, Method, Token = null, ContentType = "application/json",
    basePath = "/api/") =>
{
const API_PORT = 8000;
let BaseURL = "http://localhost:"+API_PORT+basePath;


const CurrentUrl = BaseURL+Url;
const Body = ContentType !== 'multipart/form-data' ? JSON.stringify(Data) : Data;
let Status = 0;

const Header = {
'Accept' : 'application/json',
'Authorization' : 'Bearer '+Token
}

if (ContentType !== 'multipart/form-data') {
Header['Content-Type'] = "application/json";
}


let Init = {
method : Method,
headers : Header,
body: Method === "GET" ? null : Body
}


return fetch(CurrentUrl, Init)
.then(res=>  {
Status = res.status;
const contentType = res.headers.get("content-type");
if (contentType && contentType.indexOf("application/json") !== -1) {
return res.json();
} else {
throw new Error('La réponse n\'est pas au format JSON');
}
})
.then(res =>  {
return [res, Status]}
)
.catch(error => {
console.error('Erreur lors de l\'envoi de la requête :', error);
return Promise.reject(error);
});
}
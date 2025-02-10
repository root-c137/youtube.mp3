import {useState} from "react";
import './Form.css';



export const Form = () => 
{
    const [url, setUrl] = useState("");
    const [inputClassName, setInputClassName] = useState();
    const [loading, setLoading] = useState(false);

    const inputChange = (e) => 
    {
        setUrl(e.currentTarget.value);
    }

    const onBlur = () => 
    {
        console.log('onblur..');
        if(url && url.length > 0)
            setInputClassName("OnBlur")
        else
            setInputClassName("")
    }

    const Submit = (e) => 
    {
        e.preventDefault();
        console.log("submit..");
        console.log(url);

        if(!isValidUrl(url) )
            console.log('url vide ou invalide..');
        else
            GoFetch("post", "convert", {url: url});
    }

    const isValidUrl = (url) => 
    {

        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/)|youtu\.be\/)[\w\-]+/;
        return regex.test(url);
    };

    const GoFetch = (Method, Uri, Data) => 
    {
        setLoading(!loading);

        console.log("gofetcuh..");
        const PORT_API = 8000;
        const baseURL = "http://localhost:"+PORT_API+"/";
        const URL = baseURL + Uri;

        const Header = {'Content-Type':'application/json'};
        const Body = JSON.stringify(Data);
        console.log(Body);

        const Init = {
            method: Method,
            headers: Header,
            body: Body
        };

        console.log(Init);

        fetch(URL, Init)
        .then(res => {return res.json()})
        .then(res => {

            console.log(res);
        })
        .catch(err => {return Promise.reject(err)})
        .finally(() => {
            setLoading(false); 
            setUrl("")
        });
    }

    return(
        <form>
            <input type="text" name="url" id="url" placeholder="entrez l'url d'une vidéo youtube ici" 
            onChange={e => setUrl(e.currentTarget.value)} 
            onBlur={onBlur}
            className={inputClassName}
            value={url}/>

            <button type="submit" onClick={Submit} disabled={loading}>
                {!loading ? "Convertir" : "En cours de traitement..."}
            </button>
        </form>
    )
}

import {emptyTxtContent} from './utils.js';

// Elements of DOM
const $inputsFieldset = document.querySelectorAll("fieldset > input");
const $buttons = document.querySelectorAll("#buttons > input");
const $infoTxt = document.querySelector("#info-txt");
const $recapitulate = document.querySelector("#recapitulate");

let existingName = false;

// Handle date's data
const today = new Date();
const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
let day = ("0" + nextWeek).slice(9, 11);
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let year = today.getFullYear();

document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;

/**
 * Handle actions of inputs of form in order to create or to display cookie - 
 * @param {event} e 
 */
const btnAction = (e) =>{

    e.preventDefault();

    let newObj = {};

    $inputsFieldset.forEach( input =>{
        let attrName = input.getAttribute("name");
        let attrValue = attrName !== "cookieExpire" ? input.value : input.valueAsDate;
        newObj[attrName] = attrValue;
    })

    let description = e.target.getAttribute("data-cookie");

    if(description === "create"){
        createCookie(newObj.cookieName, newObj.cookieValue, newObj.cookieExpire);
    } else if(description === "display"){
        listCookie();
    }

}

$buttons.forEach( button => {
    button.addEventListener("click", btnAction);
});


/**
 * Create a cookie on the document
 * @param {string} name 
 * @param {string} value 
 * @param {string} exp 
 */
const createCookie = (name, value, exp) =>{

    $infoTxt.innerHTML = "";

    // Handle existing cookies
    let cookies = document.cookie.split(";");
    
    cookies.forEach(cookie =>{
        cookie = cookie.trim();
        let formatCookie = cookie.split("=");
        console.log(formatCookie);
        if(formatCookie[0] === encodeURIComponent(name)){
            existingName = true;
        }
    });

    if(existingName){
        $infoTxt.innerHTML = `Dsl, ce cookie existe déjà !`;
        existingName = false;
        emptyTxtContent($infoTxt);
        return;
    }
    
    // Input name of cookie is empty
    if(name.length === 0){
        $infoTxt.innerHTML = `Impossible de créer un cookie sans nom :(`;
        emptyTxtContent($infoTxt);
        return;
    }
    
    // Create cookie is all input's content is ok
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp.toUTCString()}`;

    let info = document.createElement("li");
    info.innerHTML = `Le cookie ${name} est créé !`;
    $recapitulate.appendChild(info);
    setTimeout(()=>{
        info.remove()
    }, 2000);
    
}

const listCookie = () =>{
    
    let cookies = document.cookie.split(";")
    
    // Handle action when it is any cookie
    if(cookies.join() === ""){
        $infoTxt.innerHTML = `Pas de cookies à afficher`;
        return;
    }

    //Handle action when there is an existing cookie or more
    cookies.forEach( cookie =>{
        cookie = cookie.trim();
        let formatCookie = cookie.split("=");

        $infoTxt.innerHTML = "Cliquez sur un cookie de la liste pour le supprimer"
        let item = document.createElement("li");
        item.innerHTML = `Nom : <span>${decodeURIComponent(formatCookie[0])}</span> - Valeur : <span>${decodeURIComponent(formatCookie[1])}</span> `;
        $recapitulate.appendChild(item);

        // Remove a cookie
        item.addEventListener("click", ()=>{
            document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`;
            item.innerHTML = `Cookie <span>${formatCookie[0]}</span> supprimé`;
            setTimeout(()=>{
                item.remove()
            }, 2000)
        })
    })

}
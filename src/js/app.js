// Elements of DOM
const $inputsFieldset = document.querySelectorAll("fieldset > input");
const $buttons = document.querySelectorAll("#buttons > input");
const $infoTxt = document.querySelector("#info-txt");
const $recapitulate = document.querySelector("#recapitulate");

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
    
    if(name.length === 0){
        $infoTxt.innerHTML = `Impossible de créer un cookie sans nom :(`;
        return;
    }
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${exp.toUTCString()}`;

    let info = document.createElement("li");
    info.innerHTML = `Le cookie ${name} est créé !`;
    $recapitulate.appendChild(info);
    setTimeout(()=>{
        info.remove()
    }, 2000);
}
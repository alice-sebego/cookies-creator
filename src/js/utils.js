/**
 * Empty content on a HTML element
 * @param {HTMLelement} element 
 */
const emptyTxtContent = (element) =>{
    setTimeout(()=>{
        element.innerHTML ="";
    }, 5000);
}

export {emptyTxtContent}
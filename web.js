/* let input = document.querySelector("input")
let button = document.querySelector("btnform")
let personDisplay = document.querySelector("#person-display")
let errorMessage = document.getElementById("error-message")
errorMessage.style.display="none"
console.log(errorMessage)

button.onclick = addPerson

function addPerson(){    
    let person = input.value

    if(person ==""){
        errorMessage.style.display="block"
        return
     
    }else{
        errorMessage.style.display="none"
    }
}
 */

document.getElementById("scroll").addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });



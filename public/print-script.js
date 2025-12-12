



/* SERVING SIZE*/
var servings = document.querySelector("servings");
const quantities = document.querySelectorAll("quantity");
const people = document.querySelector("people");
const increase = document.querySelector("increase-serving");
const decrease = document.querySelector("decrease-serving");
increase.addEventListener("click", increaseServing);
decrease.addEventListener("click", decreaseServing);
function increaseServing(){
    servings.innerHTML = Number(servings.innerHTML) + 1
    quantities.forEach(element => {element.innerHTML = Number(element.getAttribute("value")) * Number(servings.innerHTML);})
    people.innerHTML = Number(people.getAttribute("value")) * Number(servings.innerHTML) 
}
function decreaseServing(){
    if(servings.innerHTML > 0){servings.innerHTML = Number(servings.innerHTML) - 1}
    else{servings.innerHTML = servings.innerHTML}
    quantities.forEach(element => {element.innerHTML = Number(element.getAttribute("value")) * Number(servings.innerHTML);})
    people.innerHTML = Number(people.getAttribute("value")) * Number(servings.innerHTML) 
}





/* AVG RATING IN STAR FORM */
const stars = document.querySelectorAll(".star");
stars.forEach(element => {
    element.addEventListener("click", rate);
})
function rate(event){
    console.log(event.target.getAttribute("value"))
    stars.forEach(element => {
        element.src = "./images/empty-star.png";
        if(element.getAttribute("value") <= event.target.getAttribute("value")){
            element.src = "./images/filled-star.png";
        }
        else{
            element.src = "./images/empty-star.png";
        }
    }) 
}



/* PRINT BUTTONS */





















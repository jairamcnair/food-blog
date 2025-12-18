




/* AFFILIATE LINKS */
const affiliates = document.querySelectorAll(".affiliate");
affiliates.forEach(affiliate => {
    affiliate.innerHTML += " (affiliate)"
})


/* PINTEREST BUTTON */
document.getElementById("pin-btn").addEventListener("click", function() {
    // Read meta tags dynamically
    const getMetaContent = (property) => {
        const tag = document.querySelector(`meta[property="${property}"]`) 
                 || document.querySelector(`meta[name="${property}"]`);
        return tag ? tag.getAttribute("content") : "";
    };

    //const imgTitle = encodeURIComponent(getMetaContent("og:title") || "");
    const pageUrl = encodeURIComponent(getMetaContent("og:url") || window.location.href);
    const imageUrl = encodeURIComponent(getMetaContent("og:image") || "");
    const description = encodeURIComponent(getMetaContent("og:description") || getMetaContent("description") || "");

    /*
    if (!imageUrl) {
        alert("No image found for Pinterest pin!");
        return;
    }
    if (!description) {
        alert("No description!");
        return;
    }*/

    const pinterestUrl = `https://www.pinterest.com/pin/create/button/?url=${pageUrl}&media=${imageUrl}&description=${description}`;

    window.open(pinterestUrl, "_blank", "width=750,height=550");
});





/* JUMP TO RECIPE*/
const jumpToRecipe = document.querySelector('jumpToRecipe');
const Recipe = document.getElementById('servings');
function scrollToRecipe() {
  Recipe.scrollIntoView({
    behavior: 'smooth', // 'auto' (default), 'smooth', or 'instant'
    block: 'start',     // 'start' (default), 'center', 'end', or 'nearest'
    inline: 'nearest'   // 'start', 'center', 'end', or 'nearest' (default)
});}
jumpToRecipe.addEventListener("click", scrollToRecipe)


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
    quantities.forEach(element => {element.innerHTML = (Number(element.getAttribute("value")) * Number(servings.innerHTML)).toFixed(3);})
    people.innerHTML = Number(people.getAttribute("value")) * Number(servings.innerHTML) 
}
function decreaseServing(){
    if(servings.innerHTML > 0){servings.innerHTML = Number(servings.innerHTML) - 1}
    else{servings.innerHTML = servings.innerHTML}
    quantities.forEach(element => {element.innerHTML = (Number(element.getAttribute("value")) * Number(servings.innerHTML)).toFixed(3);})
    people.innerHTML = Number(people.getAttribute("value")) * Number(servings.innerHTML) 
}


/* COOK MODE */
let wakeLock = null;
const requestWakeLock = async () => {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Wake Lock is active!');
    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock has been released');
    });
  } catch (err) {
    console.error(`${err.name}, ${err.message}`);
  }
};
const releaseWakeLock = async () => {
  if (wakeLock) {
    await wakeLock.release();
    wakeLock = null;
    console.log('Wake Lock released.');
  }
};
const tog = document.querySelector("tog");
const cookmode = document.querySelector("cook-mode");
tog.addEventListener("click", slide);
async function slide(){
    cookmode.classList.toggle("right-align");
    if(cookmode.classList == 'right-align'){
        //console.log("ON")
        requestWakeLock()
    }
    else{
        //console.log("OFF")
        releaseWakeLock()
    }
}



/*
const on = document.querySelector("on");
const off = document.querySelector("off");
on.addEventListener("click", cookModeOn)
off.addEventListener("click", cookModeOff)
async function cookModeOn(){
    off.style.backgroundColor = '#ff9595ff';
    on.style.backgroundColor = '#dadada';
}
function cookModeOff(){
    off.style.backgroundColor = '#dadada';
    on.style.backgroundColor = '#aefda7ff';
}*/



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







const view = document.querySelectorAll("view-replies");
view.forEach(reply => {reply.addEventListener("click", showReplies)})
function showReplies(){
    let tar = event.target;
    let classname = "."+event.target.getAttribute("class").toString();
    let newString = classname.replace("trigger", "");
    const elements = document.querySelectorAll(newString)
    elements.forEach(elem => {
        elem.classList.toggle("hidden")
        if(elem.classList.contains("hidden")){
            tar.innerHTML = "View Replies"
        }
        if(!elem.classList.contains("hidden")){
            tar.innerHTML = "Hide Replies"
        }
    })
}




// REPLY button function, to insert table record
const replyBtns = document.querySelectorAll("reply-button");
replyBtns.forEach(btn => {
    btn.addEventListener("click", insertComment)
})


// MODAL
const modals = document.querySelectorAll("modal");
modals.forEach(modal => {
    modal.addEventListener("click", showModal)
    // id of the parnet container is the reply_to
})

const close = document.querySelectorAll(".close");
close.forEach(clo => {clo.addEventListener("click", closeModal)});

const closediv = document.querySelectorAll(".close-div");
closediv.forEach(clo => {clo.addEventListener("click", closeModal)});
const modal = document.querySelector(".modal-content")
//modal.addEventListener("click", closeModal)*/
function closeModal(){modal.style.display = "none";}
function showModal(){
    modal.style.display = 'flex';console.log(event.target);
    let newString = event.target.id.replace("r", ""); //so the reply is to the right comment
    const input = document.getElementById("reply_to");
    input.setAttribute("value", newString)
}
// When the user clicks anywhere outside of the modal, close it















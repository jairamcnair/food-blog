






document.getElementById("pin-btn").addEventListener("click", function () {
  const url = encodeURIComponent(window.location.href);
  const media = encodeURIComponent("/images/Cinnamon-Maple Oatmeal.jpg"); // required
  const description = encodeURIComponent("Check this out!");

  const pinterestUrl =
    `https://www.pinterest.com/pin/create/button/?` +
    `url=${url}&media=${media}&description=${description}`;

  window.open(pinterestUrl, "_blank", "width=750,height=550");
});






/*
const pinit = document.querySelector("pinit");

function openPinterestShareWindow(pageUrl, imageUrl, descriptionText) {
    // URL-encode the parameters
    const pinterestUrl = 'https://www.pinterest.com/pin/create/button/' +
        '?url=' + encodeURIComponent(pageUrl) +
        '&media=' + encodeURIComponent(imageUrl) +
        '&description=' + encodeURIComponent(descriptionText);

    // Open the URL in a new pop-up window
    // Customize dimensions as needed
    window.open(pinterestUrl, 'pinterestShare', 'width=600,height=450');
}*/


/*
const pageUrl = document.querySelector("pageURL").getAttribute("name");
const imageUrl = document.querySelector("img").getAttribute("src");
const descriptionText = document.querySelector("description").getAttribute("name");
*/



/*
pinit.addEventListener("click", openPinterestShareWindow);
function openPinterestShareWindow(event) {
    const pageUrl = event.target.getAttribute("pageUrl");
    const imageUrl = event.target.getAttribute("imageUrl");
    const descriptionText = event.target.getAttribute("descriptionText")
   
    console.log(pageUrl)
    console.log(imageUrl)
    console.log(descriptionText)

    // URL-encode the parameters
    const pinterestUrl = 'https://www.pinterest.com/pin/create/button/' +
        '?url=' + encodeURIComponent(pageUrl) +
        '&media=' + encodeURIComponent(imageUrl) +
        '&description=' + encodeURIComponent(descriptionText);

    // Open the URL in a new pop-up window
    // Customize dimensions as needed
    window.open(pinterestUrl, 'pinterestShare', 'width=600,height=450');
}*/





function pinIt(page, img, description){
    const string = `http://pinterest.com/pin/create/button/?url=${page}&media=${img}&description=${description}`;
    window.location.href = string;
}



/* JUMP TO RECIPE*/
const jumpToRecipe = document.querySelector('jumpToRecipe');
const Recipe = document.getElementById('materials');
function scrollToRecipe() {
    console.log("HEY")
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
    quantities.forEach(element => {element.innerHTML = Number(element.getAttribute("value")) * Number(servings.innerHTML);})
    people.innerHTML = Number(people.getAttribute("value")) * Number(servings.innerHTML) 
}
function decreaseServing(){
    if(servings.innerHTML > 0){servings.innerHTML = Number(servings.innerHTML) - 1}
    else{servings.innerHTML = servings.innerHTML}
    quantities.forEach(element => {element.innerHTML = Number(element.getAttribute("value")) * Number(servings.innerHTML);})
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















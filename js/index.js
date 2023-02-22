document.addEventListener("DOMContentLoaded",()=>{
  /*
   get some variables from the document
  */
  const btnCard=document.querySelector(".card_btn");
  const faceFrontCard=document.querySelector(".face_front");
  const faceBackCard=document.querySelector(".face_back");

  btnCard.addEventListener("click",()=>{
    faceFrontCard.classList.add("turn_around_face_front");
    faceBackCard.classList.add("turn_around_face_back");
    console.log("hola")
  });

});
document.addEventListener("DOMContentLoaded",()=>{
  /*
   get some variables from the document
  */
  const messages={
      validation:{
        validationSelectImage:"Por favor seleccione la categoria de imagen.",
        validationSelectDificulty:"Por favor seleccione la dificultad del juego."
      },
      error:{},
      done:{}
    }

  const modalError=document.querySelector(".modal");

  const messageModal=document.querySelector(".message"); 
  const btnCardAll=[...document.querySelectorAll(".card_btn")];
  const faceFrontCardAll=[...document.querySelectorAll(".face_front")];
  const faceBackCardAll=[...document.querySelectorAll(".face_back")];

  const selectDificulty=document.querySelector(".select_type_dificulty");
  const selectImage=document.querySelector(".select_type_image");

  const btnInitGame=document.querySelector(".btn_init");

  function validateValuesInitials() {
    if(selectDificulty.value.toLowerCase()==="none"){
      return {select:"selectDificulty",result:false};
    }else if(selectImage.value.toLowerCase()==="none"){
      return {select:"selectImage",result:false};
    }
    return {select:"none",result:true};
  }

  function openModal(nodeModal) {
    nodeModal.classList.add("see__modal");
  }

  function initGame(){
    const responseValidation=validateValuesInitials();
    if(responseValidation.result===false &&  responseValidation.select==="selectImage"){
      messageModal.innerText=messages.validation.validationSelectImage;
    }else if(responseValidation.result===false &&  responseValidation.select==="selectDificulty"){
      messageModal.innerText=messages.validation.validationSelectDificulty;
    }
  }

  btnInitGame.addEventListener("click",()=>initGame());
  
  
  function openCard(e,index) {
    faceFrontCardAll[index].classList.add("turn_around_face_front");
    faceBackCardAll[index].classList.add("turn_around_face_back");
    console.log("hola")
  }

  btnCardAll.forEach((btnCard,i)=>{
    btnCard.addEventListener("click",(e)=>openCard(e,i));
  });

  

});
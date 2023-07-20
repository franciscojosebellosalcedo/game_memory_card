document.addEventListener("DOMContentLoaded", () => {
  /*
   get some variables from the document
  */
  const messages = {
    validation: {
      validationSelectImage: "Por favor seleccione la categoria de imagen.",
      validationSelectDificulty:
        "Por favor seleccione la dificultad del juego.",
    },
    error: {},
    done: {},
  };
  let array = [];

  let cards = null,
    faceFrontCards = null,
    faceBackCards = null,
    movements = 0,
    aux = 0,
    points = 0,
    time = null,
    timeReady = 3;

  const modalError = document.querySelector(".modal");
  const modalReady = document.querySelector(".modal__ready");
  const modalClose = document.querySelector(".modal__close-icon");
  const containerCards = document.querySelector(".game_cards");
  const messageModal = document.querySelector(".message");
  const messageModalready = document.querySelector(".message__ready");
  const selectDificulty = document.querySelector(".select_type_dificulty");
  const selectImage = document.querySelector(".select_type_image");
  const btnInitGame = document.querySelector(".btn_init");

  const nodePoints = document.querySelector(".points");
  const nodeTime = document.querySelector(".time");
  const nodeMovements = document.querySelector(".movements");

  nodePoints.innerHTML = points;
  nodeTime.innerHTML = "";
  nodeMovements.innerHTML = movements;

  function validateValuesInitials() {
    if (selectDificulty.value.toLowerCase() === "none") {
      return { select: "selectDificulty", result: false };
    } else if (selectImage.value === "none") {
      return { select: "selectImage", result: false };
    }
    return { select: "none", result: true };
  }

  function disableCards(arrayCards) {
    for (let i = 0; i < arrayCards.length; i++) {
      const card = arrayCards[i];
      card.setAttribute("disabled", true);
    }
  }

  function updatePoints() {
    points = points + 1;
    nodePoints.innerHTML = points;
  }
  function updateMovements() {
    movements = movements + 1;
    nodeMovements.innerHTML = movements;
  }

  function initGame() {
    const responseValidation = validateValuesInitials();
    if (
      responseValidation.result === false &&
      responseValidation.select === "selectImage"
    ) {
      messageModal.innerText = messages.validation.validationSelectImage;
      openModal(modalError);
    } else if (
      responseValidation.result === false &&
      responseValidation.select === "selectDificulty"
    ) {
      messageModal.innerText = messages.validation.validationSelectDificulty;
      openModal(modalError);
    } else {
      selectDificulty.setAttribute("disabled", true);
      selectImage.setAttribute("disabled", true);
      btnInitGame.setAttribute("disabled", true);
      openModal(modalReady);
      setInterval(() => {
        timeReady = timeReady - 1;
        if (timeReady === 0) {
          closeModal(modalReady);
          for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            card.removeAttribute("disabled");
          }
          setInterval(() => {
            time = time - 1;
            // AQUI DEBE DE TERMINAR TODO EL JUEGO
            nodeTime.innerHTML = time + " segundo";
          }, 1000);
        }
        messageModalready.innerHTML = timeReady;
      }, 1000);
    }
  }

  btnInitGame.addEventListener("click", () => initGame());
  function createCard(amountCard) {
    if (amountCard === 0) {
      containerCards.innerHTML = "";
      return;
    }
    containerCards.innerHTML = "";
    let template = "";
    for (let i = 1; i <= amountCard; i++) {
      array.push(i, i);
    }
    array = array.sort(() => Math.random() - 0.5);
    for (let i = 0; i < array.length; i++) {
      const number = array[i];
      let element = `
        <div class="card">
          <button title="Tarjeta de juego" class="card_btn" data-id=${number}>
            <div class="face_front"></div>
            <div class="face_back">
              <img class="card_img" src="" alt="imagen">
            </div>
          </button>
        </div>
      `;
      template += element;
    }
    containerCards.innerHTML = template;
    const btnCardAll = [...document.querySelectorAll(".card_btn")];
    const faceFrontCardAll = [...document.querySelectorAll(".face_front")];
    const faceBackCardAll = [...document.querySelectorAll(".face_back")];
    cards = btnCardAll;
    faceBackCards = faceBackCardAll;
    faceFrontCards = faceFrontCardAll;
    disableCards(cards);

    let arrayCardSelected = [];
    let arrayIndex = [];

    cards.map((btnCard, i) => {
      btnCard.addEventListener("click", (e) => {
        faceFrontCards[i].classList.add("turn_around_face_front");
        faceBackCards[i].classList.add("turn_around_face_back");
        btnCard.setAttribute("disabled", true);
        if (aux === 0) {
          arrayCardSelected.push(btnCard);
          arrayIndex.push(i);
          aux++;
        } else {
          arrayIndex.push(i);
          arrayCardSelected.push(btnCard);
          updateMovements();
          aux = 0;

          if (arrayCardSelected[0].dataset.id === arrayCardSelected[1].dataset.id) {
            faceFrontCards[arrayIndex[0]].classList.add("turn_around_face_front");
            faceBackCards[arrayIndex[0]].classList.add("turn_around_face_back");
  
            faceFrontCards[arrayIndex[1]].classList.add("turn_around_face_front");
            faceBackCards[arrayIndex[1]].classList.add("turn_around_face_back");
            updatePoints();
            arrayIndex=[];
          }else{
            if (arrayIndex.length>1) {
              setTimeout(async()=>{
                
              faceFrontCards[arrayIndex[0]].classList.remove("turn_around_face_front");
              faceBackCards[arrayIndex[0]].classList.remove("turn_around_face_back");
  
              faceFrontCards[arrayIndex[1]].classList.remove("turn_around_face_front");
              faceBackCards[arrayIndex[1]].classList.remove("turn_around_face_back");
              arrayIndex=[];
            },150);
            }

            for (let j = 0; j < arrayCardSelected.length; j++) {
              const cardSelected = arrayCardSelected[j];
              cardSelected.removeAttribute("disabled");
            }
            
          }
          
          arrayCardSelected=[];
          
        }

      });
    });
  }

  function handlerSelectDificulty() {
    const valueSelect = selectDificulty.value;
    switch (valueSelect) {
      case "easy":
        containerCards.classList.remove("level_mediu");
        containerCards.classList.remove("level_difficult");
        containerCards.classList.add("level_easy");
        createCard(10);
        time = 20;
        break;

      case "mediun":
        containerCards.classList.remove("level_easy");
        containerCards.classList.remove("level_difficult");
        containerCards.classList.add("level_mediu");
        createCard(15);
        time = 25;
        break;

      case "difficult":
        containerCards.classList.remove("level_easy");
        containerCards.classList.remove("level_mediu");
        containerCards.classList.add("level_difficult");
        createCard(24);
        time = 30;
        break;

      default:
        containerCards.classList.remove("level_easy");
        containerCards.classList.remove("level_mediu");
        containerCards.classList.remove("level_difficult");
        createCard(0);
        break;
    }
  }

  function setImageCard(typeImage) {
    const listImage = [...document.querySelectorAll(".card_img")];
    for (let i = 0; i < listImage.length; i++) {
      const cardImg = listImage[i];
      const numberImage = cards[i].dataset.id;
      cardImg.setAttribute("src", `./imgs/${typeImage}/img${numberImage}.png`);
    }
  }

  function handlerSelectImage() {
    const valueSelect = selectImage.value;
    switch (valueSelect) {
      case "programming":
        setImageCard(valueSelect);
        break;

      case "fruits":
        setImageCard(valueSelect);
        break;

      case "animals":
        setImageCard(valueSelect);
        break;

      case "ocupation":
        setImageCard(valueSelect);
        break;
    }
  }

  selectImage.addEventListener("input", () => handlerSelectImage());

  selectDificulty.addEventListener("input", () => handlerSelectDificulty());

  function openModal(nodeModal) {
    nodeModal.classList.add("see__modal");
  }

  function closeModal(nodeModal) {
    nodeModal.classList.remove("see__modal");
  }

  modalClose.addEventListener("click", () => closeModal(modalError));
});

(function onLoad() {
  const cards = window.document.querySelector(".cards");
  let items = JSON.parse(window.localStorage.getItem("items"));
  items.map((item) => cards.append(addCard(item)));
}());

const btnSetup = document.getElementById('btn-setup');
btnSetup.addEventListener('click', () => {
    const data = [
      {
        "name": "Огурец",
        "description": "Свежий, зеленый",
        "img": "imgs/cucumber.jpg",
        "code": "0237",
        "provider": "Волжская грядка"
      },
      {
        "name": "Помидор",
        "description": "Красный, идеальный",
        "img": "imgs/tomat.jpg",
        "code": "3422",
        "provider": "Африканская грядка"
      },
      {
        "name": "Капуста",
        "description": "Один початок",
        "img": "imgs/cabbage.png",
        "code": "3453",
        "provider": "Поля Франции"
      }
    ];
    const cards = window.document.querySelector(".cards");
    data.map((item) => cards.append(addCard(item)));
    window.localStorage.setItem("items", JSON.stringify(data));
    window.location.reload();
  });

const form = document.querySelector('.main-form');   
form.addEventListener("submit", addItem);
function addItem(e){
  e.preventDefault();
  const cards = window.document.querySelector(".cards");
  const items = JSON.parse(window.localStorage.getItem("items"));
  const item = {};
  const inputs = e.target.querySelectorAll("input");
  inputs.forEach((res) => (item[res.id] = res.value));
  items.push(item);
  window.localStorage.setItem("items", JSON.stringify(items));
  //console.log("addItem", item);
  cards.append(addCard(item));
  inputs.forEach((res) => (res.value = ""));
};

function addCard(item) {
  const cardImg = document.createElement('img');
  cardImg.classList.add('card-img');
  cardImg.src = item.img;
  cardImg.style.width = "100px";
  
  const cardName = document.createElement("h5");
  cardName.classList.add("card-name");
  cardName.append(document.createTextNode(item.name));
  cardName.style.display = "flex";
  
  let boldText = document.createElement('strong');
  const cardDescription = document.createElement("div");
  cardDescription.classList.add("card-description");
  boldText.append(document.createTextNode("Описание: "));
  cardDescription.append(boldText);
  cardDescription.append(document.createTextNode(item.description));
  cardDescription.style.position = "relative";
  
  boldText = document.createElement('strong');
  const cardProvider = document.createElement("div");
  cardProvider.classList.add("card-provider");
  boldText.append(document.createTextNode("Поставщик: "));
  cardProvider.append(boldText);
  cardProvider.append(document.createTextNode(item.provider));
  
  boldText = document.createElement('strong')
  const cardCode = document.createElement("p");
  cardCode.classList.add("card-code");
  boldText.append(document.createTextNode("Код товара: "));
  cardCode.append(boldText);    
  cardCode.append(document.createTextNode(item.code));

  const buttons = document.createElement("div");
  buttons.classList.add("btns-change");
  const editBtn = createButton(true, item);
  const deleteBtn = createButton(false, item);
  buttons.append(editBtn);
  buttons.append(deleteBtn);
  
  const info = document.createElement("div");
  info.classList.add(".card-info");
  info.append(cardImg);
  info.append(cardName);
  info.style.display = "flex";
  info.style.justifyContent = "space-around";

  const infoAdd = document.createElement("div");
  infoAdd.append(cardDescription);
  infoAdd.append(cardProvider);
  infoAdd.append(cardCode);
      
  const card = document.createElement("div");
  card.style.width = '18rem';
  card.classList.add("card");
  card.id = item.code;
  card.append(info);
  card.append(infoAdd);
  card.append(buttons);
  
  return card;
}

function createButton(isEdit, item){
  let textNode = "Удалить";
  let classBtn = "btn-danger";
  if(isEdit)
  {
    textNode = "Изменить";
    classBtn = "btn-primary";
  }
  const newBtn = document.createElement("button");
  newBtn.addEventListener("click", (e) => 
  {
    e.preventDefault();
    if(isEdit)
    {
      editItem(item);
    }
    else
    {
      deleteItem(item.code);
    }
  });
  newBtn.append(document.createTextNode(textNode));
  newBtn.classList.add('btn');
  newBtn.classList.add(classBtn);
  return newBtn;
}

let curEditCode;
function editItem(data) {
  const inputs = form.querySelectorAll("input");
  inputs.forEach((item) => (item.value = data[item.id]));
  const saveBtn = document.getElementById("btn-save");
  saveBtn.textContent = "Редактировать";
  form.removeEventListener("submit", addItem);
  form.addEventListener('submit', editCard);
  curEditCode = data.code;
}

function editCard(e){
    e.preventDefault();
    deleteItem(curEditCode);
    addItem(e);
    
    form.removeEventListener("submit", editCard);
    const saveBtn = document.getElementById("btn-save");
    saveBtn.textContent = "Добавить";
    form.addEventListener("submit", addItem);  
  }

function deleteItem(code) {
  let card = document.getElementById(code);
  let items = JSON.parse(window.localStorage.getItem("items"));
  //console.log(cards);
  const otherItems = items.filter((item) => item.code !== code);
  //console.log("Other", otherItems);
  window.localStorage.setItem("items", JSON.stringify(otherItems));
  card.remove();
}
  
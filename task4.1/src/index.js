(function onLoad(){
  getCreatorInfo();
  const cards = document.querySelector(".cards");
  getItems().then((items) => items.map((item) => cards.append(addCard(item)))); 
}());

function loadData() {
  document.querySelector('.loader').style.display = 'flex';
}

function endLoadData() {
  document.querySelector('.loader').style.display = 'none';
}

async function getCreatorInfo() {
  const info = await fetch(' http://localhost:3000/creatorInfo');
  const info_json = await info.json();
  const creatorInfo = window.document.querySelector('.creatorInfo');
  creatorInfo.innerHTML = `${info_json.name} ${info_json.group}`;
}

const btnSetup = document.getElementById('btn-setup');
btnSetup.addEventListener('click', () => {
   const data = [
    {
      "id": "1",
      "name": "Огурец",
      "description": "Свежий, зеленый",
      "img": "imgs/cucumber.jpg",
      "code": "0237",
      "provider": "Волжская грядка"
    },
    {
      "id": "2",
      "name": "Помидор",
      "description": "Красный, идеальный",
      "img": "imgs/tomat.jpg",
      "code": "3422",
      "provider": "Африканская грядка"
    },
    {
      "id": "3",
      "name": "Капуста",
      "description": "Один початок",
      "img": "imgs/cabbage.png",
      "code": "3453",
      "provider": "Поля Франции"
    }
   ];

   deleteAll();
   data.forEach(item => createCard(item));
  });

let isNotEdit = true;
const form = document.querySelector('.main-form');   
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (isNotEdit) {
      const new_item = {};
      const inputs = e.target.querySelectorAll("input");
      inputs.forEach((item) => (new_item[item.id] = item.value));
      createCard(new_item);
      inputs.forEach((item) => (item.value = ""));
    }
  });

async function getItems(){
  loadData();
  const items = await fetch('http://localhost:3000/items');
  const data = await items.json();
  endLoadData();
  return data;
}

function createCard(newItem){
  const cards = document.querySelector(".cards");
  addItem(newItem).then((item) => cards.append(addCard(item)));
}

async function addItem(data){
  loadData();
  const item = await fetch('http://localhost:3000/items', 
  {
    method:'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
  },
  body:JSON.stringify(data)}).then((item) => 
  {
    return item.json()
  }).catch((e) => console.error(e));
  endLoadData();
  return item;
}

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

  boldText = document.createElement('strong');
  const cardId = document.createElement("p");
  cardId.classList.add("id");
  boldText.append(document.createTextNode("ID: "));
  cardId.append(boldText);
  cardId.append(document.createTextNode(item.id));

  const buttons = document.createElement("div");
  buttons.classList.add("btns-change");
  const editBtn = createButton(false, item);
  const deleteBtn = createButton(true, item);
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
  card.id = item.id;
  card.append(cardId);
  card.append(info);
  card.append(infoAdd);
  card.append(buttons);
  
  return card;
}

const createButton = (isDelete, item) => {
  let textNode = "Изменить";
  let classBtn = "btn-primary";
  if(isDelete)
  {
    textNode = "Удалить";
    classBtn = "btn-danger";
  }
  const newBtn = document.createElement("button");
  newBtn.addEventListener("click", (e) => 
  {
    e.preventDefault();
    if(isDelete)
      deleteCard(item.id);
    else
      editCard(item);
  });
  newBtn.append(document.createTextNode(textNode));
  newBtn.classList.add('btn');
  newBtn.classList.add(classBtn);
  return newBtn;
}

function editCard(data) {
  isNotEdit = false;
  const inputs = form.querySelectorAll("input");
  inputs.forEach((item) => (item.value = data[item.id]));
  const saveBtn = document.getElementById("btn-save");
  saveBtn.textContent = "Редактировать";
  form.addEventListener('submit', (e) =>
  {
    e.preventDefault();
    const edit_item = {}; 
    inputs.forEach((item) => (edit_item[item.id] = item.value));
    edit_item.id = data.id;  
    editItem(edit_item);
    inputs.forEach((item) => (item.value = ""));
    const itemToChange = document.getElementById(edit_item.id);
    itemToChange.querySelector('.card-img').src = edit_item.img;
    itemToChange.querySelector('.card-name').textContent = edit_item.name;

    let boldText = document.createElement('strong');
    boldText.textContent = "Описание: ";
    itemToChange.querySelector('.card-description').textContent = "";
    itemToChange.querySelector('.card-description').append(boldText, edit_item.description);

    boldText = document.createElement('strong');
    boldText.textContent = "Поставщик: ";
    itemToChange.querySelector('.card-provider').textContent = "";
    itemToChange.querySelector('.card-provider').append(boldText, edit_item.provider);

    boldText = document.createElement('strong');
    boldText.textContent = "Код товара: ";
    itemToChange.querySelector('.card-code').textContent = "";
    itemToChange.querySelector('.card-code').append(boldText, edit_item.code);
    
    saveBtn.textContent = "Добавить";
    isNotEdit = true;
  }, {once:true});
}

async function editItem(data){
  loadData();
  await fetch(`http://localhost:3000/items/${data.id}`, 
  {
    method:'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
  },
  body: JSON.stringify(data)
  }).then((item) =>  
  {
    endLoadData();
    return item.json()
  }).catch((e) => console.error(e));
}

function deleteCard(id) {
  const item = document.getElementById(id);
  deleteItem(id);
  item.remove();
}

async function deleteItem(id){
  loadData();
  await fetch(`http://localhost:3000/items/${id}`,{
    method: 'DELETE'
  });
  endLoadData();
}

function deleteAll(){
  getItems().then((data) => data.forEach((item) => deleteCard(item.id)));
}
  
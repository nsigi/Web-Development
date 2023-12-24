(function onLoad(){
  const itemsContainer = document.querySelector(".cards");
  getItems().then((items) => items.map((res) => itemsContainer.append(addCard(res)))); 
}());

const btnSetup = document.getElementById('btn-setup');
btnSetup.addEventListener('click', () => {
   const data = [
    {
      "id": 1,
      "name": "Огурец",
      "description": "Свежий, зеленый",
      "img": "imgs/cucumber.jpg",
      "code": "0237",
      "provider": "Волжская грядка"
    },
    {
      "id": 2,
      "name": "Помидор",
      "description": "Красный, идеальный",
      "img": "imgs/tomat.jpg",
      "code": "3422",
      "provider": "Африканская грядка"
    },
    {
      "id": 3,
      "name": "Капуста",
      "description": "Один початок",
      "img": "imgs/cabbage.png",
      "code": "3453",
      "provider": "Поля Франции"
    }
   ];

   deleteAll().then(() => data.forEach(item => createItem(item))).then(() => window.location.reload())
  });

let isEdit = false;
const form = document.querySelector('.main-form');   
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!isEdit) {
      const obj = {};
      const inputs = e.target.querySelectorAll("input");
      inputs.forEach((item) => (obj[item.id] = item.value));
      createItem(obj);
      inputs.forEach((item) => (item.value = ""));
    }
  });

async function getItems(){
  const items = await fetch('http://localhost:3000/items');
  const data = await items.json();
  return data;
}

async function getItem(id){
  const item = await fetch(`http://localhost:3000/items/${id}`);
  const data =  item.json();
  return data;
}

function createItem(obj){
  const cardsContainer = document.querySelector(".cards");
  addItem(obj).then((item) => cardsContainer.append(addCard(item)));
}

async function addItem(data){
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
  return item;
}

function addCard({name, img, description, id, provider, code}) {
  const cardImg = document.createElement('img');
  cardImg.classList.add('card-img');
  cardImg.src = img;
  cardImg.style.width = "100px";
  
  const cardName = document.createElement("h5");
  cardName.classList.add("card-name");
  cardName.append(document.createTextNode(name));
  cardName.style.display = "flex";
  
  let boldText = document.createElement('strong');
  const cardDescription = document.createElement("div");
  cardDescription.classList.add("card-description");
  boldText.append(document.createTextNode("Описание: "));
  cardDescription.append(boldText);
  cardDescription.append(document.createTextNode(description));
  cardDescription.style.position = "relative";
  
  boldText = document.createElement('strong');
  const cardProvider = document.createElement("div");
  cardProvider.classList.add("card-provider");
  boldText.append(document.createTextNode("Поставщик: "));
  cardProvider.append(boldText);
  cardProvider.append(document.createTextNode(provider));
  
  boldText = document.createElement('strong')
  const cardCode = document.createElement("p");
  cardCode.classList.add("card-code");
  boldText.append(document.createTextNode("Код товара: "));
  cardCode.append(boldText);    
  cardCode.append(document.createTextNode(code));

  boldText = document.createElement('strong');
  const cardId = document.createElement("p");
  cardId.classList.add("id");
  boldText.append(document.createTextNode("ID: "));
  cardId.append(boldText);
  cardId.append(document.createTextNode(id));

  const buttons = document.createElement("div");
  buttons.classList.add("btns-change");
  const editBtn = createButton(true, name, img, description, id, provider);
  const deleteBtn = createButton(false, name, img, description, id, provider);
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
  card.id = id;
  card.append(cardId);
  card.append(info);
  card.append(infoAdd);
  card.append(buttons);
  
  return card;
}

const createButton = (isEdit, name, img, description, id) => {
  let textNode = "Delete";
  let classBtn = "btn-danger";
  if(isEdit)
  {
    textNode = "Edit";
    classBtn = "btn-primary";
  }
  const newBtn = document.createElement("button");
  newBtn.addEventListener("click", (e) => 
  {
    e.preventDefault();
    if(isEdit)
    {
      getItem(id).then((res) => editItem(res, id));
    }
    else
    {
      deleteItem(id);
    }
  });
  newBtn.append(document.createTextNode(textNode));
  newBtn.classList.add('btn');
  newBtn.classList.add(classBtn);
  return newBtn;
}

function editItem(data, id) {
  isEdit = true;
  const inputs = form.querySelectorAll("input");
  inputs.forEach((item) => (item.value = data[item.id]));
  const saveBtn = document.getElementById("btn-save");
  saveBtn.textContent = "Редактировать";
  form.addEventListener('submit', (e) =>
  {
    e.preventDefault();
    const obj = {}; 
    inputs.forEach((item) => (obj[item.id] = item.value));
    obj.id = id;  
    editCard(obj);
    inputs.forEach((item) => (item.value = ""));
    const itemToChange = document.getElementById(data.id);
    itemToChange.querySelector('.card-img').src = obj.img;
    itemToChange.querySelector('.card-name').textContent = obj.name;

    let boldText = document.createElement('strong');
    boldText.textContent = "Описание: ";
    itemToChange.querySelector('.card-description').textContent = "";
    itemToChange.querySelector('.card-description').append(boldText, obj.description);

    boldText = document.createElement('strong');
    boldText.textContent = "Поставщик: ";
    itemToChange.querySelector('.card-provider').textContent = "";
    itemToChange.querySelector('.card-provider').append(boldText, obj.provider);

    boldText = document.createElement('strong');
    boldText.textContent = "Код товара: ";
    itemToChange.querySelector('.card-code').textContent = "";
    itemToChange.querySelector('.card-code').append(boldText, obj.code);
    
    saveBtn.textContent = "Добавить";
    isEdit = false;
  }, {once:true});
}

async function editCard(data){
  await fetch(`http://localhost:3000/items/${data.id}`, 
  {
    method:'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
  },
  body: JSON.stringify(data)
  }).then((item) =>  
  {
    return item.json()
  }).catch((e) => console.error(e));
}

  function deleteItem(id) {
    const item = document.getElementById(id);
    deleteItemM(id);
    item.remove();
  }

  async function deleteItemM(id){
    await fetch(`http://localhost:3000/items/${id}`,{
      method: 'DELETE'
    });
  }

  function deleteAll(){
    return getItems().then((data) => data.forEach((item) => deleteItemM(item.id)))
  }
  
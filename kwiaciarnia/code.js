//funkcje operowania tabeli

const { ipcRenderer } = require('electron');

fs = require('fs');
let data = [];

class record{
  constructor(imie){
    this.imie = imie;
  }
}

var n;

function displayData(tryb)
{
  if(tryb == 0) n = 0;
  else if(tryb == 1) n = n;
  else if(tryb == 2) n = data.length - data.length%50;

  const dataTable = document.getElementById('data_table');
  dataTable.innerHTML = '';

  let y = 0;
  for(let i = n; i<data.length; i++)
  {
    y++;
    const newRow = createTableRow(data[i], i);
    dataTable.append(newRow);

    if(y == 50)break;
  }

  const wiersz = document.createElement("p");
  wiersz.style.cssText = 'display: grid; justify-content: center; align-content: center; grid-template-columns: 30px repeat(8, 150px); grid-template-rows: 30px; margin: 0px;';

  var nic1 = document.createElement("button");
  var nic2 = document.createElement("button");
  var pop = document.createElement("button");
  var nast = document.createElement("button");

  nic1.style.cssText ="opacity: 0;";
  nic2.style.cssText ="opacity: 0; grid-column: span 6;";
  pop.classList.add('cos1_75');
  pop.innerHTML = "<- Poprzedni";
  pop.setAttribute('onclick', 'pop()');
  nast.classList.add('cos1_75');
  nast.innerHTML = "Następny ->";
  nast.setAttribute('onclick', 'nast()');

  wiersz.append(nic1, pop, nic2, nast);
  dataTable.append(wiersz);
}

function createTableRow(data, nwm){
  const wiersz = document.createElement("p");
  var usu = document.createElement("button");

  let cos = 'delRow(' + nwm + ')';
  
  const col = new Array(8);

  for(var i = 0; i < 8; i++)
  {
    if(i == 0)
    {
      usu.innerHTML = "-";
      usu.classList.add('nwm');
      usu.setAttribute('onclick', cos);
      wiersz.append(usu);
    }
    col[i] = document.createElement("button");
    col[i].innerHTML = data.imie[i];
    if(nwm%2 == 0) col[i].style.cssText = 'color: whitesmoke; font-weight: normal; font-size: 1rem; border-width: 1px; border-color: black; outline: none; background-color: rgba(120, 180, 220, 0.842);';
    else col[i].style.cssText = 'color: whitesmoke; font-weight: normal; font-size: 1rem; border-width: 1px; border-color: black; outline: none; background-color: rgba(40, 144, 214, 0.8);';
    wiersz.append(col[i]);
  }

  wiersz.style.cssText = 'display: grid; justify-content: center; align-content: center; grid-template-columns: 30px repeat(8, 150px); grid-template-rows: 30px; margin: 0px;';

  return wiersz;
}

function pop()
{
  n -= 50;
  if(n < 0) n = 0;
  displayData(1)
}

function nast()
{
  n += 50;
  if(n > data.length) n -=50;
  displayData(1);
}

function addRow(){
  const inputName = new Array(8);
  const name = new Array(8);
  
  inputName[0] = document.getElementById('input_imie');
  name[0] = inputName[0].value;
  inputName[1] = document.getElementById('input_rodzaj');
  name[1] = inputName[1].value;
  inputName[2] = document.getElementById('input_kolor');
  name[2] = inputName[2].value;
  inputName[3] = document.getElementById('input_cena');
  name[3] = inputName[3].value;
  inputName[4] = document.getElementById('input_sztuki');
  name[4] = inputName[4].value;
  inputName[5] = document.getElementById('input_nwm');
  name[5] = inputName[5].value;
  inputName[6] = document.getElementById('input_bool1');
  if(inputName[6].checked) name[6] = "Tak";
  else name[6] = "Nie";
  inputName[7] = document.getElementById('input_bool2');
  if(inputName[7].checked) name[7] = "Tak";
  else name[7] = "Nie";

  for(var i = 0; i < 6; i++) 
  {
    if(i != 0)inputName[i - 1].style.cssText = "color: black;";
    if(!inputName[i].checkValidity())
    { 
      inputName[i].style.cssText = "color: red;";
      inputName[i].value = "zły format danych";
      return;
    }
  }

  //for(var i = 0; i < 6; i++) inputName[i].style.cssText = "color: black;";

  const dataObj = new record(name);

  data.push(dataObj);
  displayData(2);
}

function delRow(n){
  /*const inputRowNo = document.getElementById('row_no');
  const n = parseInt(inputRowNo.value);*/
  data.splice(n,1);
  displayData(1);
}

function saveData(){
  const jsonData = JSON.stringify(data);
  fs.writeFileSync('data.txt', jsonData);
}

function loadData(){
  const jsonData = fs.readFileSync('data.txt');
  data = JSON.parse(jsonData);
  displayData(0);
}

function randomText(){
  const alphabet = 'qwertyuiopasdfghjklzxcvbnm';
  const alph = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  const length = alphabet.length;
  let text = '';
  const index = Math.round(Math.random() * length);
  const char = alph.charAt(index);
  text+=char;
  for(let i=0; i < 3 + Math.round((Math.random() * 4)); i++){
    const index = Math.round(Math.random() * length);
    const char = alphabet.charAt(index);
    text+=char;
  }
  return text;
}

function randomNum(max) { return Math.round(Math.random() * max) + 1; }

function randomNum2(max) { return Math.round(Math.random() * max); }

function randomBool()
{
  let text;
  if(Math.round(Math.random()) == 0) text = "Tak";
  else text = "Nie";
  return text;
}

function randomData()
{
  const randNo1 = document.getElementById('rand_no');
  data = [];

  if(!randNo1.checkValidity()) return;

  const randNo = parseInt(randNo1.value);

  for(let i =0; i< randNo; i++)
  {
    const name = new Array(8);

    var num = randomNum2(9);
    var num2;
    if(num < 10) num2 = "0" + num;

    for(var n = 0; n < 8; n++)
    {
      if(n < 3) name[n] = randomText();
      else if(n < 4) name[n] = randomNum(99) + "." + num2;
      else if(n < 5) name[n] = randomNum2(999);
      else if(n < 6) name[n] = randomNum(79);
      else name[n] = randomBool();
    }

    const dataObj = new record(name);
    data.push(dataObj);
  }

  displayData(0);
}

function usu2() { for(var i = 0; i < Math.floor(data.length + 1/2); i++) delRow(i); }

//Funkcje operownai Popupu

function show()
{
  const modal = document.getElementById('modal');
  openModal(modal);
}

function zamknij()
{
  const modal = document.getElementById('modal');

  const dataTable = document.getElementById('data_table1');
  dataTable.innerHTML = '';

  data2 = [];
  
  var id = "input_bool0";
  for(var i = 0; i < 8; i++)
  {
    id += i+1;
    document.getElementById(id).checked = false;
    id = "input_bool0";
  }

  document.getElementById('input_imie1').value = "";
  document.getElementById('input_rodzaj1').value = "";
  document.getElementById('input_kolor1').value = "";
  document.getElementById('input_cena1').value = "";
  document.getElementById('input_sztuki1').value = "";
  document.getElementById('input_nwm1').value = "";
  document.getElementById('input_bool11').checked = false;
  document.getElementById('input_bool21').checked = false;
  document.getElementById('OrAnd').innerHTML = "AND";

  closeModal(modal);
}

function openModal(modal) 
{
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal) 
{
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

function OrAnd()
{
  const nwm = document.getElementById('OrAnd');
  if(nwm.innerHTML == "AND") nwm.innerHTML = "OR";
  else nwm.innerHTML = "AND";
}

let data2 = [];

function liniowe(OrAnd, TakNie, name)
{
  let wcz = performance.now();
  if(OrAnd == "AND")
  {
    var kol = 1;
    var n = 0;
    for(let i=0; i<data.length; i++)
    {
      for(var m = 0; m < TakNie.length; m++)
      {
        if(data[i].imie[TakNie[m]] != name[TakNie[m]]) kol = 0;
      }
      if(kol == 1) data2.push(data[i]);
      kol = 1;
    }
  }
  else
  {
    var c = 0;
    for(var m = 0; m < TakNie.length; m++)
    {
      for(let i=0; i<data.length; i++)
      {
        if(data[i].imie[TakNie[m]] == name[TakNie[m]])
        {
          for(let h = 0; h < data2.length; h++)
          {
            if(data2[h] == data[i])
            {
              c = 1;
              break;
            }
          }
          if(c == 0) data2.push(data[i]);
          else c = 0;
        }
      }
    }
  }
  wcz = performance.now() - wcz;
  console.log(wcz);
}

function binarne(data3, name, TakNie, OrAnd)
{
  let wcz;
  var data4 = [];
  data2 = [];
  for(var iter = 0; iter < TakNie.length; iter++)
  {
    data3 = quickSort(data3, 0, data3.length - 1, TakNie[iter]);
    wcz = performance.now();
    //for(var i = 0; i < data3.length; i++) console.log(data3[i].imie[0] + " " + i);
    data2 = [];

    var piv = Math.floor(data3.length/ 2);
    var lewo = 0;
    var prawo = data3.length - 1;

    //console.log("iter " + iter);
    var cos = 0;

    while(0==0)
    {
      if(data3[piv].imie[TakNie[iter]] == name[TakNie[iter]]) break;
      else if(data3[piv].imie[TakNie[iter]] > name[TakNie[iter]]) 
      {
        if(prawo == piv) 
        {
          cos++;
          if(cos > 3) piv--;
          if(cos > 5) break;
        }
        else
        {
          prawo = piv;
          piv = Math.floor((piv + lewo) / 2) - 1;
          cos = 0;
        }
      }
      else if(data3[piv].imie[TakNie[iter]] <= name[TakNie[iter]]) 
      {
        if(lewo == piv)
        {
          cos++;
          if(cos > 3) piv++;
          if(cos > 5) break;
        }
        else
        {
          lewo = piv;
          piv = Math.floor((piv + prawo) / 2) + 1;
          cos = 0;
        }
      }
    }

    for(var i = piv -1; i >= 0; i--)
    {
      if(data3[i].imie[TakNie[iter]] == name[TakNie[iter]]) data2.push(data3[i]);
      else break;
    }

    for(var k = piv; k < data3.length; k++)
    {
      if(data3[k].imie[TakNie[iter]] == name[TakNie[iter]]) data2.push(data3[k]);
      else break;
    }

    if(OrAnd == "AND")
    {
      data3 = [];
      for(var i = 0; i < data2.length; i++) data3.push(data2[i]);
    }
    else
    {
      var c = 0;
      for(let i=0; i<data2.length; i++)
      {
        for(let h = 0; h < data4.length; h++)
        {
          if(data4[h] == data2[i])
          {
            c = 1;
            break;
          }
        }
        if(c == 0) data4.push(data2[i]);
        else c = 0;
      }
    }
  }
  if(OrAnd == "OR") data2 = data4;
  wcz = performance.now() - wcz;
  console.log(wcz);
  return data2;
}

function wyszukaj()
{
  const TakNie = [];
  const inputName = new Array(8);
  const name = new Array(8);
  const OrAnd = document.getElementById('OrAnd');
  const sort = document.getElementById('sortowanie')
  data2 = [];

  var id = "input_bool0";
  for(var i = 0; i < 8; i++)
  {
    id += i+1;
    if(document.getElementById(id).checked) TakNie.push(i);
    id = "input_bool0";
  }
  
  inputName[0] = document.getElementById('input_imie1');
  name[0] = inputName[0].value;
  inputName[1] = document.getElementById('input_rodzaj1');
  name[1] = inputName[1].value;
  inputName[2] = document.getElementById('input_kolor1');
  name[2] = inputName[2].value;
  inputName[3] = document.getElementById('input_cena1');
  name[3] = inputName[3].value;
  inputName[4] = document.getElementById('input_sztuki1');
  name[4] = inputName[4].value;
  inputName[5] = document.getElementById('input_nwm1');
  name[5] = inputName[5].value;
  inputName[6] = document.getElementById('input_bool11');
  if(inputName[6].checked) name[6] = "Tak";
  else name[6] = "Nie";
  inputName[7] = document.getElementById('input_bool21');
  if(inputName[7].checked) name[7] = "Tak";
  else name[7] = "Nie";

  for(var i = 0; i < 6; i++) 
  {
    if(i != 0)inputName[i - 1].style.cssText = "color: black;";
    if(!inputName[i].checkValidity() && TakNie[i] == "Tak")
    { 
      inputName[i].style.cssText = "color: red;";
      inputName[i].value = "zły format danych";
      return;
    }
  }

  if(sort.value == "Liniowe") liniowe(OrAnd.innerHTML, TakNie, name);
  else if(sort.value == "Binarne")
  {
    for(var i = 0; i < data.length; i++) data2.push(data[i]);
    binarne(data2, name, TakNie, OrAnd.innerHTML);
  }
  else if(sort.value == "Łańcuchowe")
  {
    Lancuchowe(name[TakNie[0]], TakNie[0]);
  }

  displayData1(0);
}

var m;

function displayData1(tryb)
{
  if(tryb == 0) m = 0;
  else if(tryb == 1) m = m;

  const dataTable = document.getElementById('data_table1');
  dataTable.innerHTML = '';

  let y = 0;
  for(let i = m; i<data2.length; i++)
  {
    y++;
    const newRow = createTableRow1(data2[i], i);
    dataTable.append(newRow);

    if(y == 50)break;
  }

  if(dataTable.innerHTML == '' && tryb == 0)
  {
    const wiersz = document.createElement("p");
    wiersz.style.cssText = 'display: grid; justify-content: center; align-content: center; grid-template-columns: repeat(8, 150px); grid-template-rows: 30px; margin: 0px;';
    const nwm = document.createElement("button");
    nwm.innerHTML = "Brak wyników wyszukiwania";
    nwm.style.cssText = 'grid-column: span 8; justify-content: center; color: whitesmoke; font-weight: normal; font-size: 1.5rem; border-width: 1px; border-color: black; outline: none; background-color: red;';
    wiersz.append(nwm);
    dataTable.append(wiersz);
  }
  else
  {
    const wiersz = document.createElement("p");
    wiersz.style.cssText = 'display: grid; justify-content: center; align-content: center; grid-template-columns: repeat(8, 150px); grid-template-rows: 30px; margin: 0px;';
  
    var nic2 = document.createElement("button");
    var pop = document.createElement("button");
    var nast = document.createElement("button");

    nic2.style.cssText ="opacity: 0; grid-column: span 6; margin: 0px";
    pop.classList.add('cos1_75');
    pop.innerHTML = "<- Poprzedni";
    pop.setAttribute('onclick', 'pop1()');
    nast.classList.add('cos1_75');
    nast.innerHTML = "Następny ->";
    nast.setAttribute('onclick', 'nast1()');
  
    wiersz.append(pop, nic2, nast);
    dataTable.append(wiersz);
  }
}

function pop1()
{
  m -= 50;
  if(m < 0) m = 0;
  displayData1(1)
}

function nast1()
{
  m += 50;
  if(m > data2.length) m -=50;
  displayData1(1);
}


function createTableRow1(data, nwm){
  const wiersz = document.createElement("p");
  const col = new Array(8);
  if(data == null) return;

  for(var i = 0; i < 8; i++)
  {
    col[i] = document.createElement("button");
    col[i].innerHTML = data.imie[i];
    if(nwm%2 == 0) col[i].style.cssText = 'color: whitesmoke; font-weight: normal; font-size: 1rem; border-width: 1px; border-color: black; outline: none; background-color: rgba(120, 180, 220, 0.842);';
    else col[i].style.cssText = 'color: whitesmoke; font-weight: normal; font-size: 1rem; border-width: 1px; border-color: black; outline: none; background-color: rgba(40, 144, 214, 0.8);';
    wiersz.append(col[i]);
  }

  wiersz.style.cssText = 'display: grid; justify-content: center; align-content: center; grid-template-columns: repeat(8, 150px); grid-template-rows: 30px; margin: 0px; width: 1200px';

  return wiersz;
}

//sortowanie

function swap(myData, leftIndex, rightIndex)
{
  var temp = myData[leftIndex];
  myData[leftIndex] = myData[rightIndex];
  myData[rightIndex] = temp;
}

function partition(myData, left, right,columnNo) 
{
  var pivot   = myData[Math.floor((right + left) / 2)].imie[columnNo]; //middle element //TEST * 0.5
  var i = left; //left pointer
  var j = right; //right pointer
  while (i <= j) 
  {
      while (myData[i].imie[columnNo] < pivot) i++;
      
      while (myData[j].imie[columnNo] > pivot) j--;
      
      if (i <= j) 
      {
        swap(myData, i, j); //sawpping two elements
        i++;
        j--;
      }
  }
  return i;
}

function quickSort(myData, left, right,columnNo) 
{
  var index;
  if (myData.length > 1) 
  {
      index = partition(myData, left, right,columnNo);

      if (left < index - 1) quickSort(myData, left, index - 1,columnNo);

      if (index < right) quickSort(myData, index, right,columnNo);
  }
  return myData;
}

//Indeksy łańcucha

let namesBeginingsTable = [];

function Lancuchowe(name, nr)
{
  generateChainIndex(nr)

  let wcz = performance.now();
  data2 = [];
  let currentIdx = namesBeginingsTable.get(name);

  if(currentIdx == null) 
  {
    wcz = performance.now() - wcz
    console.log(wcz);
    return;
  }
  while(currentIdx !== -1)
  {
    data2.push(data[currentIdx]);
    currentIdx = namesChain[currentIdx];
  }
  wcz = performance.now() - wcz
  console.log(wcz);

  return;
}

function generateChainIndex(nr)
{
  const dataRowsNo = data.length;
  namesChain = new Array(dataRowsNo);

  namesBeginingsTable = new Map();
  const k = dataRowsNo - 1;

  for(let idx = k; idx >= 0; idx--)
  {
    const currentNameValue = data[idx].imie[nr];

    if(namesBeginingsTable.has(currentNameValue))
    {
      namesChain[idx] = namesBeginingsTable.get(currentNameValue);
      namesBeginingsTable.set(currentNameValue, idx);
    } 
    else
    {
      namesBeginingsTable.set(currentNameValue, idx);
      namesChain[idx] = -1;
    }
  }
}
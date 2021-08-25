display();
var element = document.getElementById("stockname");
var array = [];
var btn_submit = document.getElementById("submit");
var btn_update = document.getElementById("update_submit");
btn_submit.addEventListener("click", function () {
  stock = element.value;
  var check_data = localStorage.getItem("data"); //check_data is used to get the data of local storage
  if (stock.trim() != 0) {
    if (check_data == null) {
      stock_data = [];
    } else {
      stock_data = JSON.parse(check_data);
    }

    stock_data.push(stock);

    window.localStorage.setItem("data", JSON.stringify(stock_data));
    element.value = "";
    display();
  }
});

function display() {
  document.getElementById("tablebody").innerHTML = "";
  array = JSON.parse(localStorage.getItem("data"));
  if (array != null) {
    for (var i = 0; i < array.length; i++) {
      t(i, array[i]);
    }
  }
}
function t(i, stockname) {
  var table = document.getElementById("tablebody");
  var row = table.insertRow();
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  cell0.innerHTML = i + 1 + ".";
  cell1.innerHTML = stockname;
  cell2.innerHTML = `<button id="interchange" onclick=interchange_data(${i}) >INTERCHANGE</button>
                    <button id="update" onclick=update_data(${i})>UPDATE</button>
                    <button id="delete" onclick=delete_data(${i})>DELETE</button>`;
}

function delete_data(i) {
  var table = document.getElementById("tablebody");
  table.deleteRow(i);
  var check_data = localStorage.getItem("data");
  var stock_data = JSON.parse(check_data);
  stock_data.splice(i, 1);
  localStorage.setItem("data", JSON.stringify(stock_data));
  display();
}
var click = 0;
var index = 0;
function interchange_data(i) {
  if (click == 0) {
    alert(
      "Click on the INTERCHANGE button of the stock with which you want to interchange the selected stock"
    );
    index = i;
    ++click;
  } else {
    // var check_data = localStorage.getItem("data");
    // var stock_data = JSON.parse(check_data);
    var swap = stock_data[i];
    stock_data[i] = stock_data[index];
    stock_data[index] = swap;
    localStorage.setItem("data", JSON.stringify(stock_data));
    display();
    click = 0;
  }
}

function update_data(i) {
  // console.log(i);
  var check_data = localStorage.getItem("data");
  var stock_data = JSON.parse(check_data);
  element.value = stock_data[i];
  btn_submit.style.display = "none";
  btn_update.style.display = "flex";
  btn_update.addEventListener("click", function () {
    var stock = element.value;
    stock_data[i] = stock;
    localStorage.setItem("data", JSON.stringify(stock_data));

    display();
    btn_submit.style.display = "flex";
    btn_update.style.display = "none";
    
  });
}

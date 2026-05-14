var pName = document.getElementById("pName");
var pPrice = document.getElementById("pPrice");
var pCategory = document.getElementById("pCategory");
var pImg = document.getElementById("pImg");
var pDesc = document.getElementById("pDesc");
var productList = [];
var searchBox = document.getElementById("searchBox");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var updateIndex = 0;

if (localStorage.getItem('productList') != null) {
    var productList = JSON.parse(localStorage.getItem('productList'));
    console.log(productList);
    diss(productList);
}

function clear() {
    pName.value = null;
    pPrice.value = null;
    pCategory.value = null;
    pImg.value = null;
    pDesc.value = null;
}

function addPrudact() {
    var product = {
        name: pName.value,
        price: pPrice.value,
        Category: pCategory.value,
        Img: `image/${pImg.files[0]?.name}`,
        Script: pDesc.value,
    };
    productList.push(product);
    clear();
    dis();
    localStorage.setItem('productList', JSON.stringify(productList));
    console.log(productList);
}

function dis() {
    var row = `<tr class="border-b-2 border-indigo-500">
        <td>${productList.length}</td>
        <td>${productList[productList.length - 1].name}</td>
        <td>${productList[productList.length - 1].price}</td>
        <td>${productList[productList.length - 1].Category}</td>
        <td><img src="${productList[productList.length - 1]?.Img}" alt="" class="w-28 m-auto p-2 h-28 object-contain"></td>
        <td>${productList[productList.length - 1].Script}</td>
        <td>
            <button class="bg-indigo-600 p-2 rounded-full text-white" onclick="setFormForUpdate(${productList.length - 1})">update</button>
            <button class="bg-red-600 p-2 rounded-full text-white" onclick="del(${productList.length - 1})">delete</button>
        </td>
    </tr>`;
    document.getElementById("productTable").innerHTML += row;
}

function diss(List) {
    var rows = "";
    for (let i = 0; i < List.length; i++) {
        rows += `<tr class="border-b-2 border-indigo-500">
            <td>${i + 1}</td>
            <td>${List[i].name}</td>
            <td>${List[i].price}</td>
            <td>${List[i].Category}</td>
            <td><img src="${List[i]?.Img}" class="w-28 m-auto p-2 h-28 object-contain"></td>
            <td>${List[i].Script}</td>
            <td>
                <button class="bg-indigo-600 p-2 rounded-full text-white" onclick="setFormForUpdate(${i})">update</button>
                <button class="bg-red-600 p-2 rounded-full text-white" onclick="del(${i})">delete</button>
            </td>
        </tr>`;
    }
    document.getElementById("productTable").innerHTML = rows;
}

function searchp() {
    var searchList = [];
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(searchBox.value.toLowerCase())) {
            searchList.push(productList[i]);
        }
    }
    diss(searchList);
    console.log(searchList);
}

function del(index) {
    productList.splice(index, 1);
    console.log(productList);
    localStorage.setItem('productList', JSON.stringify(productList));
    diss(productList);
}

function setFormForUpdate(index) {
    pName.value = productList[index].name;
    pPrice.value = productList[index].price;
    pCategory.value = productList[index].Category;
    pDesc.value = productList[index].Script;
    addBtn.classList.replace("block", "hidden");
    updateBtn.classList.replace("hidden", "block");
    updateIndex = index;
}

function updateDatacc() {
    productList[updateIndex].name = pName.value;
    productList[updateIndex].price = pPrice.value;
    productList[updateIndex].Category = pCategory.value;
    productList[updateIndex].Script = pDesc.value;
    console.log(productList[updateIndex]);
    localStorage.setItem('productList', JSON.stringify(productList));
    diss(productList);
    addBtn.classList.replace("hidden", "block");
    updateBtn.classList.replace("block", "hidden");
    clear();
}
let products = [];
allData();
function allData() {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((responseDate) => {
        if (responseDate.success) {
          products = responseDate.data;
          displayData();
        }

        console.log(products);
      });
}

function displayData() {
    var items = ``;
    for (let index = 0; index < products.length; index++) {
      items += `
    <tr>
            <td>${products[index].name}</td>
            <td>${products[index].price}</td>
            <td>${products[index].description}</td>
            <td class=""><button onclick="updateProduct(${products[index].id})" class="btn btn-outline-info  me-3">Update</button><button onclick="deleteProduct(${products[index].id})" class="btn btn-outline-danger">Delete</button></td>
        </tr>
`;
    }
    document.getElementById("tbody").innerHTML = items;
}
// get value input
function getInputValue() {
   let productName = document.getElementById("name").value;
  let productPrice = document.getElementById("price").value;
  let productDescription = document.getElementById("description").value;
   
    if((productName == null || productName == "") && (productPrice == null || productPrice == "") && (productDescription == null || productDescription == "")) { 
        return alert("input is required!")
    }  
        let productObj = {
    name: productName,
    price: productPrice,
    description: productDescription,
    };
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";
  apiProduct("POST" , productObj);
}

function apiProduct(endPoint, body, params = null) {
    let options = {
      method: endPoint,

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };

    let url = "http://localhost:3000/products";
    if (params) {
        url = `http://localhost:3000/products/${params.id}`
    } else {
        options.body = JSON.stringify(body)
    }
    fetch(url,options)
        
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          allData();
        }
      });
}

function deleteProduct(id) {
apiProduct("DELETE" ,{}, {id})
}
// data update
var idProduct;
function updateProduct(id) {
    idProduct = id;
    const x = products.filter((product) => product.id == id)
    proName = document.getElementById("name").value = x[0].name;
    price = document.getElementById("price").value = x[0].price;
    description = document.getElementById('description').value = x[0].description;
    document.getElementById("update").style.display="block";
    document.getElementById("add").style.display='none';
    console.log(x);

}

function addNewProduct() {
    let data = {
        id:idProduct,
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        description: document.getElementById("description").value
    };
    fetch(`http://localhost:3000/products/${idProduct}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
        .then((response) => {
        if (response.success) {
          allData();
        } else {
          alert(response.message);
            }
            document.getElementById("name").value = "";
            document.getElementById("price").value = "";
            document.getElementById("description").value = ""
      });
  document.getElementById("update").style.display = "none";
  document.getElementById("add").style.display = "block";
}

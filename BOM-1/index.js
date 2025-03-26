
let container=document.getElementById("container")
let main=document.getElementById("main")
let url="https://deserted-temporal-crab.glitch.me/products"
async function getData(){
    try{
    let response=await fetch("https://deserted-temporal-crab.glitch.me/products")
    if(!response.ok){
    throw new Error("https error")
    }
    let result=await response.json()
    localStorage.setItem("product",JSON.stringify(result))
    console.log(result)

    displayData(result)
    displayButton(result)
   
    }
    catch(err){
        console.log(err)
    }
    }
    function displayData(products){
        container.innerHTML=``
        console.log(products)
        products.forEach(ele => {
            // console.log(ele)
            let item=document.createElement("div")
            item.className='item'
            let {id,image,title,description,price,category}=ele
            item.innerHTML=`
            <img src="${image}">
            <h2 class="title"> ${title}</h2>
            <h3 class="price">$ ${price}</h3>
            <h3 class="category">${category}</h3>
            <p class="description">${description}</p>
            <button onclick="deleteData(${id})">Delete</button>
            `
            container.appendChild(item)
        });

    }
function displayButton(products){
    main.innerHTML=`<option value="all">all categories</option>`
    let categoryArr=products.map(obj=>obj.category)
    // console.log(categoryArr)
    Array.from(new Set(categoryArr)).forEach(ele=>{
        // console.log(ele)
        let option=document.createElement("option")
        option.value=ele
        option.innerHTML=ele
        main.appendChild(option);
    });
    main.addEventListener("change",function (){
        let ele=main.value
        console.log(ele)
        if(ele==="all"){
            displayData(products)

        }
        else{
            filterData(ele,products)
        }
    })
}
function filterData(ele,products){
    let category=products.filter(obj=>obj.category===ele)
    displayData(category)
}

async function deleteData(id){
        console.log(`${id}`)
       try{
           let res=await fetch (`https://deserted-temporal-crab.glitch.me/products/${id}`,{
           "method":"DELETE",
           "headers":{
        "Content-Type":"application/json"
    }
  })
  console.log(res)
  if(!res.ok){
   throw new Error ("HTTP  failed",`${res.status}`)
  }
  
    getData()
    alert("data deleted")
       }
       catch(err){
        c
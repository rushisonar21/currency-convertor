let convert = document.querySelector("#convert");
let from = document.querySelector("#select-from")
let to = document.querySelector("#select-to")
let from_img = document.querySelector("#from-country")
let to_img = document.querySelector("#to-country")
let input  = document.querySelector("input")
let result = document.querySelector(".result");
let base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let select_lists = document.querySelectorAll(".option-list");
let i = 0;
for(let select_list of select_lists){
    for(let currency in countryList){
        let option = document.createElement("option");
        option.index = i;
        option.value = currency;
        option.innerText = currency;
        if(select_list.getAttribute("id")=="select-from"){
        if (currency=="USD"){
            option.selected = true
        }
        }
        if(select_list.getAttribute("id")=="select-to"){
            if (currency=="INR"){
                option.selected = true
            }
            }
        select_list.appendChild(option);
        i++;
    }
}

const handler = (e)=>{
    target = e.target
    currency_code  = target.options[target.selectedIndex].value
    country = countryList[currency_code]
    if(target.getAttribute("id")=="select-from"){
        let url = `https://flagsapi.com/${country}/flat/64.png`
        from_img.src = url
    }
    else if(target.getAttribute("id")=="select-to"){
        let url = `https://flagsapi.com/${country}/flat/64.png`
        to_img.src = url
    } 
}
//starting code
select_lists.forEach((val) => {
    val.addEventListener("change",handler)
})

convert.addEventListener("click",async (e) =>{
    if(result.innerHTML){
    result.innerHTML = ""
    }
    e.preventDefault();
    let value = +(input.value)
    console.log(value)
    if(value=="" && value <=0){
        error = document.createElement("p")
        error.innerText = "Input cannot be blank or zero or negative"
        error.setAttribute("id","res");
        result.append(error)
        throw new Error(
            'Program Terminated');
    }
    fromCurr = (from.options[from.selectedIndex].value).toLowerCase();
    toCurr = (to.options[to.selectedIndex].value).toLowerCase();
    const URL = `${base_url}/${fromCurr}.json`;
    try{
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr][toCurr]
    let converted_value = Math.ceil(value*rate);
    let res = document.createElement("p");
    res.setAttribute("id","res");
    let msg = `${fromCurr} to ${toCurr} conversion rate is ${rate}, therefore converted value is :`
    res.innerText = msg+converted_value
    result.append(res)
    }
    catch(error){
        console.log(error)
    }
    
})









function performSearch() {  
  let input = document.getElementById('search').value.toLowerCase();
  let cards = document.getElementsByClassName('nonprofit-card');

  for (let i = 0; i < cards.length; i++) {
    let cardText = cards[i].innerText.toLowerCase(); 
    cards[i].style.display = cardText.includes(input) ? "block" : "none";
  }
}
function focusSearch() {
  let searchInput = document.getElementById("search");
  if (searchInput) {
    searchInput.focus();
  }
}
function donate(url){
  if(url){
    window.open(url,"_blank");
  }else{
    alert("No Donation link available right now.");
  }
}
let renderData= document.querySelector(".renderData");
let renderCart=document.querySelector(".renderCart");




async function getData() {
const url = ("https://partners.every.org/v0.2/search/pets?apiKey=pk_live_4d2694947ce52ec770862a7253092ed8");
const url2= ("https://partners.every.org/v0.2/browse/animals?apiKey=pk_live_4d2694947ce52ec770862a7253092ed8");
const url3= ("https://partners.every.org/v0.2/nonprofit/maps?apiKey=pk_live_4d2694947ce52ec770862a7253092ed8");

const options = {
	method: 'GET',
	headers:{
    "Accept":"application/json"
  }
};

try {
	const [response, response2, response3] = await Promise.all([
    
    fetch(url2, options),
    fetch(url,  options),
  fetch(url3, options)]);
   
	
  const result2= await response2.json();
  const result = await response.json();
  const result3= await response3.json();

  
	
  console.log(result2);
  console.log(result);
  console.log(result3);

    function createCards(nonprofits){
     

  if (nonprofits && Array.isArray(nonprofits)) {
    nonprofits.forEach(nonprofit => {
        let container = document.createElement("div");
        container.classList.add("nonprofit-card");

        let createImage = document.createElement("img");
        let createTitle = document.createElement("h3");
        let createPrice= document.createElement("p");
        let createDesc= document.createElement("p");
        let btn = document.createElement("button");
        btn.setAttribute("class","donatebtn");

        let createpriceText= document.createTextNode("Donations Live: "+ nonprofit.donationsEnabled);
        let createTextTitle=document.createTextNode(nonprofit.name || nonprofit.title);
        let createTextDesc= document.createTextNode(nonprofit.description|| nonprofit.causeCategory);
        
        let btntext= document.createTextNode("Donate");
        
        let imageUrl = nonprofit.tagUrl || nonprofit.profileUrl || nonprofit.coverImageUrl || nonprofit.logoUrl;
        createImage.setAttribute("src", nonprofit.coverImageUrl ||nonprofit.logoUrl|| nonprofit.tagImageUrl );
        
        createImage.setAttribute("class", "myImages");
        if (nonprofit.tagUrl) {
          createImage.className = "tag-image";
        }

        createTitle.appendChild(createTextTitle);
        createPrice.appendChild(createpriceText);
        createDesc.appendChild(createTextDesc);
        btn.appendChild(btntext);
        btn.addEventListener("click",()=> donate(nonprofit.profileUrl || nonprofit.tagUrl
        ));

        container.appendChild(createImage);
        container.appendChild(createTitle);
        container.appendChild(createPrice);
        container.appendChild(createDesc);
        container.appendChild(btn);
       

      renderData.appendChild(container);


        
        
    });
} else {
    console.error("Unexpected response format:", result);
}
} createCards(result.nonprofits);
  createCards(result2.nonprofits);

  createCards([result3.data.nonprofit]);
  createCards(result3.data.nonprofitTags);
}
catch (error) {
console.error("Error fetching nonprofit data:", error);
}
}



getData();



function search() {
  let input = document.getElementById('search').value
  input = input.toLowerCase();
  let card = document.getElementsByClassName('card');
 
  for (i = 0; i < card.length; i++) {
    if (!card[i].innerHTML.toLowerCase().includes(input)) {
      card[i].style.display = "none";
    }
    else {
      card[i].style.display = "";
}
    }
  
}



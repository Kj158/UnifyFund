
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
function expandCard(card)
{card.cardList.toggle("expanded");}

function readmore() {

  var button = document.getElementById('button');
  var more = document.getElementsByClassName('more');
  more.style.display= (content.style.display==='none'|| content.style.display==='')? 'block':'none';
  if (dots.style.display === "none"){
    dots.style.display="Inline";
    more.style.display="none";
    button.innerHTML="Read more";
  }else{
    dots.style.display="none";
    more.style.display="inline";
    button.innerHTML="Read less";
  }

}
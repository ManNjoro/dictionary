const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  synonyms = wrapper.querySelector(".synonym .list"),
  volume = wrapper.querySelector(".word i"),
  removeIcon = wrapper.querySelector(".search span"),
  infoText = wrapper.querySelector(".info-text");
let audio;

const data = (result, word) => {
  //console.log({result})
  if(result.title){
    infoText.innerHTML= `ayaya mzee:${word} ni uongo bana`
    infoText.style.fontSize="14px";
    infoText.style.fontWeight="bold";
  }
  else{
    wrapper.classList.add("active");
    let definitions = result[0].meanings[0].definitions[0];
    phonetics = `commonly pronounced as: ${result[0].phonetics[0].text}`;
    document.querySelector(".word p").innerText = result[0].word;
    document.querySelector(".word span").innerText = phonetics;
    document.querySelector(".meaning span").innerText = definitions.definition;
    document.querySelector(".example span").innerText = definitions.example?? "No example";
    //document.querySelector(".synonym.list").innerText =  result[0].meanings[0].definitions[0].synonyms;
    const synonymsArray = result[0].meanings[0].definitions[0].synonyms;
    if (synonymsArray) {
      let synonymsData = "";
      for (let i = 0; i < synonymsArray.length; i++) {
        synonymsData += `<p class="pills">${synonymsArray[i]}</p>`;
      }
      synonyms.innerHTML = synonymsData;
    } else {
      synonyms.innerHTML = '<p class="pills">No synonyms available</p>';
    }
  }
}
// fetch api function
function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}
removeIcon.addEventListener("click",() => {
  searchInput.value="";
  searchInput.focus();
  wrapper.classList.remove("active");
  infoText.innerHTML= "Type any existing word and press enter to get meaning, example,synonyms, etc.";
  infoText.style.color='#998fed';
})
searchInput.addEventListener("keyup",(e) => {
  if(e.key==='Enter' && e.target.value){
    fetchApi(e.target.value)
  }
})

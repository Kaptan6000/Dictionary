const wrapper = document.querySelector(".wrapper");
const searchInput = document.querySelector("input");
const infoText = document.querySelector(".info-text");
const synonyms = document.querySelector(".synonyms .list");
const volumeIcon = document.querySelector(".word i");
const removeIcon = document.querySelector(".search span")
let audio;

function data(result,word){
    if(result.title){
        infoText.innerHTML = `Can't find the meaning of <span>${word}</span>. Please , try to search for another word.`;
    }
    else{
        wrapper.classList.add("active");
        console.log(result);
        let definitions= result[0].meanings[0].definitions[0];
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".word span").innerText = definitions.definition;
        document.querySelector(".example span").innerText = definitions.example;
        audio = new Audio(result[0].phonetics[0].audio);
        if(result[0].meanings[0].synonyms[0]== undefined){
            synonyms.parentElement.style.display = "none";
        }
        else{
            synonyms.parentElement.style.display = "block";
            synonyms.innerHTML = "";
            for (let i=0;i<5;i++){
                // console.log(result[0].meanings[0].synonyms[i]);
                let tag = `<span onclick=search('${result[0].meanings[0].synonyms[i]}')>${result[0].meanings[0].synonyms[i]},</span>`;
                synonyms.insertAdjacentHTML("beforeend",tag);
            };
        }
    }
}

function search(word){
    searchInput.value = word;
    fetchApi(word);
}

function fetchApi(word){
    wrapper.classList.remove("active");
    infoText.innerHTML = `Searching the meaning of <span>${word}</span>`;
    infoText.style.color = "#000";
    let URL= `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(URL).then(res => res.json()).then(result => data(result,word));
}

searchInput.addEventListener("keyup",e=>{
    if(e.key === "Enter" && e.target.value){
        fetchApi(e.target.value);
    }
});

volumeIcon.addEventListener("click",()=>{
    audio.play();
});

removeIcon.addEventListener("click",()=>{
    searchInput.value ="";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.innerHTML = `Type a word and press enter to get meaning,
    example, pronunciation and synonyms of that typed word.`
})


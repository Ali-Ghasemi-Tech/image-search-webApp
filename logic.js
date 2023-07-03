//add unsplash API accessKey

const accessKey = "ubXnrtIrGQmrQzOvynrP9DqqTbiMvfWkyBNonc7gBNM";

//put needed elements in variables
const formElement = document.querySelector("form");
const inputElement = document.querySelector(".input");
const searchElement = document.querySelector(".search-result-box");
const showMore = document.getElementById("show-more-button");

let inputData = "";
let page = 0;


//run function on submit
formElement.addEventListener("submit" , (event) =>{
  event.preventDefault();
  page = 1;
  searchImages();
});

//run the function again when showMore is clicked
showMore.addEventListener("click" , () =>{
  searchImages();
});



async function searchImages(){
  const inputData = inputElement.value;

  //the API request
   const url =`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;


   //wait for the response which is json file
   const response = await fetch(url);
   const data = await response.json();
   const results = data.results;
   
    if(page === 1){
      searchElement.innerHTML = "";
    }
    
    //creat elements and append on image box and page
    //map through the response of API and put the values on the elements
     results.map((results) => {
      const imageWrapper =document.createElement("div");
      imageWrapper.classList.add("search-result");

      const image = document.createElement("img");
      image.src = results.urls.raw;
      image.alt = results.alt_description;

      const imageLink = document.createElement("a");
      imageLink.href = results.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = results.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchElement.appendChild(imageWrapper);
    });

    page++;

    if (page > 1){
      showMore.style.display = "block";
    }
}

console.log(searchImages());
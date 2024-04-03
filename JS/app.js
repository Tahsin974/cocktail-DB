// toggle spinner
const toggleSpinner = displayStyle =>{
  const spinner = document.getElementById('spinner');
  spinner.style.display = displayStyle;
}
// toggleSearchResult
const toggleSearchResult = visibilityStyle =>{
  const searchResult = document.getElementById('result-area');
  searchResult.style.visibility = visibilityStyle;
}
// toggleDetails
const toggleDetails = displayStyle =>{
  const searchResult = document.getElementById('details-area');
  searchResult.style.display = displayStyle;
}
document.getElementById('search-btn').addEventListener('click',function(){
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    toggleSpinner('block');
    toggleSearchResult('hidden');
    toggleDetails('none');
    if(searchText == ''){
      const errorResult = document.getElementById('error-result');
      errorResult.textContent ='';
      const h1 = document.createElement('h1');
      h1.classList.add('text-light')
      h1.classList.add('text-center')
      h1.innerText = 'Please Write Something To Display';
      errorResult.appendChild(h1);
      toggleSpinner('none');
      toggleDetails('none');
    }
  else{
    const errorResult = document.getElementById('error-result');
    errorResult.textContent=''
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayDrinks(data.drinks));
  }
    
})
const displayDrinks = drinks => {
    const searchResult = document.getElementById('result-area');
    searchResult.textContent = '';
    if(drinks == null){
      const errorResult = document.getElementById('error-result');
      errorResult.textContent ='';
        const h1 = document.createElement('h1');
        h1.classList.add('text-light')
        h1.classList.add('text-center')
        h1.innerText = 'Result not found';
        errorResult.appendChild(h1);
        toggleSpinner('none');
        toggleDetails('none');
    }

    else{
      drinks.forEach(drink =>{
        const div = document.createElement('div');
          div.classList.add('col');
          div.innerHTML =`
          <div onclick = "loadDrinks('${drink.idDrink}')" class="card h-100">
              <div class = "p-2">
                  <img src="${drink.strDrinkThumb}" class="card-img-top" alt="...">
              </div>
              <div class="card-body">
                  <h5 class="card-title">${drink.strDrink}</h5>
                  <p class="card-text">${drink.strInstructions}</p>
          </div>
          </div>`
          searchResult.appendChild(div)
      })
    }
    toggleSpinner('none');
    toggleSearchResult('visible');
    toggleDetails('none');
}

const loadDrinks = id =>{
  toggleSpinner('block');
    const url =`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDrinkDetails(data.drinks[0]))
}

const displayDrinkDetails = drinkDetails =>{
    const detailsArea = document.getElementById('details-area');
    detailsArea.textContent ='';
    const div = document.createElement('div');
    div.innerHTML =`
    <div class="card mx-auto my-4 w-50">
                <div class="row g-0">
                  <div class="col-md-4 ">
                    <img src="${drinkDetails.strDrinkThumb}" class="img-fluid h-100 rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${drinkDetails.strDrink}</h5>
                      <h6>${drinkDetails.strCategory}</h6>
                      <p class="card-text">ingredients:
                      1) ${drinkDetails.strIngredient1}  
                      2) ${drinkDetails.strIngredient2}  
                      3) ${drinkDetails.strIngredient3}
                      </p>
                      <p class="card-text"><small class="text-muted">Date-modified: ${drinkDetails.dateModified}</small></p>
                    </div>
                  </div>
                </div>
              </div>`
        detailsArea.appendChild(div)
        toggleSpinner('none');
        toggleDetails('block');
}
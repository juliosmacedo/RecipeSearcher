const app = document.getElementById('root')
var request = new XMLHttpRequest()
const container = document.createElement('div')
container.setAttribute('class', 'container')
app.appendChild(container)

const get_meal_btn = document.getElementById('gobtn');
const meal_container = document.getElementById('meal');



get_meal_btn.addEventListener('click', () => {
  const mealRequest = document.querySelector('#recipereq').value;
  console.log(mealRequest)

	function fetchData(url) {
		return fetch(url)
			.then(res => res.json())
	}

	fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealRequest}`)
		.then(res => createMeal(res.meals[0]))
		.catch(error => container.innerHTML = `<h7>Recipe not found :(</h7>`) 
});

const createMeal = (meal) => {
	const ingredients = [];
	// Get all ingredients from the object. Up to 20
	for(let i=1; i<=20; i++) {
		if(meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
		} else {
			// Stop if no more ingredients
			break;
		}
	}
	
	const newInnerHTML = `
		<div class="row">
			<div class="columns five">
        <h1>${meal.strMeal}</h1>
				<img src="${meal.strMealThumb}" alt="Meal Image">
				${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
				${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			<div class="columns seven">
				<p>${meal.strInstructions}</p>
			</div>
		</div>
		${meal.strYoutube ? `
		<div class="row2">
			<h5>Video Recipe</h5>
			<div class="videoWrapper">
				<iframe width="420" height="315"
				src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
				</iframe>
			</div>
		</div>` : ''}
	`;
	
	container.innerHTML = newInnerHTML;
}




// request.onload = function () {
//   var data = JSON.parse(this.response);
//   const h1 = document.createElement('h1')

//   if (request.status >= 200 && request.status < 400) {
//     console.log(data.meals[0])
    
//       const card = document.createElement('div')
//       card.setAttribute('class', 'card')

//       const h1 = document.createElement('h1')
//       h1.textContent = data.meals[0].strMeal;

//       const p = document.createElement('p')
//       p.textContent = data.meals[0].strInstructions;

//       const img = document.createElement('img')
//       img.src = data.meals[0].strMealThumb;
//       img.width = "300"
//       img.height = "300"

//       const h2 = document.createElement('a')
//       h2.textContent = "Watch this recipe cooking tutorial on YouTube"
//       h2.href = data.meals[0].strYoutube;



//       const h4 = document.createElement('h4')
//       h4.textContent = 'Category: ' + data.meals[0].strCategory + ' ---- ' + 'Origin: ' + data.meals[0].strArea

//       container.appendChild(card)
//       card.appendChild(img)
//       card.appendChild(h1)
//       card.appendChild(h4)
//       card.appendChild(h2)
//       card.appendChild(p)



//   } else {
//     const errorMessage = document.createElement('marquee')
//     errorMessage.textContent = `Gah, it's not working!`
//     app.appendChild(errorMessage)
//   }
// }


// request.send()
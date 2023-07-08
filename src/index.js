import SlimSelect from 'slim-select';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const refs = {
  select: document.querySelector('.select-breed'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader-container'),
};

let isLoading = true;

const condition = {
  hide(element) {
    element.classList.add('is-hidden');
  },
  show(element) {
    element.classList.remove('is-hidden');
  },
};

const slimSelect = new SlimSelect({
  select: refs.select,
  settings: {
    allowDeselect: true,
  },
});

refs.select.addEventListener('change', onSelectChange);

function onSelectChange() {
  if (isLoading) {
    isLoading = false;
    return;
  }

  const breedId = refs.select.value;

  condition.hide(refs.catInfo);
  condition.show(refs.loader);

  fetchCatByBreed(breedId)
    .then(createCatInfoMarkup)
    .catch(onError)
    .finally(() => {
      condition.hide(refs.loader);
    });
}

condition.hide(refs.select);
condition.show(refs.loader);

fetchBreeds()
  .then(data => {
    createSelectOptionMarkup(data);

    condition.show(refs.select);
    condition.hide(refs.loader);
  })
  .catch(onError);

function createSelectOptionMarkup(data) {
  slimSelect.setData(data.map(({ id, name }) => ({ value: id, text: name })));
}

function createCatInfoMarkup(data) {
  const markup = data
    .map(
      catInfo => `
      <div class="cat-img">
        <img src="${catInfo.url}" alt="${catInfo.breeds[0].name}" />
      </div>
      <div class="cat-desc">
        <h1>${catInfo.breeds[0].name}</h1>
        <p>${catInfo.breeds[0].description}</p>
        <p><b>Temperament: </b> ${catInfo.breeds[0].temperament}</p>
        <p><b>Origin: </b>${catInfo.breeds[0].origin}</p>
        <p><b>Life Span: </b>${catInfo.breeds[0].life_span}</p>
        <p><b>Affection Level: </b>${catInfo.breeds[0].affection_level}/5</p>
        <p><b>Adaptability: </b>${catInfo.breeds[0].adaptability}/5</p>
        <p><b>Child Friendly: </b>${catInfo.breeds[0].child_friendly}/5</p>
        <p><b>Dog Friendly: </b>${catInfo.breeds[0].dog_friendly}/5</p>
        <p><b>Energy Level: </b>${catInfo.breeds[0].energy_level}/5</p>
        <p><b>Grooming: </b>${catInfo.breeds[0].grooming}/5</p>
        <p><b>Health Issues: </b>${catInfo.breeds[0].health_issues}/5</p>
        <p><b>Intelligence: </b>${catInfo.breeds[0].intelligence}/5</p>
        <p><b>Shedding Level: </b>${catInfo.breeds[0].shedding_level}/5</p>
        <p><b>Social Needs: </b>${catInfo.breeds[0].social_needs}/5</p>
        <p><b>Stranger Friendly: </b>${catInfo.breeds[0].stranger_friendly}/5</p>
        <p><b>Vocalisation: </b>${catInfo.breeds[0].vocalisation}/5</p>
        <a href = ${catInfo.breeds[0].wikipedia_url}><button type="button">Wikipedia</button></a>
      </div>
      `
    )
    .join('');

  refs.catInfo.innerHTML = markup;

  condition.show(refs.catInfo);
}
Report.info(
  'Greetings friend',
  "Please select the cat that interests you and i'll show you their specifics",
  'Thanks'
);
function onError() {
  condition.hide(refs.loader);
  Report.failure('Welp, seems like something broke. Try reloading the page.');
}

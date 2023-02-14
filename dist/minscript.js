/* eslint-disable no-undef */
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonList.push(pokemon);
    } else {
      console.log('Only Pokemon Objects Allowed!');
    }
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.list-group');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    listpokemon.classList.add('group-list-item');
    button.classList.add('btn', 'btn-primary', 'col-lg-6', 'poke-btn');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModal');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', () => showDetails(pokemon));
  }
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = { name: item.name, detailsUrl: item.url };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }
  $(document).ready(function () {
    $('#searchbar').on('keyup', function () {
      let input, filter, li, btn, i, txtValue;
      input = document.getElementById('searchbar');
      filter = input.value.toUpperCase();
      li = document.getElementsByTagName('li');
      for (i = 0; i < li.length; i++) {
        btn = li[i].getElementsByTagName('button')[0];
        txtValue = btn.textContent || btn.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = '';
        } else {
          li[i].style.display = 'none';
        }
      }
    });
  });
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    modalTitle.empty();
    modalBody.empty();
    let pokemonName = $('<h1>' + pokemon.name + '</h1>');
    let pokemonImage = $('<img class="modal-img" style="width:50%">');
    pokemonImage.attr('src', pokemon.imageUrl);
    let pokemonHeight = $('<p>' + 'height : ' + pokemon.height + '</p>');
    let pokemonType = $(
      '<p>' +
        'types : ' +
        pokemon.types.map(({ type }) => type.name).join(', ') +
        '</p>'
    );
    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonType);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

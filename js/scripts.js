//wrap pokemonList array in IIFE and assign to repo variable
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //makes sure only objects are allowed
  function add(pokemon) {
    if (typeof pokemon === "object") {
      pokemonList.push(pokemon);
    } else {
      console.log("Only Pokemon Objects Allowed!");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.list-group');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    listpokemon.classList.add('group-list-item')
    button.classList.add('btn', 'btn-primary'); 
    button.setAttribute('data-toggle', 'modal');//is this correct?
    button.setAttribute('data-target', '#exampleModal')
    listpokemon.appendChild(button); 
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', (event) => showDetails(pokemon));
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrlFront = details.sprites.front_default;//change back?
      item.imageUrlBack = details.sprites.back_default;//??
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    })
  }

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    modalTitle.empty();
    modalBody.empty();


    let pokemonName = $('<h1>' + pokemon.name + '</h1>');
    let pokemonImageFront = $('<img class="modal-img" style="width:50%">');
    pokemonImageFront.attr('src', pokemon.imageUrlFront);
    let pokemonImageBack = $('<img class="modal-img" style="width:50%">');
    pokemonImageBack.attr('src', pokemon.imageUrlBack);
    let pokemonHeight = $('<p>' + 'height : ' + pokemon.height + '</p>');
    let pokemonType = $('<p>' + 'types : ' + pokemon.types + '</p>');

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImageFront);
    modalBody.append(pokemonImageBack);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonType);
  }

  return { 
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
})();

// Print pokemonList array items to document
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//wrap pokemonList array in IIFE and assign to repo variable
let pokemonRepository = (function () {
pokemonList = [
    {name: 'Bulbasaur', height: 2.2, type: ['grass', 'poison']},
    {name: 'Ivysaur', height: 3.3, type: ['grass', 'poison']},
    {name: 'Venusaur', height: 6.7, type: ['grass', 'poison']}
];

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

  return {
    add: add,
    getAll: getAll
  };
})();

//print pokemonList array items to document
//add emphasis to extra tall pokemon
pokemonRepository.getAll().forEach( function (item) {
    if ( item.height >= 4) {
        document.write('<p>' + item.name + ', height: ' + item.height + ' - whoa there!' + '</p>');
    } else { 
        document.write('<p>' + item.name + ', height: ' + item.height + '</p>');
    }
})
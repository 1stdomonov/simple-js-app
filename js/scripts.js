//add several pokemon objects to an array
pokemonList = [
    {name: 'Bulbasaur', height: 2.2, type: ['grass', 'poison']},
    {name: 'Ivysaur', height: 3.3, type: ['grass', 'poison']},
    {name: 'Venusaur', height: 6.7, type: ['grass', 'poison']}
];

//print pokemonList array items to document
//add emphasis to extra tall pokemon
pokemonList.forEach( function getPokemonList(item){
    if ( item.height >= 4) {
        document.write('<p>' + item.name + ', height: ' + item.height + ' - whoa there!' + '</p>');
    } else { 
        document.write('<p>' + item.name + ', height: ' + item.height + '</p>');
    }
})
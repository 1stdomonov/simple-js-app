//declare a variable and assign it to a blank array
let pokemonList = [];

//add several pokemon objects to the array
pokemonList = [
    {name: 'Bulbasaur', height: 2.2, type: ['grass', 'poison']},
    {name: 'Ivysaur', height: 3.3, type: ['grass', 'poison']},
    {name: 'Venusaur ', height: 6.7, type: ['grass', 'poison']}
];

//create a for loop to iterate over objects in pokemonList
//include conditional to add emphasis on tall pokemon
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height >= 4) {
        document.write('<p>' + pokemonList[i].name + ', height:' + pokemonList[i].height + ' - whoa there!' + '</p>');
    } else { 
        document.write('<p>' + pokemonList[i].name + ', height:' + pokemonList[i].height + '</p>');
    }
}
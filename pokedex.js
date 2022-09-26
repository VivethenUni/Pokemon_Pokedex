const pokemonTypesOne = document.querySelector('.pokemon-types-one');
const pokemonTypesTwo = document.querySelector('.pokemon-types-two');
const pokeName = document.querySelector('.poke-name');
const pokeId = document.querySelector('.poke-id');
const pokeFrontImage = document.querySelector('.pokemon-front-img');
const pokeTypeOne = document.querySelector('.poke-type-one');
const pokeTypeTwo = document.querySelector('.poke-type-two');
const pokeWeight = document.querySelector('.poke-weight');
const pokeHeight = document.querySelector('.poke-height');
const pokeList = document.querySelectorAll('.card');
const button = document.querySelector('.button');

//document.querySelector('#search').addEventListener("click", getPokemon);

//console.log(pokeName);

// constants & variables
const TYPES = [
    'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
    'bug', 'ghost', 'steel', 'fire', 'water', 'grass',
    'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'
];

// functions
const caps = (str) => str[0].toUpperCase() + str.substr(1);

const resetScreen = () => {
    //mainScreen.classList.remove('hide');
    for (const type of TYPES) {
        //console.log(type)
        pokeTypeOne.classList.remove(type);
        pokeTypeTwo.classList.remove(type);
    }
};

// user input data through search bar
//fetch('https://pokeapi.co/api/v2/pokemon-species')
/*
fetch('https://pokeapi.co/api/v2/pokemon')
    .then(res => res.json())
    .then(data => {
        data.forEach(pokeList => {
            pokeName.textContent = data['name'];
            const card = pokeName.cloneNode(true).children[0];
            const header = card.querySelector("[data-header]");
            header.textContent = pokeList;
        });
*/

// outputing pokemon data to the user
/* (although search bar does not work,
   changing the pokedex # changes the 
   pokedex entry besides the img fine) */
fetch('https://pokeapi.co/api/v2/pokemon/1')
    .then(res => res.json())
    .then(data => {
        console.log(data);

        resetScreen();

        const dataTypes = data['types'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];
        pokeTypeOne.textContent = caps(dataTypes[0]['type']['name']);
        if (dataSecondType) {
            pokeTypeTwo.classList.remove('hide');
            pokeTypeTwo.textContent = caps(dataTypes[1]['type']['name']);
        }
        else {
            pokeTypeTwo.classList.add('hide');
            pokeTypeTwo.textContent = '';
        }
        
        pokemonTypesOne.classList.add(dataFirstType['type']['name']);
        if (dataSecondType) {
            pokemonTypesTwo.classList.add(dataSecondType['type']['name']);
        }

        pokeId.textContent = '#' + data['id'];
        pokeName.textContent = '#' + data['id'] + ' - ' + caps(data['name']);
        pokeWeight.textContent = data['weight'];
        pokeHeight.textContent = data['height'];

        //pokeFrontImage.src = data['sprites']['front_default'] || '';
        //pokeFrontImage.src = "https://pokeapi.co/api/v2/pokemon/" + data['id'] + ".png";
        pokeFrontImage.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + data['id'].toString() + '.png';
    });

const getPokemon = (e) => {
    const pokeName = document.querySelector(".poke-name").value;
    
    fetch('https://pokeapi.co/api/v2/pokemon/${name}')
        .then(res => res.json())
        .then(data => {
            document.querySelector(".pokemon-front-img").innerHTML = '<img src="${data.sprite.other["official-artwork"].front_default}" class=["poke-front-image"]/>';
        })
        .catch((err) => {
            console.log("Pokemon does not exist", err);
        });
    
        e.preventDefault();
};

// event listeners
document.querySelector('#searchTwo').addEventListener("click", getPokemon);
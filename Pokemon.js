// require dependencies
const yargs = require('yargs'); //`npm i yargs` -- > update package.json + node_module
const nodeFetch = require('node-fetch');
const util = require('util');

const argv = yargs
    .command('all', 'fetch total number of pokemons api ..')
    .command('fetch-poke', 'fetch a pokemon by (its name or id -k) [key]', {
        key: {
            description: 'the key of the pokemon to read wether Id or name .. ',
            alias: 'k',
            type: 'string',
        }
    })
    .command('fetch-type', ' Fetch a pokemon type by (its name or id -k) [key]', {
        key: {
            description: 'the Pokemon type or id to fetch ',
            alias: 'k',
            type: 'string',
        }
    })
    .command('fetch-move', ' Fetch a pokemon move by (its name or id -k) [key]', {
        key: {
            description: 'the Pokemon move or id to fetch ',
            alias: 'k',
            type: 'string',
        }
    })
    .command('fetch-item', ' Fetch a pokemon item by (its name or id -k) [key]', {
        key: {
            description: 'the Pokemon item or id to fetch ',
            alias: 'k',
            type: 'string',
        }
    })
    .help()
    .alias('help', 'h')// node pokemon -h 
    .argv;

//ex : node Pokemon all
if (argv._.includes('all')) {
    console.log('Total number of available poke-mons is ...');
    //fetching total number of  pokemons
    fetchPoke(`https://pokeapi.co/api/v2/pokemon-species/?offset=${0}&limit=${1}`)
        .then((data) => { console.log(data.count) })
        .catch((err) => console.log(`Error .. ${err}`));

}

// fetch -k [key]
//ex : node pokemon fetch-poke -k 1
if (argv._.includes('fetch-poke')) {
    if (argv.key === undefined) {
        console.log("A key (name or id ) is needed");
        process.exit(0);
    }
    console.log('Pokemon details  ...');
    fetchPoke(`https://pokeapi.co/api/v2/pokemon/${argv.key}/`)
        .then((data) => {
            var txt = 'Pokemon name is %s and the Pokemon id is %d ..';
            var result = util.format(txt, data.name, data.id);
            console.log(result);
        })
        .catch((err) => console.log(`No such a pokemon found for this Id or name  .. ` + err));

}

//node pokemon fetch-type -k 1
if (argv._.includes('fetch-type')) {
    if (argv.key === undefined) {
        console.log("A key (name or id ) is needed");
        process.exit(0);
    }
    console.log('Pokemon type details for this type   ...');
    fetchPoke(`https://pokeapi.co/api/v2/type/${argv.key}/`)
        .then((data) => {
            var txt = 'Type name is %s , and Id is %d ..';
            var result = util.format(txt, data.name, data.id);
            console.log(result);
        })
        .catch((err) => console.log(`No such a pokemon type found for this name .. ` + err));
}

//node pokemon fetch-move -k 1
if (argv._.includes('fetch-move')) {
    if (argv.key === undefined) {
        console.log("A key (name or id ) is needed");
        process.exit(0);
    }
    console.log('Pokemon move details  ...');
    fetchPoke(`https://pokeapi.co/api/v2/move/${argv.key}/`)
        .then((data) => { console.log('Move name is ' + data.name + ', and Id is ' + data.id) })
        .catch((err) => console.log(`No such a pokemon move found for this name .. ` + err));
}

//node pokemon fetch-item -k 1
if (argv._.includes('fetch-item')) {
    if (argv.key === undefined) {
        console.log("A key (name or id ) is needed");
        process.exit(0);
    }
    console.log('Pokemon item details  ...');
    fetchPoke(`https://pokeapi.co/api/v2/item/${argv.key}/`)
        .then((data) => { console.log('Item name is ' + data.name + ', and Id is ' + data.id) })
        .catch((err) => console.log(`No such a pokemon item found for this name .. ` + err));
}



//a node fetch from pokemon api ..
async function fetchPoke(URL) {
    //console.log('fetching ' + URL + ' ...');
    const res = await nodeFetch(URL);
    const data = await res.json();
    //console.log('Sending data .. ' + data + ' ...');
    return data;
}
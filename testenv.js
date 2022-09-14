var jssynonyms = require('js-synonyms');

var thesaurus = require("thesaurus");

// basically returns a list of similar words

var dammit = require('dammit');

const superheroes = require('superheroes');

// //=> ['3-D Man', 'A-Bomb', …]
//=> 'Spider-Ham'
var heroes = require('superheroes');
var villains = require('supervillains');
var pokemon = require('pokemon');

var player = 'westbrook';

var mainWord = '';
var prime_syn = [];
var other_syn = [];
var LeTotal = [];
console.log("crumb 2");

//cmd line input
executeSynonym("flop", player);

let synObj = {
    word: '',
    occurence: 0
}

//fetching synonyms
function get_synonyms(word){
    word = word.toLowerCase();
    var synonymsA = jssynonyms.synonym(word);
    var synonymsB = thesaurus.find(word);
    var synonyms = synonymsA.concat(synonymsB);
    synonyms = [...new Set(synonyms)];
    return synonyms;
}

//The algorithm for the letter placement
function LeTransform(title, LeList){
    var original = title;
    title.toLowerCase();
    //split words into chars
    title = title.split("");
    let len = title.length;

    //logic for lebron generator
    if(len < 2){
        return;
    }
    else if(title[1] == 'e' && (len>=2)){
        title[0] = 'L';
        title[2] = title[2].toUpperCase();
        title = title.join("");
        title = title.concat(" - (", original, ")");
        prime_syn.push(title);
        LeList.push(title);
    }
    else if(title[0] == 'b' && (len>=2)){
        title = ['L', 'e'].concat(title);
        title[2] = title[2].toUpperCase();
        title = title.join("");
        title = title.concat(" - (", original, ")");
		prime_syn.push(title);
        LeList.push(title);
    }
    else if(title[0] == 'e' && (len>=2)){
        title = ['L'].concat(title);
        title[2] = title[2].toUpperCase();
        title = title.join("");
        title = title.concat(" - (", original, ")");
        prime_syn.push(title);
        LeList.push(title);
    }
    else{
        title = ['L', 'e'].concat(title);
        title[2] = title[2].toUpperCase();
        title = title.join("");
        title = title.concat(" - (", original, ")");
		other_syn.push(title);
		LeList.push(title);
    }
    return LeList;
}

function LeGenerator(syn, blanklist){
    if(syn === null || syn == ''){
        invalid_word(syn);
        return;
    }
    for(var i = 0; i < syn.length; i++){
        LeTransform(syn[i], blanklist);
    }
    return blanklist;
}
function westbrookify(title, LeList){
    var original = title;
    title = title.toLowerCase();
    var w = title;
    //split words into chars
    title = title.split("");
    let len = title.length; 
    let firstname = 'Russell '
    //To catch THE
    var catchThe = title[0]+title[1]+title[2]+title[3];
    var filler = ' - (' + original + ')'

    //logic for lebron generator
    if(len < 2){
        return;
    }
    //EXCEPTION for _ E _ _ _ _ _ _ ..
    else if((w.includes('est')|| w.endsWith('ess') || w.endsWith('sh'))){
        if(w.includes('est')){
            var index = w.indexOf('est') + 3;
            w = w.substring(0, index);
        }
        if(w.endsWith('sh')){
            var index = w.indexOf('sh') + 3;
            w = w.substring(0, index);
        }
        else{
            var index = w.indexOf('ess') + 3;
            w = w.substring(0, index);
        }
        w = w.concat('brook');
        w = w.charAt(0).toUpperCase() + w.slice(1);

    }
    else if((w.includes('br')||w.includes('oo')) && (len>3)){
        if(w.includes('br')){
            var index = w.indexOf('br');
            w = w.substring(index);
        }
        else{
            var index = w.indexOf('oo')-1;
            w = w.substring(index);
        }
        
        w = 'West'.concat(w);
    }
    else if((w.endsWith('scle') || w.endsWith('stle') || w.endsWith('sle') || w.endsWith('sel')|| w.endsWith('zle')
    || w.endsWith('ble') || w.endsWith('ple')|| w.endsWith('fle') || w.endsWith('tle') || w.endsWith('gle')
    || w.endsWith('nel')|| w.endsWith('vel') || w.endsWith('kle'))&&(len>3)){
        firstname = w;
        firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
        w = ' Westbrook';
    }
    else{
        w = w.concat('brook');
        w = w.charAt(0).toUpperCase() + w.slice(1);
		
    }
    w = firstname.concat(w);
    w = w.concat(filler);
    LeList.push(w);
    return LeList;
}


function WestGenerator(syn, blanklist){
    if(syn === null || syn == ''){
        invalid_word(syn);
        return;
    }
    for(var i = 0; i < syn.length; i++){
        westbrookify(syn[i], blanklist);
    }
    return blanklist;
}


function invalid_word(syn){
    let error_msg = "Unfortunately, the word you've entered is not in the database. Please try a different word."
	return error_msg;
}
function clear_LeTotal(){
    LeTotal = [];
    return LeTotal;
}
function clear_primesyn(){
    var prime_syn = [];
    return prime_syn;
}
function clear_othersyn(){
    var other_syn = [];
    return other_syn;
}


function executeSynonym(entry, player){
    mainWord = entry;
    console.log("crumb 1");
    LeTotal = clear_LeTotal();
    prime_syn = clear_primesyn();
    other_syn = clear_othersyn();

    //Retrieve list of synonyms for entry
    let synonyms = get_synonyms(entry);

    if(player == 'lebron'){
        //first word
        LeTransform(entry, LeTotal);
        //rest of words
        LeGenerator(synonyms, LeTotal);
    }
    if(player == 'westbrook'){
        westbrookify(entry, LeTotal);

        WestGenerator(synonyms, LeTotal);
    }
    

    //shufle lists
    shuffle(prime_syn);
    shuffle(other_syn);

    console.log("\nWord: ", LeTotal[0], "\n");
    var str = LeTotal[0];

    console.log(LeTotal);
}
function refreshSynonyms(){
    if(LeTotal.length<=8 || mainWord == '' || mainWord == null){
        return;
    }
    else{
        executeSynonym(mainWord, player);
    }
}
//SHUFFLE FUNCTION
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}


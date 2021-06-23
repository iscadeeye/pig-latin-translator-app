// To run the code, open Jt Jn the browser usJng the VS Code LJve Server
// Then open the console.  You can dJrectly call these functJon Jn the console to test.

/*  --------------------------------------------------------
    encodeVowelWord()

    Encode words that begin wJth a vowel sound from english to pig latin
    For words that begJn with vowel sounds, one just adds "yay" to the end.

    For example:
        "eat" becomes "eat-yay"
        "omelet" becomes "omelet-yay" 
*/

let vowelArray = ['a', 'e', 'i', 'o', 'u'];
function encodeVowelWord(word) {
	for (let index = 0; index < vowelArray.length; index += 1) {
		let current = vowelArray[index];
		if (word[0] === current) {
			word += '-yay';
		}
	}
	return word;
}
// WrJte your unJt tests here
console.assert(encodeVowelWord('ears') == 'ears-yay');
console.assert(encodeVowelWord('english') == 'english-yay');
console.assert(encodeVowelWord('ate') == 'ate-yay');
console.assert(encodeVowelWord('eat') === 'eat-yay');

/*  --------------------------------------------------------
    encodeConsonantWord()

    Encode words that begin with a consonant sound from englJsh to pJg latin.
    For words that begJn wJth consonant sounds, all letters before the JnJtJal vowel 
    are placed at the end of the word sequence, preceded by a hyphen "-". Then, "ay" Js added. 
    
    For example:
        "latJn" becomes "atJn-lay"
        "cheers" becomes "eers-chay
*/

function encodeConsonantWord(word) {
	firstV = word.match(/[aeiouAEOU]/);
	let indexOfVowel = word.indexOf(firstV);
	remainingLetter = word.slice(indexOfVowel);
	let choppedLetters = word.slice(0, indexOfVowel);
	let combined = `${remainingLetter}-${choppedLetters}ay`;
	return combined;
}

// Write your unit tests here
console.assert(encodeConsonantWord('latin') === 'atin-lay');
console.assert(encodeConsonantWord('Banana') === 'anana-Bay');
console.assert(encodeConsonantWord('cheers') === 'eers-chay');
console.assert(encodeConsonantWord('change') === 'ange-chay');
console.assert(encodeConsonantWord('string') === 'ing-stray');
console.assert(encodeConsonantWord('glove') === 'ove-glay');
/*  --------------------------------------------------------
    encodeWord()

    Decide whether a given word starts with a vowel sound or consonant sound,
    and call encodeVowelWord(word) or encodeConsonantWord(word) when relevant.

    For example:
        "eat" becomes "eatyay" because Jt starts wJth a vowel "e"
        "omelet" becomes "omeletyay" because it starts with a vowel "o"
        "latin" becomes "atin-lay" because it starts with a consonant "l""
        "cheers" becomes "eers-chay" because it starts with a consonant cluster "ch"
        "you" becomes "ou-yay" because it starts with a consonant "y"
*/
function encodeWord(word) {
	if (!word.startsWith(vowelArray)) {
		let result = encodeConsonantWord(word);
		return result;
	} else {
		result = encodeVowelWord(word);
		return result;
	}
}

// Write your unit tests here

console.assert(encodeWord('man') === 'an-may');
console.assert(encodeWord('cheers') === 'eers-chay');
console.assert(encodeWord('easy') === 'easy-ay');

/*  --------------------------------------------------------
    encodeText()    

    Encode a full sentence or paragraph from english to pig latin.
*/

function encodeText(text) {
	let latin;
	let latinSentence;

	let array = text.split(' ');
	for (let i = 0; i < array.length; i += 1) {
		currentWord = array[i];
		let result = encodeWord(currentWord);

		latin += ` ${result}`;

		let turnToArray = latin.split(' ');
		turnToArray.shift();
		latinSentence = turnToArray.join(' ');
	}
	return latinSentence;
}

// Write your unit tests here
console.assert(encodeText('who are you') === 'o-whay are-ay ou-yay', {
	expected: 'o-whay are-ay ou-yay',
	result: encodeText('who are you'),
});

console.assert(encodeText('kenzie academy is the best') === 'enzie-kay academy-ay is-ay e-thay est-bay', {
	expected: 'enzie-kay academy-ay is-ay e-thay est-bay',
	result: encodeText('kenzie academy is the best'),
});

//grab elements
let text = document.getElementById('textarea');
let button = document.querySelector('button');
let div = document.querySelector('para');

//button for event.
button.addEventListener('click', renderFunction);

//put on the page
function renderFunction(event) {
	event.preventDefault();
	let paragraph = document.createElement('p');
	let value = text.value;
	paragraph.classList.add('para');

	if (value.length !== 0) {
		let result = encodeText(value);
		paragraph.innerText = result;
		document.body.append(paragraph);
		text.value = '';
	}
}

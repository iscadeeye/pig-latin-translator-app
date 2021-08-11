// To run the code, open Jt Jn the browser usJng the VS Code LJve Server
// Then open the console.  You can directly call these function in the console to test.

/*  --------------------------------------------------------
    encodeVowelWord()

    Encode words that begin with a vowel sound from english to pig latin
    For words that begin with vowel sounds, one just adds "yay" to the end.

    For example:
        "eat" becomes "eat-yay"
        "omelet" becomes "omelet-yay" 
*/

let vowelArray = ['a', 'e', 'i', 'o', 'u']
function encodeVowelWord (word) {
  for (let index = 0; index < vowelArray.length; index += 1) {
    let current = vowelArray[index]
    if (word[0] === current) {
      word += '-yay'
    }
  }
  return word
}
// Write  unit tests here
console.assert(encodeVowelWord('ears') == 'ears-yay')
console.assert(encodeVowelWord('english') == 'english-yay')
console.assert(encodeVowelWord('ate') == 'ate-yay')
console.assert(encodeVowelWord('eat') === 'eat-yay')

/*  --------------------------------------------------------
    encodeConsonantWord()

    Encode words that begin with a consonant sound from english to pig latin.
    For words that begin with consonant sounds, all letters before the initial vowel 
    are placed at the end of the word sequence, preceded by a hyphen "-". Then, "ay" is added. 
    
    For example:
        "latin" becomes "atin-lay"
        "cheers" becomes "eers-chay
*/

function encodeConsonantWord (word) {
  firstV = word.match(/[aeiouAEOU]/)
  let indexOfVowel = word.indexOf(firstV)
  remainingLetter = word.slice(indexOfVowel)
  let choppedLetters = word.slice(0, indexOfVowel)
  let combined = `${remainingLetter}-${choppedLetters}ay`
  return combined
}

// Write unit tests here
console.assert(encodeConsonantWord('latin') === 'atin-lay')
console.assert(encodeConsonantWord('Banana') === 'anana-Bay')
console.assert(encodeConsonantWord('cheers') === 'eers-chay')
console.assert(encodeConsonantWord('change') === 'ange-chay')
console.assert(encodeConsonantWord('string') === 'ing-stray')
console.assert(encodeConsonantWord('glove') === 'ove-glay')
/*  --------------------------------------------------------
    encodeWord()

    Decide whether a given word starts with a vowel sound or consonant sound,
    and call encodeVowelWord(word) or encodeConsonantWord(word) when relevant.

    For example:
        "eat" becomes "eatyay" because it starts with a vowel "e"
        "omelet" becomes "omeletyay" because it starts with a vowel "o"
        "latin" becomes "atin-lay" because it starts with a consonant "l""
        "cheers" becomes "eers-chay" because it starts with a consonant cluster "ch"
        "you" becomes "ou-yay" because it starts with a consonant "y"
*/
function encodeWord (word) {
  if (!word.startsWith(vowelArray)) {
    let result = encodeConsonantWord(word)
    return result
  } else {
    result = encodeVowelWord(word)
    return result
  }
}

// Write your unit tests here

console.assert(encodeWord('man') === 'an-may')
console.assert(encodeWord('cheers') === 'eers-chay')
console.assert(encodeWord('easy') === 'easy-ay')
console.assert(encodeWord('who') === 'o-whay')

/*  --------------------------------------------------------
    encodeText()    

    Encode a full sentence or paragraph from english to pig latin.
*/

function encodeText (text) {
  let latin
  let latinSentence

  let array = text.split(' ')
  for (let i = 0; i < array.length; i += 1) {
    currentWord = array[i]
    let result = encodeWord(currentWord)

    latin += ` ${result}`

    let turnToArray = latin.split(' ')
    turnToArray.shift()
    latinSentence = turnToArray.join(' ')
  }
  return latinSentence
}

// Write your unit tests here
console.assert(encodeText('who are you') === 'o-whay are-ay ou-yay', {
  expected: 'o-whay are-ay ou-yay',
  result: encodeText('who are you')
})

console.assert(
  encodeText('kenzie academy is the best') ===
    'enzie-kay academy-ay is-ay e-thay est-bay',
  {
    expected: 'enzie-kay academy-ay is-ay e-thay est-bay',
    result: encodeText('kenzie academy is the best')
  }
)

//grab elements
let resetButton = document.querySelector('.resetButton')
let text = document.getElementById('textarea')
let button = document.querySelector('button')
let paragraph = document.querySelector('.para')
paragraph.style.pageBreakAfter = 'always'

//event listners.
button.addEventListener('click', renderFunction)
resetButton.addEventListener('click', eraseFunction)
//render
function renderFunction (event) {
  if (event !== undefined) {
    event.preventDefault()
  }
  let value = text.value
  if (value.length !== 0) {
    let lineBreak = document.createElement('br')
    console.log(lineBreak)
    let result = encodeText(value)
    paragraph.append(result, lineBreak)
    paragraph.style.background = 'skyblue'
    text.value = ''
  }
}
//erase the the translation text.

function eraseFunction (event) {
  event.preventDefault()

  console.log(paragraph)
  paragraph.innerText = ''
  paragraph.style.background = 'none'
}

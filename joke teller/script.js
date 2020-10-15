import tellMe from './voice.js'
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');



// function test() {
//
// }

// test()

//disable/enable button
function toggleButton() {
  button.disabled = !button.disabled;
}
// passing joke to voiceRSS API


// get jokes from joke api
async function getJokes() {
  let joke = '';
  const apiUrl =
    'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';

  try {
    const response = await axios.get(apiUrl);
    const data = await response.data;
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //text-to-speech

    tellMe(joke);

    //disable button
    toggleButton();
  } catch (error) {
    //catch errors here
    console.log('whoops', error);
  }
}

//event listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

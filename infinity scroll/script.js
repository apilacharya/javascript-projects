//unsplash API
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let initialload = true

let photosArray = [];
let count = 5;
const apiKey = 'YcNXKrLSA3cBSM02K6wUvSSusvxFlz_1YiwOT6jxNCE';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}
`;

//check if all images were loaded
function imageLoaded() {
  console.log('image loaded');
  imagesLoaded++; //here everytime the function is called the number gets added
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true
    count = 30 
    console.log('ready =', ready);
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}
`;
  }
}

//helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  //here key creates an object that the function loops individully upon the data sets the attribute using the function setAttributes. here this function creates the array containing all the keys of the object attributes and then places the value
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//create elements for links & photos, add to DOM

function displayPhotos(photos) {
  totalImages += photos.length;
  console.log('total images', totalImages);
  //run function for each object in photosArray
  photos.forEach((photo) => {
    //create <a> to link to Unsplash
    const item = document.createElement('a');

    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    //create <img> for photo
    const img = document.createElement('img');

    setAttributes(img, {
      alt: photo.alt_description,
      src: photo.urls.regular,
      title: photo.alt_description,
    });
    //event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    //put < img> inside < a> , then put both inside imagecontainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
//get photos from unsplash api

async function getPhotos() {
  const { data } = await axios.get(apiUrl);
  console.log(data);
  
  displayPhotos(data);
}

//check to see if scrolling near bottom of page, load more Photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.offsetHeight - 1000 && ready
  ) {
    ready = false
    getPhotos();
  }
});

getPhotos().catch(function (error) {
  console.log(error);
});

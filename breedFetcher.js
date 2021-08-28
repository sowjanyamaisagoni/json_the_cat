const request = require('request');
const [ breed ] = process.argv.slice(2);

const fetchBreedDescription = function(breedName, callback) {
  request('https://api.thecatapi.com/v1/breeds/search?q=' + breed, {json: true}, (err, res, body) => {
  if (err) {

    console.log('req fail');
    if (err.errno === -3008) {
      console.log('ERROR IS :', err);
    }

    return;
  }
  if('message' in body && body.message.includes('404')) {
    console.log("req fail");
    return;
  } 

  if (JSON.stringify(body) === JSON.stringify([])) {
    console.log('Breed is not found');
    return;
  }
 const breedobj = body[0];
 console.log(breedobj.description);
}); 
};

module.exports = { fetchBreedDescription };
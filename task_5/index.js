const axios = require ('axios').default;


axios
    .get('http://m.vid.ly/api/')
    
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

const deploy = 'prod';

let apiUrl = '';
if (deploy === 'dev') {
  apiUrl = 'http://localhost:8081/api';
} else if (deploy === 'prod') {
  apiUrl = 'https://api.awsmediaproject.com/api';
}

export default {
  apiUrl,
};

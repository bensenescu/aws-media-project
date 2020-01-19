const deploy = 'prod';

let apiUrl = '';
if (deploy === 'dev') {
  apiUrl = 'http://localhost:8081/api';
} else if (deploy === 'prod') {
  apiUrl = 'http://media-project.us-east-1.elasticbeanstalk.com/api';
}

export default {
  apiUrl,
};

import axios from 'axios';

const fetchToken = async () => {
  const response = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token');
  return response.data.token;
};

export default fetchToken;
import axios from 'axios';

const fetchPositions = async () => {
  const response = await axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
  return response.data.positions;
};

export default fetchPositions;
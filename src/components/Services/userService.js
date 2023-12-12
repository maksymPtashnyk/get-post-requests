import axios from 'axios';

const fetchUsers = async (page = 1, count = 6) => {
  const response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=${count}`);
  return response.data;
};

export default fetchUsers;
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import EditableTable from '../tables/EditableTable';

const API_BASE_URL = 'http://localhost:8000/actions';
const DATA_BASE_URL = 'http://localhost:8000/data';

function NewBusiness() {
  const [data, setData] = useState([]);

  const columns = useMemo(() => [
    {name: 'Name', id: 'name'},
    {name: 'Location', id: 'location'},
    {name: 'Business Type', id: 'biz_type'},
    {name: 'Description', id: 'description'},
  ]);

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    const response = await fetch(`${DATA_BASE_URL}/get_businesses`);
    const data = await response.json();
    setData(data);
  }

  const createBusiness = async (data) => {
    const response = await fetch(`${API_BASE_URL}/add_business`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    return responseData;
  };

  const { mutate: createBusinessMutation, isLoading: isCreatingBusiness } = useMutation(createBusiness, {
    onSuccess: () => {
      alert('Business added successfully');
    }
  });

  return (
    <EditableTable 
      columns={columns}
      endpoint={createBusinessMutation}
      data={data}
      />
  );
}

export default NewBusiness;
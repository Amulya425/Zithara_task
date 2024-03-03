import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './styles.css'; // Import your styles

function App() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `http://localhost:5000/api/customers?search=${searchTerm}`;

        if (sortOption) {
          apiUrl += `&sortOption=${sortOption}`;
        }

        const response = await axios.get(apiUrl);
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchTerm, sortOption]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1); // Reset to the first page when sorting
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = customers.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(customers.length / recordsPerPage);

  return (
    <div className="container">
      <h1>Customer Records</h1>
      <div className="input-container">
        <input type="text" placeholder="Search by name or location" onChange={handleSearch} />
        <select onChange={handleSort} value={sortOption}>
          <option value="">Sort by</option>
          <option value="date">Date</option>
          <option value="time">Time</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Customer Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((customer, index) => (
            <tr key={customer.id}>
              <td>{customer.sno}</td>
              <td>{customer.customer_name}</td>
              <td>{customer.age}</td>
              <td>{customer.phone}</td>
              <td>{customer.location}</td>
              <td>{formatDate(customer.created_at)}</td>
              <td>{formatTime(customer.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TableRow({ reference, id }) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true); // Optional loading state
  const [isEditable, setIsEditable] = useState(false); // Track if fields are editable
  const [buttonText, setButtonText] = useState('Update'); // Button text state

  // Function to handle the "Update" button click
  const handleUpdate = () => {
    // Set fields to be editable and change button to 'Send'
    setIsEditable(true);
    setButtonText('Send');
  };

  // Function to handle the "Send" button click
  const handleSend = async () => {
    try {
      // Send the updated data to the backend using POST request
      const response = await axios.post(
        `http://localhost:4000/api/v1/reservation/create-menu/${id}`,
        { title, image, price }
      );
      console.log('Updated Menu Item:', response.data);
      alert("Updated successfully");

      // After sending, set fields back to non-editable and reset button text
      setIsEditable(false);
      setButtonText('Update');
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/reservation/menu/${id}`);
        console.log('API Response:', response.data); // Log the response for debugging
        if (response.data && response.data.menuItem) {
          setTitle(response.data.menuItem.title);
          setImage(response.data.menuItem.image);
          setPrice(response.data.menuItem.price);
          setLoading(false); // Stop loading when data is fetched
        } else {
          console.log('Menu item not found in response.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching menu item:', error);
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]); // Add `id` as a dependency

  if (loading) {
    return <tr><td colSpan="5" className="text-center">Loading...</td></tr>;
  }

  return (
    <tr className="text-center odd:bg-gray-900 even:bg-gray-800">
      <td className="border border-gray-700 px-4 py-2">{reference}</td>
      <td className="border border-gray-700 px-4 py-2">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="w-full bg-transparent px-2 py-1" 
          disabled={!isEditable} // Disable input if not editable
        />
      </td>
      <td className="border border-gray-700 px-4 py-2 text-blue-500 underline">
        <input 
          type="text" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
          className="w-full bg-transparent px-2 py-1" 
          disabled={!isEditable} // Disable input if not editable
        />
      </td>
      <td className="border border-gray-700 px-4 py-2">
        <input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          className="w-full bg-transparent px-2 py-1"
          disabled={!isEditable} // Disable input if not editable
        />
      </td>
      <td className="border border-gray-700 px-4 py-2">
        <button
          onClick={isEditable ? handleSend : handleUpdate} // Toggle between Update and Send
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {buttonText} {/* Button text will be either "Update" or "Send" */}
        </button>
      </td>
    </tr>
  );
}

export default TableRow;

import React from 'react';

// Define your React component
function DropdownComponent() {
    return (
        <select className="block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-400">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
        </select>
    );
}

// Export your React component
export default DropdownComponent;
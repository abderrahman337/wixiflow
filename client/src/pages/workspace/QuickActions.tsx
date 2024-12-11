import React from 'react';

const quickActions = [
  { label: 'Create Document', action: () => console.log('Create Document') },
  { label: 'Send Email', action: () => console.log('Send Email') },
  // Add more quick actions here...
];

const QuickActions: React.FC = () => {
  return (
    <div className="quick-actions bg-gray-100 p-4 rounded-md">
      <h2 className="text-xl mb-4">Quick Actions</h2>
      <div className="flex flex-wrap gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="quick-action-button bg-green-500 text-white px-4 py-2 rounded-md"
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
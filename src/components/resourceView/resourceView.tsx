import React, { FC } from 'react';
import './resourceView.css';

const resources = [
  {
    name: 'grain',
    qty: 5,
  },
  {
    name: 'minerals',
    qty: 15,
  },
  {
    name: 'knowledge',
    qty: 1,
  },
];

const ResourceView: FC = () => {
  return (
    <div className="resource-container">
      {resources.map((resource) => (
        <div key={resource.name} className="resource-row">
          <span>{resource.name}</span>
          <span>{resource.qty}</span>
        </div>
      ))}
    </div>
  );
};

export default ResourceView;

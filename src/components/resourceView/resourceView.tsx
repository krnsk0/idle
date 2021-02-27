import React, { FC } from 'react';

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
    <div>
      {resources.map((resource) => (
        <div key={resource.name}>
          <span>{resource.name}</span>
          <span>{resource.qty}</span>
        </div>
      ))}
    </div>
  );
};

export default ResourceView;

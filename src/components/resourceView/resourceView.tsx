import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useRootStore } from '../../store/rootStore';
import './resourceView.css';

const ResourceView: FC = observer(() => {
  const { resourceStore } = useRootStore();

  return (
    <div className="resource-container">
      {resourceStore.resources.map((resource) => (
        <div key={resource.name} className="resource-row">
          <span>{resource.name}</span>
          <span>{resource.quantity}</span>
        </div>
      ))}
    </div>
  );
});

export default ResourceView;

import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { useRootStore } from '../../store/rootStoreContext';
import './resourceView.css';

const ResourceView: FC = observer(() => {
  const { resourceStore } = useRootStore();

  return (
    <div className="resource-container">
      {resourceStore.resources.map((resource) => (
        <div key={resource.resourceName} className="resource-row">
          <span>{resource.resourceName}</span>
          <span>{resource.productionPerSecond}/sec</span>
          <span>{resource.quantity.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
});

export default ResourceView;

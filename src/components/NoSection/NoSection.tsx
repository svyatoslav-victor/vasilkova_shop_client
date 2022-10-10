import React from "react";

import workInProgess from '../../shop_icons/construction-worker-svgrepo-com.svg';

import './NoSection.scss';

export const NoSection: React.FC = () => {
  return (
    <div className="emptySection">
      <p className="emptySection__message">
        Section under development...
      </p>

      <img
        className="emptySection__image"
        src={workInProgess}
      />
    </div>
  )
}
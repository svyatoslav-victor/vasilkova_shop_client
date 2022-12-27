import React from "react";
import cog from '../../shop_icons/cogwheel-svgrepo-com.svg';

import './Loader.scss';

export const Loader: React.FC = () => {
  return (
    <div className="loader">
      <img
        className="loader__cog--large"
        src={cog}
        alt="/"
      />
    </div>
  )
}

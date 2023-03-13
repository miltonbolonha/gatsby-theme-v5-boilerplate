import React from "react";

const BodyBlock = ({ children, opt, killSEO, topology }) => {
  const { options } = opt;
  return (
    <div
      className={options?.classes}
      style={opt.bgImg ? { background: `url(${opt.bgImg}) repeat` } : null}
    >
      {children}
    </div>
  );
};

export default BodyBlock;

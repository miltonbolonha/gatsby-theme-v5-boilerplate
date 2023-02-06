import React from "react";

const BodyBlock = ({ children, opt, killSEO, topology }) => {
  const { options } = opt;
  return (
    <div
      className={options.classes}
      style={{ background: `url(${opt.bgImg}) repeat` }}
    >
      {children}
    </div>
  );
};

export default BodyBlock;

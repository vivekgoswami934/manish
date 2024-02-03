import React, { forwardRef } from "react";

const PinInput = forwardRef(
  (
    { perInputBox, onChangeHandler, backspaceHandler, disabledBoolean = false },
    ref
  ) => {
    const handleKeyUp = (e) => {
      
      //backspace button
      if (e.keyCode === 8) {
        backspaceHandler(e);
      } else {
        onChangeHandler(e);
      }
    };

    return (
      <input
        ref={ref}
        maxLength={perInputBox}
        onKeyUp={handleKeyUp}
        disabled={disabledBoolean}
        className="input-pin"
      />
    );
  }
);

export default PinInput;
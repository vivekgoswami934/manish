import { useEffect, useRef, useState } from "react";
import PinInput from "./PinInput";

const Pin = ({ length = 4, perInputBox = 1, setPinFn = () => {} }) => {
  const [inputBoxLength] = useState(new Array(length).fill("")); // ["","","",""]

  const [inputBoxValue] = useState(new Array(length).fill(""));

  const inputRef = useRef([]);

  const onChangeHandler = (event, index) => {
    inputBoxValue[index] = event.target.value;
    if (
      index < length - 1 &&
      inputRef.current[index].value.length === perInputBox
    ) {
      inputRef.current[index + 1].focus();
    }

    setPinFn(inputBoxValue.join(""));
  };

  const backspaceHandler = (e, index) => {
    if (index > 0 && e.target.value === "") {
      inputRef.current[index - 1].focus();
    }
    inputBoxValue[index] = e.target.value;
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const copyData = e.clipboardData
      .getData("text")
      .split("")
      .filter((_, index) => index < length * perInputBox); // 123456789123456789123456789

    let arr = [];

    for (let i = 0; i < length * perInputBox; i += perInputBox) {
      let str = "";
      for (let j = i; j < perInputBox + i; j++) {
        str += copyData[j];
      }
      arr.push(str);
    }
    console.log(arr, copyData);
    arr.forEach((item, index) => {
      inputBoxValue[index] = item;

      inputRef.current[index].value = item;

      if (index < length - 1) {
        inputRef.current[index + 1].focus();
      }
    });

    setPinFn(inputBoxValue.join(""));
  };

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  return (
    <div onPaste={handlePaste} className="input-div">
      {inputBoxLength.map((value, index) => {
        return (
          <PinInput
            key={index}
            ref={(inputRefElement) =>
              (inputRef.current[index] = inputRefElement)
            }
            perInputBox={perInputBox}
            onChangeHandler={(e) => onChangeHandler(e, index)}
            backspaceHandler={(e) => backspaceHandler(e, index)}
          />
        );
      })}
    </div>
  );
};

export default Pin;

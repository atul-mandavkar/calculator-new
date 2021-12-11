import Wrapper from "./components/Wrapper";
import Wrapper2 from "./components/Wrapper2";
import DisplayScreen from "./components/DisplauScreen";
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";
import ButtonBox from "./components/ButtonBox";
import Buttons from "./components/Buttons";
import React, {useState} from "react";

const buttonName = [
  ["C", "+-", "Del", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="]
];
// onClick part remaining

function App() {
  let [calc, setCalc] = useState({
    num: 0,
    res: 0,
    upRes: "",
    sign: "",
    checkNum: true
  });
  const localString = (x) => {
    if(x.length > 1 && x[0] === "0" && x[1] !== "."){
      console.log("local1")
      return x.slice(1, x.length);
    }
    console.log("local2")
    console.log(x)
    return x;
  };
  const removeSpaces = (x) => {
    console.log("removeSpace");
    return String(x).replace(/\s/g, "");
  };
  const correctSign = (x) => {
    if(String(x).match(/[X]/g)){
      console.log("correctSign1");
      return String(x).replace("X", "*");
    }
    console.log("correctSign2")
    return x;
  };
  const changeLastSign = (x, y) => {
    const z = String(x).substring(0, x.length-1);
    console.log("changeLastSign")
    return String(z + y);
  };
  const correctDecimal = (x) => {
    if(x[x.length-1] === "."){
      console.log("correctDecimal1")
      return x + "0";
    }
    console.log("correctDecimal2")
    return x;
  };
  const InvertChange = (x, y) => {
    console.log(x + " string ");
    console.log("find " + y);
    let ind = String(x).lastIndexOf(y); 
    console.log(String(x).length)
    console.log("y "+ ind)
    let sub = String(x).substring(ind, String(x).length);
    console.log("sub "+ sub)
    let sub1 = String(x).substring(0, ind);
    console.log(sub1)
    let sub2 = -Number(sub);
    console.log(sub2);
    console.log(InvertChange);
    
    return (sub1 + sub2);
  }

  const numClickHandler = (e) => {
    console.log("number");
    const value = e.target.innerHTML;
    console.log(value);

    if(removeSpaces(calc.num).length < 16){
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
          ? 0
          : localString(removeSpaces(calc.num + value)),
        upRes:
          calc.num === 0 && value === "0"
          ? calc.upRes
          : calc.upRes + value
      });
    }
    else{
      alert("Only 16 digits number avaialble", "try again");
    }
  };
  const signClickHandler = (e) => {
    console.log("sign");
    const value = (e.target.innerHTML);
    //console.log(value);
    console.log(correctSign(value));
    console.log(calc.upRes)
    console.log("<<< "+calc.num+" ]]]")

    setCalc({
      ...calc,
      num: 0,
      sign: value,
      upRes:
        Number(calc.upRes[calc.upRes.length - 1])
        ? calc.upRes + value
        : calc.upRes[calc.upRes.length-1] === "0" && calc.upRes[calc.upRes.length-2] === "."
        ? correctDecimal(calc.upRes) + value
        : calc.upRes[calc.upRes.length-1] === "0"
        ? calc.upRes + value
        : changeLastSign(calc.upRes, value)
    });
  };
  const invertClickHandler = () => {
    console.log("invert");

    if(removeSpaces(calc.num).length < 16){
      setCalc({
        ...calc,
        num: 
          calc.num && calc.upRes[calc.upRes.length - 1] !== "."
          ? -(calc.num)
          : calc.num,
        upRes:
          calc.num && calc.upRes[calc.upRes.length - 1] !== "."
          ? InvertChange(calc.upRes, calc.num)
          : calc.upRes
      });
    }
  };
  const equalClickHandler = (e) => {
    console.log("equal");
    const value = e.target.innerHTML;
    console.log(value);
    console.log(calc.upRes)
  };
  const dotClickHandler = (e) => {
    console.log("dot");
    const value = e.target.innerHTML;
    console.log(value);

    if(removeSpaces(calc.num).length < 16 && !String(calc.num).match(/[.]/)){
      setCalc({
        ...calc,
        num:
          calc.num === 0
          ? "0" + value
          : calc.num + value,
        upRes:
          calc.num !== 0
          ? calc.upRes + value
          : calc.num === 0
          ? calc.upRes + "0" + value
          : calc.upRes
      });
    }
  };
  const resetClickHandler = () => {
    console.log("reset");
    setCalc({
      ...calc,
      num: 0,
      res: 0,
      upRes: "",
      sign: ""
    });
  };
  const deleteClickHandler = () => {
    console.log("delete");

    if(calc.upRes.length > 0 && calc.upRes[calc.upRes.length-1] !== "+" && calc.upRes[calc.upRes.length-1] !== "-" && calc.upRes[calc.upRes.length-1] !== "X" && calc.upRes[calc.upRes.length-1] !== "/"){
      setCalc({
        ...calc,
        num: removeSpaces(calc.num).substring(0, removeSpaces(calc.num).length-1),
        upRes:
          calc.upRes !== "0"
          ? removeSpaces(calc.upRes).substring(0, removeSpaces(calc.upRes).length-1)
          : "",
        sign: ""
      });
    }
  };

  return (
    <Wrapper>
      <Wrapper2>
        <DisplayScreen>
          <Screen2 value={calc.upRes}/>
          <Screen1 value={calc.num ? calc.num : calc.sign ? calc.sign: calc.res} />
        </DisplayScreen>
        <ButtonBox>
          {buttonName.flat().map((btn, i)=>{
            return (
              <Buttons key={i}
                className={
                  btn === "C"
                  ? "resetSign"
                  : btn === "Del"
                  ? "deleteSign"
                  : btn === "+"
                  ? "plusSign"
                  : btn === "="
                  ? "equalSign"
                  : ""
                }
                value={btn}
                onClick={
                  btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? dotClickHandler
                  : btn === "Del"
                  ? deleteClickHandler
                  : btn === "="
                  ? equalClickHandler
                  : numClickHandler
                }
              />
            );
          })}
        </ButtonBox>
      </Wrapper2>
    </Wrapper>
  );
}

export default App;

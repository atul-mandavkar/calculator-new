import Wrapper from "./components/Wrapper";
import Wrapper2 from "./components/Wrapper2";
import DisplayScreen from "./components/DisplauScreen";
import Screen1 from "./components/Screen1";
import Screen2 from "./components/Screen2";
import ButtonBox from "./components/ButtonBox";
import Buttons from "./components/Buttons";

const buttonName = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="]
];
// onClick part remaining

function App() {
  return (
    <Wrapper>
      <Wrapper2>
        <DisplayScreen>
          <Screen1 value="abcd" />
          <Screen2 value="xyz" />
        </DisplayScreen>
        <ButtonBox>
          {buttonName.flat().map((btn, i)=>{
            return (
              <Buttons key={i}
                className={
                  btn === "C"
                  ? "resetSign"
                  : btn === "+"
                  ? "plusSign"
                  : btn === "="
                  ? "equalSign"
                  : ""
                }
                value={btn}
              />
            );
          })}
        </ButtonBox>
      </Wrapper2>
    </Wrapper>
  );
}

export default App;

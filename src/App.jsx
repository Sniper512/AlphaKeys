import Button from "./Button/Button.jsx";
import { useEffect, useState } from "react";

function App() {
  const [words, setWords] = useState("25");
  const [arrayword, setArrayWord] = useState([]);
  const [wpm, setWpm] = useState(0);
  let [loading, setLoading] = useState(false);

  function handleRadio(e) {
    setWords(e.target.value);
    document.querySelector("#typeInput").focus();
    const radios = document.querySelectorAll(".labelRadio");
    radios.forEach((element) => (element.className = "labelRadio"));
    e.target.parentElement.className += " radio-bg";
  }

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const fetchWords = async () => {
      try {
        const response = await fetch(`https://random-word-api.herokuapp.com/word?number=${words}`);
        const data = await response.json();
        if (mounted) {
          setArrayWord(data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    fetchWords();

    return () => {
      mounted = false;
    };
  }, [words]);

  return (
    <>
      <h1>Have Fun Typing!</h1>
      <div className="container hight-30">
        <div className="Panel">
          <div className="wordContContainer">
            <label htmlFor="twentyFive" className="labelRadio radio-bg">
              <input type="radio" id="twentyFive" className="Radio" value="25" checked={words == "25"} onChange={handleRadio} />
              25
            </label>
            <label htmlFor="Fifty" className="labelRadio">
              <input type="radio" id="Fifty" className="Radio" value="50" checked={words == "50"} onChange={handleRadio} />
              50
            </label>
            <label htmlFor="oneHundred" className="labelRadio">
              <input type="radio" id="oneHundred" className="Radio" value="100" checked={words == "100"} onChange={handleRadio} />
              100
            </label>
            <label htmlFor="oneFifty" className="labelRadio">
              <input type="radio" id="oneFifty" className="Radio" value="150" checked={words == "150"} onChange={handleRadio} />
              150
            </label>
          </div>
          <p>WPM: {wpm}</p>
        </div>
      </div>

      <div className="container">
        <Button word={arrayword} wpm={setWpm} setword={setWords} loading={loading} setLoading={setLoading} />
      </div>
    </>
  );
}

export default App;

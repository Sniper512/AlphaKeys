import style from "./Button.module.css";
import RiseLoader from "react-spinners/RiseLoader";
function Button(props) {
  const keyboardLayout = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["LShift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
    ["LCtrl", "LAlt", "Space", "Alt", "Ctrl"],
  ];

  const firstrow = keyboardLayout[0].map((element) =>
    element == "Backspace" ? (
      <button key={element} className={`${style.firstbutton} ${style.mediumBtn}`} id={element}>
        {element}
      </button>
    ) : (
      <button key={element} className={style.firstbutton} id={element.toLowerCase()}>
        {element}
      </button>
    )
  );
  const secondrow = keyboardLayout[1].map((element) =>
    element == "Tab" ? (
      <button key={element} className={`${style.firstbutton} ${style.mediumBtn}`} id={element}>
        {element}
      </button>
    ) : (
      <button key={element} className={style.firstbutton} id={element.toLowerCase()}>
        {element}
      </button>
    )
  );
  const thirdrow = keyboardLayout[2].map((element) =>
    element == "Enter" || element == "CapsLock" ? (
      <button key={element} className={`${style.firstbutton} ${style.enterBtn}`} id={element}>
        {element}
      </button>
    ) : (
      <button key={element} className={style.firstbutton} id={element.toLowerCase()}>
        {element}
      </button>
    )
  );
  const fourhtrow = keyboardLayout[3].map((element) =>
    element == "LShift" || element == "Shift" ? (
      <button key={element} className={`${style.firstbutton} ${style.shiftBtn}`} id={element}>
        {element}
      </button>
    ) : (
      <button key={element} className={style.firstbutton} id={element.toLowerCase()}>
        {element}
      </button>
    )
  );
  const fiftrow = keyboardLayout[4].map((element) => {
    if (element === "Space") {
      return (
        <button key={element} className={`${style.firstbutton} ${style.spaceBtn}`} id={element}>
          {element}
        </button>
      );
    } else if (element === "LCtrl" || element === "Ctrl") {
      return (
        <button key={element} className={`${style.firstbutton} ${style.enterBtn}`} id={element}>
          {element}
        </button>
      );
    }
    return (
      <button key={element} className={style.firstbutton} id={element}>
        {element}
      </button>
    );
  });
  let newtem = "";
  let begin;
  const test = (event) => {
    if (!begin) {
      begin = performance.now();
    }
    const targetValueInput = document.querySelector("#typeWords");
    const keyIdentify = event.key;
    let sanitizedKey = keyIdentify.replace(/([.*+?^=!:${}()`|\[\]\/\\-])/g, "\\$1");
    sanitizedKey == " " ? (sanitizedKey = "Space") : sanitizedKey;
    sanitizedKey == "Control" ? (sanitizedKey = "Ctrl") : sanitizedKey;
    const LBtn = ["Ctrl", "Shift", "Alt"];
    if (LBtn.includes(sanitizedKey)) {
      const whitL = "L" + sanitizedKey;
      const target = document.querySelector(`#${sanitizedKey}`);
      const whitLTarget = document.querySelector(`#${whitL}`);
      setTimeout(() => {
        target.className += ` ${style.newbutton}`;
        whitLTarget.className += ` ${style.newbutton}`;
      }, 15);
      if (target.classList.contains(style.newbutton)) {
        whitLTarget.classList.remove(style.newbutton);
        target.classList.remove(style.newbutton);
      }
    } else {
      const target = document.querySelector(`#${sanitizedKey}`);
      target.click();
      setTimeout(() => {
        target.className += ` ${style.newbutton}`;
      }, 15);
      if (target.classList.contains(style.newbutton)) {
        target.classList.remove(style.newbutton);
      }
    }

    // typing logic
    if (keyIdentify == targetValueInput.value.charAt(0)) {
      let temval = targetValueInput.value;
      targetValueInput.value = temval.slice(1);
      newtem += keyIdentify;
    } else if (keyIdentify == "Backspace") {
      targetValueInput.value = newtem.charAt(newtem.length - 1) + targetValueInput.value;
      newtem = newtem.slice(0, newtem.length - 1);
    } else if (targetValueInput.value.length == 0) {
      const end = performance.now() - begin;
      const endMinute = end / (1000 * 60);
      console.log(event.target.value.length, endMinute);
      props.wpm((event.target.value.length / 5 / endMinute).toFixed(2));
      event.target.value = "";
      begin = 0;
      console.log(props.word.length);
      switch (props.word.length) {
        case 25:
          props.setword("1");
          setTimeout(() => {
            props.setword("25");
          }, 0);
          break;
        case 50:
          props.setword("1");
          setTimeout(() => {
            props.setword("50");
          }, 0);
          break;
        case 100:
          props.setword("1");
          setTimeout(() => {
            props.setword("100");
          }, 0);
          break;
        case 150:
          props.setword("1");
          setTimeout(() => {
            props.setword("150");
          }, 0);
          break;
      }
    } else {
      setTimeout(() => {
        document.querySelector("#typeInput").value = "";
        document.querySelector("#typeInput").value = newtem;
      }, 0);
    }
  };

  return (
    <div className={style.keyboard}>
      {props.loading ? (
        <RiseLoader loading={props.loading} size={25} aria-label="Loading Spinner" data-testid="loader" />
      ) : (
        <div>
          <input autoFocus type="text" id="typeInput" className={style.textToType} onKeyDown={(event) => test(event)} autoComplete="off" />
          <input disabled type="text" id="typeWords" className={`${style.textToType} ${style.textForType}`} value={props.word.join(" ")} />
        </div>
      )}

      <br />
      <br />
      <div>{firstrow}</div>
      <div>{secondrow}</div>
      <div>{thirdrow}</div>
      <div>{fourhtrow}</div>
      <div>{fiftrow}</div>
    </div>
  );
}
export default Button;

import style from "./Button.module.css";
function Button() {
  const keyboardLayout = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["CapsLock", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "Enter"],
    ["LShift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
    ["LCtrl", "LAlt", "Space", "Alt", "Ctrl"],
  ];

  const firstrow = keyboardLayout[0].map((element) =>
    element == "Backspace" ? (
      <button key={element} className={`${style.firstbutton} ${style.mediumBtn}`} id={element} onClick={(e) => targetClick(e)}>
        {element}
      </button>
    ) : (
      <button key={element} className={style.firstbutton} id={element.toLowerCase()} onClick={(e) => targetClick(e)}>
        {element}
      </button>
    )
  );
  const secondrow = keyboardLayout[1].map((element) =>
    element == "Tab" ? (
      <button key={element} className={`${style.firstbutton} ${style.mediumBtn}`} id={element} onClick={(e) => targetClick(e)}>
        {element}
      </button>
    ) : (
      <button key={element} className={style.firstbutton} id={element.toLowerCase()} onClick={(e) => targetClick(e)}>
        {element}
      </button>
    )
  );
  const thirdrow = keyboardLayout[2].map((element) =>
    element == "Enter" || element == "CapsLock" ? (
      <button key={element} className={`${style.firstbutton} ${style.enterBtn}`} id={element} onClick={(e) => targetClick(e)}>
        {element}
      </button>
    ) : (
      <button key={element} className={style.firstbutton} id={element.toLowerCase()} onClick={(e) => targetClick(e)}>
        {element}
      </button>
    )
  );
  const fourhtrow = keyboardLayout[3].map((element) =>
    element == "LShift" || element == "Shift" ? (
      <button key={element} className={`${style.firstbutton} ${style.shiftBtn}`} id={element} onClick={(e) => targetClick(e)}>
        {element}
      </button>
    ) : (
      <button key={element} className={style.firstbutton} id={element.toLowerCase()} onClick={(e) => targetClick(e)}>
        {element}
      </button>
    )
  );
  const fiftrow = keyboardLayout[4].map((element) => {
    if (element === "Space") {
      return (
        <button key={element} className={`${style.firstbutton} ${style.spaceBtn}`} id={element} onClick={(e) => targetClick(e)}>
          {element}
        </button>
      );
    } else if (element === "LCtrl" || element === "Ctrl") {
      return (
        <button key={element} className={`${style.firstbutton} ${style.enterBtn}`} id={element} onClick={(e) => targetClick(e)}>
          {element}
        </button>
      );
    }
    return (
      <button key={element} className={style.firstbutton} id={element} onClick={() => targetClick()}>
        {element}
      </button>
    );
  });

  const test = (event) => {
    const keyIdentify = event.key;
    let sanitizedKey = keyIdentify.replace(/([.*+?^=!:${}()`|\[\]\/\\-])/g, "\\$1");
    sanitizedKey == " " ? (sanitizedKey = "Space") : sanitizedKey;
    sanitizedKey == "Control" ? (sanitizedKey = "Ctrl") : sanitizedKey;
    const LBtn = ["Ctrl", "Shift", "Alt"];
    if (LBtn.includes(sanitizedKey)) {
      const whitL = "L" + sanitizedKey;
      const target = document.querySelector(`#${sanitizedKey}`);
      const whitLTarget = document.querySelector(`#${whitL}`);

      target.click();
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
  };
  const targetClick = (e) => {
    console.log(`${e.target.textContent} am click`);
  };
  return (
    <div className={style.keyboard}>
      <input autoFocus type="text" name="" className={style.textToType} onKeyDown={(event) => test(event)} />
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

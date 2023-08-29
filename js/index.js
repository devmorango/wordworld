const 정답 = "APPLE";
let index = 0;
let attempts = 0;
let timer;
function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다";
    div.style =
      "display:flex;justify-content:center;align-items:center;position:absolute;top:47vh;left:42.3vw;background-color:#FF811E;width:200px;height:100px;font-family: sans-serif;font-weight:bold;border-radius:10px;";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterkey = () => {
    let 맞은_개수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        block.style.background = "#6AAA6A";
        맞은_개수 += 1;
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }

    if (맞은_개수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }

    if (index !== 0) index -= 1;
  };

  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );
    if (e.keyCode === 8) handleBackspace();
    else if (index === 5) {
      if (e.key === "Enter") handleEnterkey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "00");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "00");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${분}:${초}`;
    }
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();

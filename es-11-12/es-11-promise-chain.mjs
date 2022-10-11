import luckyDraw from "./luckydraw.mjs";

luckyDraw("Joe")
  .then((firstPlayerData) => console.log(firstPlayerData))
  .then(function () {
    return luckyDraw("Caroline");
  })
  .then(function (secondPlayerData) {
    console.log(secondPlayerData);
  })
  .then(function () {
    return luckyDraw("Sabrina");
  })
  .then(function (thirdPlayerData) {
    console.log(thirdPlayerData);
  })
  .catch(function (error) {
    console.error(error);
  });

import luckyDraw from "./luckydraw.mjs";

async function getResults() {
  try {
    const results = await Promise.all([
      luckyDraw("Tina"),
      luckyDraw("Jorge"),
      luckyDraw("Julien"),
    ]);
    console.log(results);
  } catch (error) {
    console.error(error);
  }
}

getResults();

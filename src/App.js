const MissionUtils = require("@woowacourse/mission-utils");
const Calculator = require("./Calculator");
const Comparator = require("./Comparator");
const Lotto = require("./Lotto");
const NumberGenerator = require("./NumberGenerator");

class App {
  play() {
    MissionUtils.Console.print("구입금액을 입력해 주세요.");

    const calculator = new Calculator();
    const purchaseAmount = this.receivePurchaseAmount();
    const amountOfLotto = calculator.calculateAmountOfLotto(purchaseAmount);
    MissionUtils.Console.print(`${amountOfLotto}개를 구매했습니다.`);

    const numberGenerator = new NumberGenerator();
    const listOfNumbers = new Array();
    for (let i = 0; i < amountOfLotto; i++) {
      let numbersOfLotto = numberGenerator.createNumbersOfLotto(amountOfLotto);
      const lotto = new Lotto(numbersOfLotto);
      lotto.validate(numbersOfLotto);
      MissionUtils.Console.print(`[${numbersOfLotto.join(", ")}]`);
      listOfNumbers.push(numbersOfLotto);
    }

    MissionUtils.Console.print("당첨 번호를 입력해 주세요.");
    const winningNumbers = this.receiveWinningNumbers();

    MissionUtils.Console.print("보너스 번호를 입력해 주세요.");
    const bonusNumber = this.receiveBonusNumber();

    MissionUtils.Console.print("당첨 통계");
    const comparator = new Comparator();
    comparator.compare(listOfNumbers, winningNumbers, bonusNumber);
  }

  receivePurchaseAmount() {
    let purchaseAmount = 0;
    MissionUtils.Console.readLine("로또 구입 금액", (answer) => {
      console.log(answer);
      purchaseAmount = answer;
    });
    this.checkPurchaseAmount(purchaseAmount);
    return purchaseAmount;
  }

  checkPurchaseAmount(purchaseAmount) {
    if (purchaseAmount % 1000 !== 0) {
      console.log("[ERROR]");
      throw new Error("[ERROR]");
    }
  }

  receiveWinningNumbers() {
    let winningNumbers;
    MissionUtils.Console.readLine("당첨 번호", (answer) => {
      console.log(answer);
      winningNumbers = answer;
    });
    return winningNumbers;
  }

  receiveBonusNumber() {
    let bonusNumber;
    MissionUtils.Console.readLine("보너스 번호", (answer) => {
      console.log(answer);
      bonusNumber = answer;
    });
    return bonusNumber;
  }
}

module.exports = App;

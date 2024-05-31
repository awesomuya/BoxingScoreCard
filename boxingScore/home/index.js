document.addEventListener("DOMContentLoaded", function () {
  const addRoundBtn = document.getElementById("roundBtn");
  const resetBtn = document.getElementById("resetBtn");
  const fighter1 = document.getElementById("Fighter1");
  const fighter2 = document.getElementById("Fighter2");

  addRoundBtn.addEventListener("click", function () {
    const createRow = (fighterId, className) => {
      const row = document.createElement("tr");
      row.classList.add("score-row");

      const cell1 = document.createElement("td");
      cell1.classList.add("score-cell");
      const cell2 = document.createElement("td");
      cell2.classList.add("score-cell");
      const cell3 = document.createElement("td");
      cell3.classList.add("score-cell");
      const cell4 = document.createElement("td");
      cell4.classList.add("score-cell");

      const input1 = document.createElement("input");
      input1.setAttribute("type", "number");
      input1.classList.add(`${className}Points`);
      input1.classList.add("score-input");

      const input2 = document.createElement("input");
      input2.setAttribute("type", "number");
      input2.classList.add(`${className}Deds`);
      input2.classList.add("score-input");

      const input3 = document.createElement("input");
      input3.setAttribute("type", "number");
      input3.classList.add(`${className}Round`);
      input3.classList.add("score-input");

      cell1.appendChild(input1);
      cell2.appendChild(input2);
      cell3.appendChild(input3);
      cell4.textContent = `Round ${fighterId.rows.length - 1}`;

      row.appendChild(cell1);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);

      fighterId.insertBefore(row, fighterId.lastElementChild);
    };

    createRow(fighter1, "rw");
    createRow(fighter2, "rwB");
  });

  resetBtn.addEventListener("click", function () {
    const resetTable = (fighterId) => {
      while (fighterId.rows.length > 2) {
        fighterId.deleteRow(1);
      }
    };
    resetTable(fighter1);
    resetTable(fighter2);
  });

  const saveBtn1 = document.getElementById("saveBtn1");
  const saveBtn2 = document.getElementById("saveBtn2");
  const clearBtn1 = document.getElementById("clearBtn1");
  const clearBtn2 = document.getElementById("clearBtn2");
  const fighterAscoreBtn = document.getElementById("fighterAscore");
  const fighterBscoreBtn = document.getElementById("fighterBscore");

  const container1 = document.getElementById("output1");
  const container2 = document.getElementById("output2");
  const input1 = document.getElementById("fighterA");
  const input2 = document.getElementById("fighterB");

  saveBtn1.addEventListener("click", function () {
    appendFighterName(input1.value, container1);
  });

  saveBtn2.addEventListener("click", function () {
    appendFighterName(input2.value, container2);
  });

  clearBtn1.addEventListener("click", function () {
    clearInput(input1, container1);
  });

  clearBtn2.addEventListener("click", function () {
    clearInput(input2, container2);
  });

  fighterAscoreBtn.addEventListener("click", function () {
    calculateFighterTotal(fighter1, "rw");
  });

  fighterBscoreBtn.addEventListener("click", function () {
    calculateFighterTotal(fighter2, "rwB");
  });

  function appendFighterName(name, container) {
    const paragraph = document.createElement("p");
    paragraph.textContent = name;
    container.appendChild(paragraph);
  }

  function clearInput(input, container) {
    input.value = "";
    container.innerHTML = "";
  }

  function calculateFighterTotal(fighterId, className) {
    let total = 0;
    for (let i = 1; i <= fighterId.rows.length - 2; i++) {
      const points = fighterId.rows[i].querySelector(`.${className}Points`);
      const deds = fighterId.rows[i].querySelector(`.${className}Deds`);
      const roundInput = fighterId.rows[i].querySelector(`.${className}Round`);

      const netPoints = calculateNetPoints(
        Number(roundInput.value),
        Number(deds.value),
        Number(points.value)
      );
      if (!isNaN(netPoints)) {
        total += netPoints;
        roundInput.value = netPoints;
        if (netPoints === 10) {
          roundInput.style.backgroundColor = "green";
        } else {
          roundInput.style.backgroundColor = "red";
        }
      } else {
        window.alert(`Please score round ${i}`);
        return;
      }
    }
    if (className === "rw") {
      document.getElementById("totalA").textContent = total;
    } else {
      document.getElementById("totalB").textContent = total;
    }
    winner();
  }

  function calculateNetPoints(total, deductions, points) {
    return points - deductions;
  }

  function winner() {
    const totalA = parseFloat(document.getElementById("totalA").textContent);
    const totalB = parseFloat(document.getElementById("totalB").textContent);

    if (!isNaN(totalA) && !isNaN(totalB)) {
      if (totalA > totalB) {
        window.alert("Fighter A wins!");
      } else if (totalA < totalB) {
        window.alert("Fighter B wins!");
      } else {
        window.alert("The fight is a draw");
      }
    } else {
      window.alert("Please calculate both fighters' scores first.");
    }
  }
});

//variables and data types
//operators
//control structures : conditional statements, loops, statements
//funtions and methods
//objects and classes
//data structures
//dom manipulation & event handling
//asynchronous programming

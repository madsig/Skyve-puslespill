//model
const app = document.getElementById('app');
let numbers = [4, 3, 8, 6, '', 5, 1, 7, 2];
let index = 0;
const correct = [1, 2, 3, 4, 5, 6, 7, 8, '']

//view
updateView();
function updateView() {
    app.innerHTML = '';
    for (i = 0; i < 9; i++) {
        app.innerHTML += /*HTML*/`
             <div class="box" id="${i}">${numbers[i]}</div>
         `;
    }
}

//controller
app.addEventListener("click", handleClick);
function handleClick(event) {
    if (event.target.id === "app") return;
    let clickedBox = parseInt(event.target.id);
    let emptyBox = numbers.indexOf('');

    if (isAdjacent(clickedBox, emptyBox)) {
        numbers = numbers.swapItems(clickedBox, emptyBox);
        updateView();
        checkWin();
    }
}


function isAdjacent(box1, box2) {
    const adjacencyMap = {
        0: [1, 3],
        1: [0, 2, 4],
        2: [1, 5],
        3: [0, 4, 6],
        4: [1, 3, 5, 7],
        5: [2, 4, 8],
        6: [3, 7],
        7: [4, 6, 8],
        8: [5, 7]
    };
    return adjacencyMap[box1].includes(box2);
}

Array.prototype.swapItems = function (a, b) {
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
}

function checkWin() {
    if (JSON.stringify(numbers) == JSON.stringify(correct)) {
        setTimeout(function () {
            alert("Gratulerer! Du greide det");
            app.removeEventListener("click", handleClick);
        }, 200);
    }
}
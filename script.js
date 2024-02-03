let boxes = document.querySelectorAll(".box");
let rstBtn = document.querySelector("#resetBtn");
let newBtn = document.querySelector('#newBtn');
let cont = document.querySelector(".msg");
let p = document.querySelector('#msg');
let turnX = true;
let counter = 0;
// array of array 
const winPatters = [
    [0,1,2], [0,3,6], [0,4,8],
    [1,4,7], [2,5,8], [2,4,6],
    [3,4,5], [6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener('click', () =>{
        // console.log("clicked");
        if(turnX){
            box.innerText = 'X';
            box.style.color = "red";
            turnX = false;
            
        } else{
            box.innerText = 'O';
            box.style.color = "blue";
            turnX = true;
        }
        box.disabled = true;
        counter++;
        if (checkWinner() || checkDraw()) {
            counter = 0
        }
    })
});

const disabBox = () => {
    for(let box of boxes){
        box.disabled=true;
    }
}

const enabBox = () => {
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const rstGame =() =>{
    turnX=true;
    enabBox();
    cont.classList.add("hide");
}

const showWinner = (winner) => {
    p.innerText = `Winner is ${winner}`;
    cont.classList.remove("hide");
    disabBox();
}

const checkDraw = () => {
    if(counter%boxes.length === 0){
        p.innerText = "It's a draw."
        cont.classList.remove("hide");
        disabBox();
        return 1
    }
    return 0
}

const checkWinner = ()=> {
    for(let pattern of winPatters){
        // console.log(
        //     boxes[pattern[0]].innerText,
        //     boxes[pattern[1]].innerText, 
        //     boxes[pattern[2]].innerText
        // );
        let posVal = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(posVal!="" && pos2Val!="" && pos3Val!=""){
            if(posVal===pos2Val && pos2Val===pos3Val){
                // console.log("winner", posVal);
                showWinner(posVal);
                return 1
            }
        } 
    }
    return 0
};

newBtn.addEventListener("click", rstGame);
rstBtn.addEventListener("click", rstGame);
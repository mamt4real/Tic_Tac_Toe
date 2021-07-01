/*
    Author: Mahadi Abuhuraira
    contact: mamt4real@gmail.com 08064241674
    github: @mamt4real
    date: June/2021
*/
var playerX = true;
var autoM = false;
var diffculty = "easy";
var ids = ["b1","b2","b3","b4","b5","b6","b7","b8","b9"];
var x_ids = [];
var o_ids = [];
var wins = [["b1","b2","b3"],
            ["b4","b5","b6"],
            ["b7","b8","b9"],
            ["b1","b4","b7"],
            ["b2","b5","b8"],
            ["b3","b6","b9"],
            ["b1","b5","b9"],
            ["b3","b5","b7"]]

function showMenu(){
    let menu = document.getElementById("menu");
    let disp = menu.style.display;
    if(disp == ""){
        menu.style.display = "block";
    }else{
        menu.style.display = "";
    }
}
function hideMenu(){
    document.getElementById("menu").setAttribute("style","display:''");
}

function showHelp(){
    let menu = document.getElementById("menu");
    menu.style.display = "";
    let help = document.getElementById("help");
    help.style.display = "block";
}
function hideHelp(){
    let help = document.getElementById("help");
    help.style.display = "";
}

function activateAuto(val){
    autoM = val;
    if(val){
        document.getElementById("mode-head").innerText = "Single Player (" + diffculty + ")";
        document.getElementById("diff-control").style.display = "block";
    }
    else{
        document.getElementById("mode-head").innerText = "Multiplayer";
        document.getElementById("diff-control").style.display = "none";
    }
    reset(1);
}
function setDifficulty(val){
    diffculty = val;
    document.getElementById("mode-head").innerText = "Single Player (" + diffculty + ")";
    reset(1);
}
function getEasy(){
    //this method returns a random id
    return ids[Math.floor(Math.random()*ids.length)];
}

function getNormal(normal){
    /*this method first check if playerO/playerX can win
    *if yes it returns the required id
    *else returns a random id
    */
    let id = getEasy();
    let found = false;
    let temp = normal?o_ids:x_ids;
    //check possible winning position for playerO if normal == true else check for playerX
    for(i=0;i<8;i++){
        let w = wins[i];
        let count = 0;
        //for each possible win combination
        for(j=0;j<3;j++){
            //count the number of ids that playerO/playerX has already
            if(temp.indexOf(w[j])>=0)
                count++;
        }
        //if there are exactly two of the ids in the ids of playerO/playerX then choose the last id and set found = true
        if(count==2){
            for(j=0;j<3;j++){
                if(ids.indexOf(w[j])>=0){
                    id = w[j];
                    found=true;
                }
            }
        }
        if(found)
            break;
    }
    return [id,found];
}

function getHard(){
    /*this method first check if playerO can win
    *if yes it returns the required id
    *else it checks the required id to block playerX from winning and returns it
    *else returns a random id
    */
    let id = getNormal(true);
    if(id[1])
        return id[0];
    else
        return getNormal(false)[0];
}


function autoMove(){
    let id = ids[0];
    switch(diffculty){
        case "easy":
            id = getEasy();
            break;
        case "normal":
            id = getNormal(true)[0];
            break;
        case "hard":
            id = getHard();
            break;
    }
    click_func(id);

}
function click_func(btn_id){
    btn = document.getElementById(btn_id);
    turn = document.getElementById("turn");
    if(btn.innerText == ""){
        if(playerX){
            btn.innerText = "X";
            btn.setAttribute("style","color:white;");
            turn.innerText = turn.innerText.replace("X","O");
            x_ids.push(btn_id);
        }else{
            btn.innerText = "O";
            btn.setAttribute("style","color:red;");
            turn.innerText = turn.innerText.replace("O","X");
            o_ids.push(btn_id);                        
        }
        ids.splice(ids.indexOf(btn_id),1);
        check_win();
        playerX = !playerX;
        if(autoM && (!playerX))
            setTimeout(autoMove,500);
        
    }
}
function check_win(){

    if(playerX){
        temp = x_ids;
        score = document.getElementById("x_score");
        p = "X";
    }else{
        temp = o_ids;
        score = document.getElementById("o_score");
        p = "O";
    }
    if(temp.length >= 3)
    for(i=0;i<wins.length;i++){
        let found = true;
        for(j = 0;j<3;j++){
            if(!temp.includes(wins[i][j])){
                found = false;
                break;
            }
        }
        if(found){
            alert("Player " + p + " wins!");
            score.innerText = parseInt(score.innerText) + 1;
            reset(0);
            break;
        }
    }
    if(o_ids.length + x_ids.length == 9){
        alert("its's a tie!");
        reset(0);
    }

}
function reset(a){
    let btns = document.getElementsByClassName("btns");
    hideMenu();
    x_ids = [];
    o_ids =[];
    ids = ["b1","b2","b3","b4","b5","b6","b7","b8","b9"];             
    for(i=0;i<btns.length;i++)
        btns[i].innerText = "";
    if(a == 1){
        document.getElementById("x_score").innerText = 0;
        document.getElementById("o_score").innerText = 0;
        playerX = true;
        document.getElementById("turn").innerText = "Player X's turn";
    }
    
}
let colors = [
    '#C94C24',
    '#C4226F',
    '#859835',
    '#33d6d3',
    '#F0AD4E',
    '#1fad39',
    '#377ad2',
    '#831cbf'
];


// count the screen height
let windowHeight = window.innerHeight;
let divHeight = document.getElementById("div-box").style.height = windowHeight - 190 + "px" ;
console.log(divHeight);

let manyBoxes = 200;
makeBoxes(manyBoxes);
let divLength;

// This will create boxes with random colors
function makeBoxes(boxesNumber) {
    let element;
    let myNode = document.querySelector('.boxes');
    for (let i = 0; i < boxesNumber; i++) {
        let colorString = colors[Math.floor(Math.random() * colors.length)]
        element = document.createElement("div");
        element.className = 'box';
        element.style = "background-color:" + colorString;
        element.setAttribute("data-id", i);
        myNode.appendChild(element);
    }

}
divLength = $('div.box').length;
let previousElement = null;
// When you click to hide the box
$('.boxes').on("click", ".box", function(e) {

    divLength = $('div.box').length;

    // chick if the element that you clicked on it is null
    if (previousElement != null) {

        // Then we check if you are clicking the same element to time
        if($(previousElement).attr('data-id') != $(this).attr('data-id')) {

            // Then we check if you clicked on the same color to hide it
            if($(previousElement).css("background-color") == $(this).css("background-color")) {

                $(previousElement).fadeOut(350, function() {
                    $(this).remove();
                });
                $(this).fadeOut(350, function() {
                    $(this).remove();
                });
                 previousElement = null;
                 return false;
            }
            $(previousElement).removeClass("selected");
        }
    }
    $(this).addClass("selected");
    previousElement = this;
});


let timer = 60; // 1 minute timer
let min = 0;    // 1 minute
let sec = 0;    // 1 second timer
  // 1 hour timer

// Start count down
function startTimer() {

    min = parseInt(timer/60);
    sec = parseInt(timer%60);

    if (timer <= 20) {
        $("#time").removeClass("text-success");
        $("#time").addClass('text-danger');
    }
    if (timer <= 0) {
    
      if(divLength >= 150) {
        modalsResult("#one-star");
      }
      if (divLength >= 100 && divLength < 150){
        modalsResult("#two-stars");
      }
      if(divLength <= 100) {
        modalsResult("#three-stars");
      }
      return;
    }
    document.getElementById('time').innerHTML = '<b>Time left: </b>' + "0" + min.toString() + " : " + sec.toString();
    timer--;
    setTimeout(function() {
        startTimer();
    }, 1000);
}

function modalsResult(result) {
   $(result).modal({
        keyboard: false,
        backdrop : false,
   });
   $(result).modal('show');
   $(".btn-start-again").click(function() {
     location.reload();
   });
}

$('#memberModal').modal({
  keyboard: false,
  backdrop : false,
});
$('#memberModal').modal('show');
$(".btn-start").click(function() {
    startTimer();
});
const dom = {
    counter: document.querySelector('#counter'),
    minus: document.querySelector('#minus'),
    plus: document.querySelector('#plus'),
    heart: document.querySelector('#heart'),
    playPause: document.querySelector('#pause'),
    likesList: document.querySelector('.likes'),
    commentsList: document.querySelector('.comments'),
    commentInput: document.querySelector('#comment-input'),
    formSubmit: document.querySelector('#submit'),
    buttons: document.getElementsByTagName('button'),
    likeButton: document.querySelector('#heart')
}

let isCounterActive = false;
let lastLikedCounterValue = {};

function startCounter() {
    isCounterActive = true;
    intervalID = window.setInterval(function() {
        adjustCounter("increment");
    }, 1000);
    changeButtonText("pause");
}

function stopCounter() {
    window.clearInterval(intervalID);
    changeButtonText("resume");
}

function changeButtonText(buttonText) {
    const btn = dom.playPause;
    btn.textContent = buttonText;
}

function adjustCounter(counterAdjustment) {
    let counterValue = dom.counter.textContent;
    counterAdjustment == "increment" ? counterValue++ : counterValue--;
    dom.counter.textContent = counterValue;
}

function setControlsStatus(counterStatus) {
    let buttons = dom.buttons;
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].id != "pause") {
            buttons[i].disabled = counterStatus;
        }
    }
}

function renderLikeListItem(counterValue) {
  let listItem = document.createElement('li');
  let listItemText = document.createTextNode(`${counterValue} has been liked 1 time`);
  listItem.appendChild(listItemText);
  dom.likesList.appendChild(listItem);
}

function editLikeListItem(counterValue) {
  let item = dom.likesList.lastChild;
  lastLikedCounterValue[counterValue]++;
  let likeValue = lastLikedCounterValue[counterValue];
  item.textContent = `${counterValue} has been liked ${likeValue} times`;
}

function addLikeListItem(counterValue) {
  lastLikedCounterValue = {};
  renderLikeListItem(counterValue);
  lastLikedCounterValue[parseInt(counterValue)] = 1;
}

function addLike() {
    let counterValue = dom.counter.textContent;
    if (parseInt(counterValue) == Object.keys(lastLikedCounterValue)[0]) {
        editLikeListItem(counterValue);
    } else {
        addLikeListItem(counterValue);
    }
}

function postComment() {
  const userText = dom.commentInput.value;
  renderComment(userText);
  dom.commentInput.value = "";
}

function renderComment(userText) {
  let commentContainer = document.createElement('div');
  let commentContainerText = document.createTextNode(userText);
  commentContainer.appendChild(commentContainerText);
  dom.commentsList.appendChild(commentContainer);
}

// start counter on DOM load
document.addEventListener("DOMContentLoaded", function() {
    startCounter();
});

// manually increment counter
dom.plus.addEventListener('click', function(e) {
    adjustCounter("increment");
});

// manually decrement counter
dom.minus.addEventListener('click', function(e) {
    adjustCounter("decrement");
});

// pause / resume timer (same button)
dom.playPause.addEventListener('click', function(e) {
    isCounterActive = !isCounterActive;
    // if counter is active pass false to setControlsStatus setting buttons.disabled to false
    isCounterActive == true ? (setControlsStatus(false), startCounter()) : (setControlsStatus(true), stopCounter());
});

// like
dom.likeButton.addEventListener('click', function(e) {
    addLike();
});

dom.formSubmit.addEventListener('click', function(e) {
  e.preventDefault();
  postComment();
});

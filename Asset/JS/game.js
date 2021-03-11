
// Function for sad Interval
function getSadInterval() {
  return Date.now() + 1000;
}

// Get gone interval
function getGoneInterval () {
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

// Get hungry Interval
function getHungryInterval() {
  return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}

// Get King status at a 10% chance truthy
function getKingStatus() {
  return Math.random() > 0.9;
}

const moles = [
  {
    status: 'sad',
    king: false,
    next: getSadInterval(),
    node: document.getElementById('hole-0')
  },
  {
    status: 'sad',
    king: false,
    next: getSadInterval(),
    node: document.getElementById('hole-1')
  },
  {
    status: 'sad',
    king: false,
    next: getSadInterval(),
    node: document.getElementById('hole-2')
  },
  {
    status: 'sad',
    king: false,
    next: getSadInterval(),
    node: document.getElementById('hole-3')
  },
  {
    status: 'sad',
    king: false,
    next: getSadInterval(),
    node: document.getElementById('hole-4')
  },
  {
    status: 'sad',
    king: false,
    next: getSadInterval(),
    node: document.getElementById('hole-5')
  },
  {
    status: 'sad',
    king: false,
    next: getSadInterval(),
    node: document.getElementById('hole-6')
  },
  {
    status: 'sad',
    king: false,
    next: getSadInterval(),
    node: document.getElementById('hole-7')
  },
  {
    status: 'sad',
    king: false,
    next: getSadInterval(),
    node: document.getElementById('hole-8')
  },
  {
    status: 'sad',
    king: false,
    next: getSadInterval(),
    node: document.getElementById('hole-9')
  }
];

let runAgainAt = Date.now() + 100;
// Geting next status after a certain interval
function nextFrame() {
  const now = Date.now();
  if(runAgainAt <= now) {
    for(let i = 0; i < moles.length; i++) {
      if(moles[i].next <= now) {
        getNextStatus(moles[i]);
      }
    }
    runAgainAt = now + 100;
  }
  requestAnimationFrame(nextFrame);
}

nextFrame();

// Checking and updating moles object properties based on it status
function getNextStatus(mole) {
  switch (mole.status) {
    case 'sad':
    case 'fed':
      mole.next = getSadInterval();
      mole.status = 'leaving';
      if(mole.king) {
        mole.node.children[0].src = 'Asset/mole-game/king-mole-leaving.png';
      } else {
        mole.node.children[0].src = 'Asset/mole-game/mole-leaving.png';
      }
      break;
    case 'leaving':
      mole.next = getGoneInterval();
      mole.status = 'gone';
      mole.node.children[0].classList.add('gone');
      break;
    case 'gone':
      mole.next = getHungryInterval();
      mole.status = 'hungry';
      mole.king = getKingStatus();
      mole.node.children[0].classList.remove('gone');
      mole.node.children[0].classList.add('hungry'); 
      if(mole.king) {
        mole.node.children[0].src = 'Asset/mole-game/king-mole-hungry.png';
      } else {
        mole.node.children[0].src = 'Asset/mole-game/mole-hungry.png';
      }
      break;
    case 'hungry':
      mole.next = getSadInterval();
      mole.status = 'sad';
      mole.node.children[0].classList.remove('hungry');
      if(mole.king) {
        mole.node.children[0].src = 'Asset/mole-game/king-mole-sad.png';
      } else {
        mole.node.children[0].src = 'Asset/mole-game/mole-sad.png';
      }
      break;
  }
}

// Event listener for 
document.querySelector('.bg').addEventListener('click', getFedstate);

let scores = 0;

function getFedstate(e) {
  const mole = moles[parseInt(e.target.dataset.index)];
  
  if(e.target.tagName !== 'IMG' || !e.target.classList.contains('hungry')) {
    return;
  }

  mole.status = 'fed';
  mole.next = getSadInterval();
  
  if(mole.king) {
    mole.node.children[0].src = 'Asset/mole-game/king-mole-fed.png';
    //increment the value of score by 2 after feeding a mole
    scores += 2;
  } else {
    mole.node.children[0].src = 'Asset/mole-game/mole-fed.png';
    //increment the value of score by 1 after feeding a mole
    scores++;
  }

  if(scores >= 10) {
    win();
  }

  // Add to the worm-container width to display more of the worm
  const wormContainer = document.querySelector('.worm-container');
  wormContainer.style.width = `${10 * scores}%`;
}

function win() {
  document.querySelector('.bg').classList.add('hide');
  document.querySelector('.win').classList.remove('hide');
}
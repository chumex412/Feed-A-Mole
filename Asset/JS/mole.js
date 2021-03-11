function Mole() {
  this.moleStatus = [
    {
      status: 'sad',
      king: false,
      next: this.getSadInterval(),
      node: document.getElementById('hole-0')
    },
    {
      status: 'sad',
      king: false,
      next: this.getSadInterval(),
      node: document.getElementById('hole-1')
    },
    {
      status: 'sad',
      king: false,
      next: this.getSadInterval(),
      node: document.getElementById('hole-2')
    },
    {
      status: 'sad',
      king: false,
      next: this.getSadInterval(),
      node: document.getElementById('hole-3')
    },
    {
      status: 'sad',
      king: false,
      next: this.getSadInterval(),
      node: document.getElementById('hole-4')
    },
    {
      status: 'sad',
      king: false,
      next: this.getSadInterval(),
      node: document.getElementById('hole-5')
    },
    {
      status: 'sad',
      king: false,
      next: this.getSadInterval(),
      node: document.getElementById('hole-6')
    },
    {
      status: 'sad',
      king: false,
      next: this.getSadInterval(),
      node: document.getElementById('hole-7')
    },
    {
      status: 'sad',
      king: false,
      next: this.getSadInterval(),
      node: document.getElementById('hole-8')
    },
    {
      status: 'sad',
      king: false,
      next: this.getSadInterval(),
      node: document.getElementById('hole-9')
    }
  ];
  this.runAgainAt = Date.now() + 100;
}

Mole.prototype.getSadInterval = function() {
  return Date.now() + 1000;
};

Mole.prototype.getGoneInterval = function() {
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
};

Mole.prototype.getHungryInterval = function() {
  return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}

Mole.prototype.getKingStatus = function () {
  return Math.random() > 0.9;
}

Mole.prototype.nextFrame = function () {
  const {moleStatus} = this;
  const now = Date.now();
  if(this.runAgainAt <= now) {
    for(let i = 0; i < moleStatus.length; i++) {
      if(moleStatus[i].next <= now) {
        this.getNextStatus(moleStatus[i]);
      }
    }
    this.runAgainAt = now + 100;
  }
  requestAnimationFrame(this.nextFrame.bind(this));
}

Mole.prototype.getNextStatus = function(mole) {
  switch(mole.status) {
    case 'sad':
      case 'fed':
      mole.status = 'leaving';
      mole.next = this.getSadInterval();
      
      if(mole.king) {
        mole.node.children[0].src = 'Asset/mole-game/king-mole-leaving.png';
      } else {
        mole.node.children[0].src = 'Asset/mole-game/mole-leaving.png';
      }
      break;
    case 'leaving':
      mole.status = 'gone';
      mole.next = this.getGoneInterval();
      mole.node.children[0].classList.add('gone');
      break;
    case 'gone':
      mole.next = this.getHungryInterval();
      mole.status = 'hungry';
      mole.king = this.getKingStatus();
      mole.node.children[0].classList.remove('gone');
      mole.node.children[0].classList.add('hungry');
      
      if(mole.king) {
        mole.node.children[0].src = 'Asset/mole-game/king-mole-hungry.png';
      } else {
        mole.node.children[0].src = 'Asset/mole-game/mole-hungry.png';
      }
      break;
    case 'hungry':
      mole.status = 'sad';
      mole.next = this.getSadInterval();
      mole.node.children[0].classList.remove('hungry');
      
      if(mole.king) {
        mole.node.children[0].src = 'Asset/mole-game/king-mole-sad.png';
      } else {
        mole.node.children[0].src = 'Asset/mole-game/mole-sad.png';
      }
      break;
  }
}

Mole.prototype.win = function() {
  document.querySelector('.bg').classList.add('hide');
  document.querySelector('.win').classList.remove('hide');
}

let scores = 0;

Mole.prototype.getFedState = function (e) {
  const {moleStatus} = this;
  
  const mole = moleStatus[parseInt(e.target.dataset.index)];

  if(e.target.tagName !== 'IMG' || !e.target.classList.contains('hungry')) {
    return;
  }

  mole.status = 'fed';
  mole.next = this.getSadInterval();
  
  if(mole.king) {
    mole.node.children[0].src = 'Asset/mole-game/king-mole-fed.png';
    scores += 2;
  } else {
    mole.node.children[0].src = 'Asset/mole-game/mole-fed.png';
    scores++;
  }
  console.log(scores)

  if(scores >= 10) {
    this.win();
  }

  // Display worm meter
  document.querySelector('.worm-container').style.width = `${10 * scores}%`;
}

const mole = new Mole();

mole.nextFrame();

// Event Listener for controlling fed state
document.querySelector('.bg').addEventListener('click', mole.getFedState.bind(mole));
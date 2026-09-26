// Variable
let currentSlide = 0;
let selectedPkgName = '86 Diamonds';
let selectedPkgPrice = '$1.25';
let checkedPlayerName = '';

// Slider Functions
function goToSlide(index) {
  const track = document.getElementById('bannerTrack');
  const dots = document.querySelectorAll('.dot');
  if (!track || dots.length === 0) return;

  currentSlide = index;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

// Auto Slide every 4 seconds
setInterval(() => {
  const track = document.getElementById('bannerTrack');
  if (track) {
    currentSlide = (currentSlide + 1) % 3;
    goToSlide(currentSlide);
  }
}, 4000);

// Search Function
function filterGames() {
  const input = document.getElementById('searchInput');
  if (!input) return;
  const filter = input.value.toLowerCase();
  const cards = document.querySelectorAll('.game-card');

  cards.forEach(card => {
    const name = card.getAttribute('data-name');
    if (name && name.toLowerCase().includes(filter)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

// Check Player ID Function
function checkPlayerName() {
  const userId = document.getElementById('userId').value;
  const zoneId = document.getElementById('zoneId').value;
  const displayBox = document.getElementById('player-name-display');

  if (!userId || !zoneId) {
    showToast('សូមបញ្ចូល User ID និង Zone ID ឱ្យបានត្រឹមត្រូវ!');
    return;
  }

  // Demo Player Name Result
  checkedPlayerName = 'T9_Gamer_' + userId.slice(-4);
  displayBox.innerText = 'ឈ្មោះអ្នកលេង: ' + checkedPlayerName;
  displayBox.style.display = 'block';
  showToast('ពិនិត្យឈ្មោះបានជោគជ័យ!');
}

// Select Diamond Package
function selectPackage(element, pkgName, price) {
  document.querySelectorAll('.package-card').forEach(card => card.classList.remove('selected'));
  element.classList.add('selected');

  selectedPkgName = pkgName;
  selectedPkgPrice = price;

  document.getElementById('selected-package-text').innerText = 'កញ្ចប់: ' + pkgName;
  document.getElementById('selected-price-text').innerText = price;
}

// Process Payment & Open Modal
function processPayment() {
  const userId = document.getElementById('userId').value;
  const zoneId = document.getElementById('zoneId').value;
  const terms = document.getElementById('terms').checked;

  if (!userId || !zoneId) {
    showToast('សូមបញ្ចូល User ID និង Zone ID ជាមុនសិន!');
    return;
  }

  if (!terms) {
    showToast('សូមគ្រីសយល់ព្រមលើលក្ខខណ្ឌ!');
    return;
  }

  document.getElementById('modal-player-name').innerText = checkedPlayerName || (userId + ' (' + zoneId + ')');
  document.getElementById('modal-package-name').innerText = selectedPkgName;
  document.getElementById('modal-price').innerText = selectedPkgPrice;

  document.getElementById('qr-modal').style.display = 'flex';
}

function closeQRModal() {
  document.getElementById('qr-modal').style.display = 'none';
}

// Toast Alert Function
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerText = message;
  toast.className = 'toast show';
  setTimeout(() => {
    toast.className = toast.className.replace('show', '');
  }, 3000);
}
// Slider state variables
let currentSlide = 0;
const totalSlides = 3;

// 1. Auto Slide Banner Animation
function updateSlider() {
  const track = document.getElementById('bannerTrack');
  const dots = document.querySelectorAll('.slider-dots .dot');

  if (track) {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

setInterval(() => {
  const track = document.getElementById('bannerTrack');
  if (track) {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }
}, 3500);

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

// 2. Search Game Filter
function filterGames() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  const input = searchInput.value.toLowerCase();
  const cards = document.getElementsByClassName('game-card');

  for (let i = 0; i < cards.length; i++) {
    const gameName = cards[i].getAttribute('data-name') || '';
    if (gameName.toLowerCase().includes(input)) {
      cards[i].style.display = "flex";
    } else {
      cards[i].style.display = "none";
    }
  }
}

// 3. Toast Notification
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.innerText = message;
  toast.className = "toast show";
  
  setTimeout(() => { 
    toast.className = toast.className.replace("show", ""); 
  }, 2800);
}

// 4. Select Package (mlbb page)
let selectedPackageName = '86 Diamonds';
let selectedPackagePrice = '$1.25';
let checkedPlayerName = '';

function selectPackage(element, name, price) {
  document.querySelectorAll('.package-card').forEach(card => card.classList.remove('selected'));
  element.classList.add('selected');
  
  selectedPackageName = name;
  selectedPackagePrice = price;
  
  const pkgText = document.getElementById('selected-package-text');
  const priceText = document.getElementById('selected-price-text');

  if (pkgText) pkgText.innerText = 'កញ្ចប់: ' + name;
  if (priceText) priceText.innerText = price;
}

// 5. Check Player Name
function checkPlayerName() {
  const userIdElem = document.getElementById('userId');
  const zoneIdElem = document.getElementById('zoneId');
  const displayBox = document.getElementById('player-name-display');

  if (!userIdElem || !zoneIdElem) return;

  const userId = userIdElem.value.trim();
  const zoneId = zoneIdElem.value.trim();

  if (!userId || !zoneId) {
    alert('សូមបញ្ជូល User ID និង Zone ID ឱ្យបានត្រឹមត្រូវ!');
    return;
  }

  displayBox.style.display = 'block';
  displayBox.style.color = '#00d2ff';
  displayBox.style.borderColor = '#00d2ff';
  displayBox.innerText = '⏳ កំពុងពិនិត្យឈ្មោះ...';

  setTimeout(() => {
    checkedPlayerName = 'PRO_PLAYER_' + userId.slice(-4);
    displayBox.style.color = '#10b981';
    displayBox.style.borderColor = '#10b981';
    displayBox.innerText = '✅ ឈ្មោះគណនី: ' + checkedPlayerName;
  }, 1000);
}

// 6. Process Payment & Generate QR
function processPayment() {
  const userIdElem = document.getElementById('userId');
  const zoneIdElem = document.getElementById('zoneId');
  const termsElem = document.getElementById('terms');

  if (!userIdElem || !zoneIdElem) return;

  const userId = userIdElem.value.trim();
  const zoneId = zoneIdElem.value.trim();
  const termsChecked = termsElem ? termsElem.checked : false;

  if (!userId || !zoneId) {
    alert('សូមបំពេញ User ID និង Zone ID ជាមុនសិន!');
    return;
  }

  if (!termsChecked) {
    alert('សូមចុចយល់ព្រមលើលក្ខខណ្ឌមុននឹងបន្ត!');
    return;
  }

  if (!checkedPlayerName) {
    checkedPlayerName = 'Player_' + userId.slice(-4);
  }

  const qrData = encodeURIComponent(`T9SHOP|${userId}|${selectedPackageName}|${selectedPackagePrice}`);
  document.getElementById('qr-image').src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`;

  document.getElementById('modal-player-name').innerText = checkedPlayerName;
  document.getElementById('modal-package-name').innerText = selectedPackageName;
  document.getElementById('modal-price').innerText = selectedPackagePrice;

  document.getElementById('qr-modal').style.display = 'flex';
}

function closeQRModal() {
  const modal = document.getElementById('qr-modal');
  if (modal) modal.style.display = 'none';
}
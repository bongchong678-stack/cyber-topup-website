// Variable Global
let selectedPkgName = '100 Diamonds';
let selectedPkgPrice = '$1.00';
let checkedPlayerName = '';

// Check Player ID Function (สำหรับ Free Fire ប្រើតែ Player ID)
function checkPlayerName() {
  const userId = document.getElementById('userId').value.trim();
  const displayBox = document.getElementById('player-name-display');

  if (!userId) {
    showToast('សូមបញ្ចូល Player ID ឱ្យបានត្រឹមត្រូវ!');
    return;
  }

  // Demo Player Name Result สำหรับ Free Fire
  checkedPlayerName = 'FF_Pro_' + userId.slice(-4);
  displayBox.innerText = 'ឈ្មោះអ្នកលេង: ' + checkedPlayerName;
  displayBox.style.display = 'block';
  showToast('ពិនិត្យឈ្មោះได้ជោគជ័យ!');
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
  const userId = document.getElementById('userId').value.trim();
  const terms = document.getElementById('terms').checked;

  if (!userId) {
    showToast('សូមបញ្ចូល Player ID ជាមុនសិន!');
    return;
  }

  if (!terms) {
    showToast('សូមគ្រីសយល់ព្រមលើលក្ខខណ្ឌ!');
    return;
  }

  // បើមិនទាន់បានចុចពិនិត្យឈ្មោះ វានឹងបង្ហាញ Player ID ជំនួស
  const displayName = checkedPlayerName ? checkedPlayerName : userId;

  document.getElementById('modal-player-name').innerText = displayName;
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
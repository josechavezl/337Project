



// by: dipson kc
// Modal functions
// modified to make it useful

function showModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "block";
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}

function closeModalOutside(event, modalId) {
  var modal = document.getElementById(modalId);
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Show Help modal
document.getElementById("myBtn").addEventListener("click", () => {
  showModal("helpModal");
});

// Close Help modal
document.getElementById("helpModal").onclick = (event) => {
  closeModalOutside(event, "helpModal");
};

// Show Account modal
document.getElementById("account").addEventListener("click", () => {
  showModal("accountModal");
});

// Close Account modal
document.getElementById("accountModal").onclick = (event) => {
  closeModalOutside(event, "accountModal");
};

// Show New FOLDER modal
document.getElementById("newFolderBtn").addEventListener("click", () => {
  showModal("newFolderModal");
});

// Close New FOLDER modal
document.getElementById("accountModal").onclick = (event) => {
  closeModalOutside(event, "accountModal");
};






// New Folder Functionality
document.addEventListener('DOMContentLoaded', () => {
  const newFolderModal = document.getElementById('newFolderModal');
  const createFolderBtn = document.getElementById('createFolderBtn');
  const newFolderNameInput = document.getElementById('newFolderName');
  const foldersContainer = document.getElementById('foldersContainer');

  // Existing folders that can be loaded from backend
  // commented out as i'm not sure if we need this or not
  const ExistingFolders = [
      { name: 'Example Folders', files: 1 },
      { name: 'To Remove These or rename', files: 8 },
      { name: 'JS file line 38-41, 100', files: 2 }
  ];

  // Load Existing folders
  function loadExistingFolders() {
      ExistingFolders.forEach(folder => createFolderElement(folder));
  }

  // Create folder element
  function createFolderElement(folder) {
      const folderDiv = document.createElement('div');
      folderDiv.classList.add('folder');
      folderDiv.innerHTML = `
          <i class="fa-solid fa-folder-closed" style="color: #38b6ff"></i>
          <span>${folder.name}</span>
          <small>${folder.files} files</small>
      `;

      // Add to folders container
      foldersContainer.appendChild(folderDiv);
  }

  // Close New Folder Modal
  function closeNewFolderModal() {
      newFolderModal.style.display = 'none';
      newFolderNameInput.value = ''; 
  }

  // Create Folder
  createFolderBtn.addEventListener('click', () => {
      const folderName = newFolderNameInput.value.trim();
      
      if (folderName) {
          // Create folder object
          const newFolder = { 
              name: folderName, 
              files: 0 
          };

          // Create folder element
          createFolderElement(newFolder);

          // Close modal and clear input
          closeNewFolderModal();
      } else {
          alert('Please enter a folder name');
      }
  });

  // Allow closing new folder modal with close button
  const closeFolderModalBtn = newFolderModal.querySelector('.close-btn');
  closeFolderModalBtn.addEventListener('click', closeNewFolderModal);

  // Load exsiting folders on page load
  loadExistingFolders();
});









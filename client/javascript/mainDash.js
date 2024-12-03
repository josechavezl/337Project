



// ************************
// Open and Close Modals Functions
// ************************


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










// ************************
// New Folder Functionality
// ************************


document.addEventListener("DOMContentLoaded", () => {
  const newFolderModal = document.getElementById("newFolderModal");
  const createFolderBtn = document.getElementById("createFolderBtn");
  const newFolderNameInput = document.getElementById("newFolderName");
  const foldersContainer = document.getElementById("foldersContainer");

  const ExistingFolders = [
    { name: "Example Folders", files: 3 },
    { name: "To Remove These or rename", files: 2 },
    { name: "JS file line 38-41, 100", files: 2 }
  ];

  // Load Existing folders
  function loadExistingFolders() {
    ExistingFolders.forEach(folder => createFolderElement(folder));
  }

  // Create folder element
  function createFolderElement(folder) {
    const folderDiv = document.createElement("div");
    folderDiv.classList.add("folder");
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
    newFolderModal.style.display = "none";
    newFolderNameInput.value = "";
  }

  // Create Folder
  createFolderBtn.addEventListener("click", () => {
    const folderName = newFolderNameInput.value.trim();

    if (folderName) {
      const newFolder = { name: folderName, files: 0 };
      createFolderElement(newFolder);
      closeNewFolderModal();
    } else {
      alert("Please enter a folder name");
    }
  });

  // Allow closing new folder modal with close button
  const closeFolderModalBtn = newFolderModal.querySelector(".close-btn");
  closeFolderModalBtn.addEventListener("click", closeNewFolderModal);

  // Load existing folders on page load
  loadExistingFolders();










// ************************
// Folder Navigation Logic
// ************************


  const folderContentPage = document.getElementById("folderContentPage");
  const dashboardPage = document.getElementById("outerLayerFolder");
  const backToDashboard = document.getElementById("backToDashboard");
  const currentFolderTitle = document.getElementById("currentFolderTitle");
  const folderFiles = document.getElementById("folderFiles");

  // new folder button
  const newFolderButton = document.getElementById("newFolderBtn");
  // new file button 
  const newFileButton = document.getElementById("newFileBtn");

  const folderSearchButton = document.getElementById("search-container");
  const fileSearchButton = document.getElementById("search-container-files");
  
  const folderData = {
    "Example Folders": ["File1.jsx", "File2.js", "File3.html"],
    "To Remove These or rename": ["mainDash.html", "mainDash.js"],
    "JS file line 38-41, 100": ["CodeSnippet.js", "page.css"]
  };

 
const recentActivitySection = document.getElementById("outerLayerActivity");

// Handle folder click
foldersContainer.addEventListener("click", (e) => {
  if (e.target.closest(".folder")) {
    // Hide Recent Activity
    recentActivitySection.style.display = "none";

    // Get the folder name
    const folderName = e.target.closest(".folder").querySelector("span").innerText;

    // Set the folder title and number of files
    const files = folderData[folderName] || [];
    currentFolderTitle.innerText = `${folderName} - ${files.length} files`; 

    // Populate the files list
    folderFiles.innerHTML = files.map(file => `<li>${file}</li>`).join("");

    // Hide Dashboard and show Folder Content Page
    dashboardPage.style.display = "none";
    
    // Hide New folder button and show upload file button
    newFolderButton.style.display = "none";
    newFileButton.style.display = "block";

    folderContentPage.style.display = "block";
    folderContentPage.classList.add("active");

    folderSearchButton.style.display = "none";

    fileSearchButton.style.display = "flex";

  }
});


// Back to Dashboard
backToDashboard.addEventListener("click", () => {
  // Show Recent Activity
  recentActivitySection.style.display = "block";

  folderContentPage.style.display = "none";
  folderContentPage.classList.remove("active");
  dashboardPage.style.display = "block";
  newFileButton.style.display = "none";
  newFolderButton.style.display = "block";

  folderSearchButton.style.display = "flex";
  fileSearchButton.style.display = "none";

});

});










// ************************
// Search Folder Section 
// ************************


const searchInput = document.querySelector(".search-input");
const foldersContainer = document.getElementById("foldersContainer");

// Add event listener for the search input
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const folderElements = foldersContainer.querySelectorAll(".folder"); // Dynamically fetch all folders

  folderElements.forEach(folder => {
    const folderName = folder.querySelector("span").innerText.toLowerCase();

    if (folderName.includes(query)) {
      folder.style.display = "flex"; // Show matching folders
    } else {
      folder.style.display = "none"; // Hide non-matching folders
    }
  });  


});

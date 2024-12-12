// ************************
// Open and Close Modals Functions
// ************************




// Show previewFilemodal modal
// add the id of the file 
// document.getElementById("").addEventListener("click", () => {
//   showModal("previewFilemodal");
// });

// // Close previewFilemodal modal
// document.getElementById("previewFilemodal").onclick = (event) => {
//   closeModalOutside(event, "previewFilemodal");
// };





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
  console.log("hello at account event listner");
  showModal("accountModal");
  showUser();
});

// Close Account modal
document.getElementById("accountModal").onclick = (event) => {
  closeModalOutside(event, "accountModal");
};

// Show New FOLDER modal
document.getElementById("newFolderBtn").addEventListener("click", () => {
  showModal("newFolderModal");
});


// Upload New File modal
document.getElementById("newFileBtn").addEventListener("click", () => {
  showModal("uploadFileModal");
});







// Show Help modal
document.getElementById("addCollaborators").addEventListener("click", () => {
  showModal("inviteModal");
});





async function showUser() {
  // try {
    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get("firstName");
    const lastName = urlParams.get("lastName");
    const email = urlParams.get("email"); 
    console.log(email)
    
    document.getElementById('userFullName').textContent = `${firstName} ${lastName}`;
    document.getElementById('userEmail').textContent = `${email}`;

// Extract the user information from the URL parameters
  // const firstName = urlParams.get("firstName");
  // const lastName = urlParams.get("lastName");
  // const email = urlParams.get("email"); 

  //   // const email = localStorage.getItem('email');
  //   // const user = localStorage.getItem('fullName');
    
  //   if (!user) {
  //     console.error('No user found');
  //     return;
  //   }
  //   if (!email) {
  //     console.error('No email found');
  //     return;
  //   }

  //   if (response.ok) {
  //     console.log(email)
  //     document.getElementById('userFullName').textContent = `${firstName} ${lastName}`;
  //     document.getElementById('userEmail').textContent = `${email}`;
  //   }

  // }
  // catch (error) {

  // }
}






// ************************
// New Folder Functionality
// ************************


document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const emailP = urlParams.get("email"); 

  const newFolderModal = document.getElementById("newFolderModal");
  const createFolderBtn = document.getElementById("createFolderBtn");
  const newFolderNameInput = document.getElementById("newFolderName");
  const foldersContainer = document.getElementById("foldersContainer");

  // Load Existing folders
  async function loadExistingFolders() {
    try {
      const response = await fetch(`/get-folders?email=${encodeURIComponent(emailP)}`);
      const ExistingFolders = await response.json();
      ExistingFolders.forEach(folder => createFolderElement(folder));
    }
    catch(error) {
      console.log("error loading folders", error);
    }
  }

  // Create folder element
  function createFolderElement(folder) {
    const folderDiv = document.createElement("div");
    folderDiv.classList.add("folder");
    folderDiv.innerHTML = `
          <i class="fa-solid fa-folder-closed" style="color: #38b6ff"></i>
          <span>${folder.name}</span>
          <small>${folder.files.length} files</small>
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
  createFolderBtn.addEventListener("click", async () => {
    const folderName = newFolderNameInput.value.trim();

    if (folderName) {
      const folderData = { name: folderName, email: emailP, files:[], shared: []};
      try {
        const response = await fetch("/create-folder", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(folderData)
        });
        
        if(response.ok) {
          const newFolder = await response.json();
          createFolderElement(newFolder);
        }
        else{
          const errorFolder = await response.json();
          alert("ERROR creating folder", errorFolder);
        }
      closeNewFolderModal();
    }
    catch(error) {
      alert("Catch error", error);
    }
  }
    else {
      alert("Please enter a folder name");
    }
});

  // Allow closing new folder modal with close button
  const closeFolderModalBtn = newFolderModal.querySelector(".close-btn");
  closeFolderModalBtn.addEventListener("click", closeNewFolderModal);

  // Load existing folders on page load
  loadExistingFolders();






  





// ******************************
// UPLOAD FILE FUNCTIONALITY ****
// ******************************
document.getElementById("uploadFileBtn").addEventListener("click", async () => {
  const fileInput = document.getElementById("fileInput");
  const folderFiles = document.getElementById("folderFiles");

  if (!fileInput.files.length) {
      alert("Please select a file to upload.");
      return;
  }

  const file = fileInput.files[0]; // Get the selected file

  try {
      // Send the file as raw content
      const response = await fetch("/upload", {
          method: "post",
          headers: {
              "Content-Type": file.type, // Set the file's MIME type
              "X-File-Name": encodeURIComponent(file.name), // Optional: Pass file name in header
          },
          body: file, // Send the raw file content
      });

      if (response.ok) {
          // Append file name to the folderFiles section
          const fileName = file.name; // Get the file name
          const fileDiv = document.createElement("div");
          fileDiv.textContent = fileName;
          fileDiv.className = "file-item";
          folderFiles.appendChild(fileDiv);

           // Add click event listener to show the modal
      fileDiv.addEventListener("click", () => {
        const previewModal = document.getElementById("previewFilemodal");
        if (previewModal) {
          previewModal.style.display = "block";
        }
      });

          console.log("File uploaded successfully!");
      } else {
          alert("File upload failed.");
      }
  } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
  }
});


// Function to close the modal (optional, if not already implemented)
document.getElementById("previewFilemodal").addEventListener("click", (event) => {
  if (event.target.id === "previewFilemodal") {
    event.target.style.display = "none"; // Close the modal when clicking outside
  }
});
















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


  const addCollaborators = document.getElementById("addCollaborators");


  const folderSearchButton = document.getElementById("search-container");
  const fileSearchButton = document.getElementById("search-container-files");
  
  const folderData = {
    "Example Folders": ["File1.jsx", "File2.js", "File3.html"],
    "To Remove These or rename": ["mainDash.html", "mainDash.js"],
    "JS file line 38-41, 100": ["CodeSnippet.js", "page.css"]
  };

 

// Handle folder click
foldersContainer.addEventListener("click", (e) => {
    const folderElement = e.target.closest(".folder");

  if (folderElement) {
    
    // Hide Recent Activity

    // Get the folder name
    const folderName = e.target.closest(".folder").querySelector("span").innerText;
    currentFolderId = folderName; // Update the currentFolderId with the selected folder name or ID

    // Set the folder title and number of files
    const files = folderData[folderName] || [];

    currentFolderTitle.innerHTML = `
    <div>${folderName}</div>
    <small id="filesCountFolder">${files.length} files</small>`; 

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



    addCollaborators.style.display = "block";

  }
});


// Back to Dashboard
backToDashboard.addEventListener("click", () => {
  // Show Recent Activity

  folderContentPage.style.display = "none";
  folderContentPage.classList.remove("active");
  dashboardPage.style.display = "block";
  newFileButton.style.display = "none";
  newFolderButton.style.display = "block";

  folderSearchButton.style.display = "flex";
  fileSearchButton.style.display = "none";


  addCollaborators.style.display = "none";

});

});










// ************************
// Search Folder Section 
// ************************


const searchInput = document.querySelector(".search-input");
const foldersContainers = document.getElementById("foldersContainer");

// Add event listener for the search input
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  const folderElements = foldersContainers.querySelectorAll(".folder"); // Dynamically fetch all folders

  folderElements.forEach(folder => {
    const folderName = folder.querySelector("span").innerText.toLowerCase();

    if (folderName.includes(query)) {
      folder.style.display = "flex"; // Show matching folders
    } else {
      folder.style.display = "none"; // Hide non-matching folders
    }
  });  


});
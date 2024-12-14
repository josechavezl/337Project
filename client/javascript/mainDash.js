/* ViewCorp
- Ben Patrick Bruso
- Jose Luis Chavez
- Dipson K C 
- Jose Santiago Campa Morales
- CSC337: Web Programming
- Final Project
- mainDash.js: This is the script for the main dashboard.
- It has many event listeners and async functions to 
- fetch information from the backend. */


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
  const urlParams = new URLSearchParams(window.location.search);
  const firstName = urlParams.get("firstName");
  const lastName = urlParams.get("lastName");
  const email = urlParams.get("email");
  console.log(email)

  document.getElementById('userFullName').textContent = `${firstName} ${lastName}`;
  document.getElementById('userEmail').textContent = `${email}`;

}


// ************************
// Comment Section Functionality
// ************************

function addComment() {
  const authorInput = document.getElementById('comment-author');
  const commentInput = document.getElementById('comment-text');
  const ratingInput = document.getElementById('comment-rating');
  const commentsContainer = document.getElementById('comments-container');

  const author = authorInput.value.trim();
  const commentText = commentInput.value.trim();
  const rating = parseInt(ratingInput.value);

  // Checks for valid author, comment text, and rating is between 1-5
  if (author && commentText && !isNaN(rating) && rating >= 1 && rating <= 5) {
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.innerHTML = `
      <div class="comment-author">${author} <span id="commentedColor">commented:</span></div>
      <div class="comment-text">${commentText}</div>
      <div class="comment-rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
    `;
    commentsContainer.appendChild(newComment);

    // Clear input fields
    authorInput.value = '';
    commentInput.value = '';
    ratingInput.value = '';
  } else {
    alert('Please fill in all fields with valid data.');
  }
}

// ************************
// New Folder Functionality
// ************************


document.addEventListener("DOMContentLoaded", () => {
  const folderFiles = document.getElementById('folderFiles');
  const urlParams = new URLSearchParams(window.location.search);
  const emailP = urlParams.get("email");

  // Creates html elements for the new folder
  const newFolderModal = document.getElementById("newFolderModal");
  const createFolderBtn = document.getElementById("createFolderBtn");
  const newFolderNameInput = document.getElementById("newFolderName");
  const foldersContainer = document.getElementById("foldersContainer");

  const uploadFileBtn = document.getElementById("uploadFileBtn")
  const file = document.getElementById("fileInput")

  // Load Existing folders
  async function loadExistingFolders() {
    try {
      folderFiles.innerHTML = ""; // Clear previous file elements
      const response = await fetch(`/get-folders?email=${encodeURIComponent(emailP)}`);
      const ExistingFolders = await response.json();
      ExistingFolders.forEach(folder => createFolderElement(folder));
    }
    catch (error) {
      console.log("error loading folders", error);
    }
  }

  // Creates folder element and addes to the folder container
  function createFolderElement(folder) {
    if ([...foldersContainer.children].some(child => child.textContent.trim() === folder.name)) {
      return; // Skip duplicate folder
    }
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
      const folderData = { name: folderName, email: emailP, files: [], shared: [] };
      try {
        const response = await fetch("/create-folder", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(folderData)
        });

        if (response.ok) {
          const newFolder = await response.json();
          createFolderElement(newFolder);
        }
        else {
          const errorFolder = await response.json();
          alert("ERROR creating folder", errorFolder);
        }
        closeNewFolderModal();
      }
      catch (error) {
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

  // UPLOADING
  document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    const formData = new FormData();
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    // Get query params for email, first name, last name
    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get("firstName");
    const lastName = urlParams.get("lastName");
    const emailurl = urlParams.get("email");

    // Append file and metadata to the FormData object
    formData.append('file', file);
    formData.append('email', emailurl);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);

    const folderName = document.getElementById("folder").textContent
    formData.append("folderName", folderName)
    try {
      // Send the form data, file and metadata, to the server
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // / Adds the uploaded file to the folder and creates a html element for it
        const folderFilesDiv = document.getElementById("folderFiles");
        const fileDiv = document.createElement("div");
        fileDiv.classList.add("file");
        fileDiv.innerHTML = `
            <i class="fa-solid fa-file" style="color: #3ba3c3"></i>
            <span>${file.name}</span>
        `;
        // Add to folders container
        folderFiles.appendChild(fileDiv);
        console.log('File uploaded:', data);
      } else {
        const error = await response.json();
        alert('Error uploading file: ' + error.message);
      }
    } catch (error) {
      console.error('316 Error:', error);
      alert('Error uploading file');
    }
  });


});

 // Add more extensions if needed
const allowedExtensions = ['.js', '.py', '.html', '.css', '.json', '.java', '.c', '.cpp', '.ts'];

const filePreviewHandlers = {
  'text/plain': async (file) => {
    const text = await file.text();
    return `<pre class="code-preview">${text}</pre>`;
  },
  'text/html': async (file) => {
    const text = await file.text();
    return `<iframe srcdoc="${text}" class="w-full h-64 border"></iframe>`;
  },
  'application/json': async (file) => {
    const text = await file.text();
    return `<pre class="code-preview">${JSON.stringify(JSON.parse(text), null, 2)}</pre>`;
  },
  'application/javascript': async (file) => {
    const text = await file.text();
    return `<pre class="code-preview">${text}</pre>`;
  },
  'text/css': async (file) => {
    const text = await file.text();
    return `<pre class="code-preview">${text}</pre>`;
  }
};

document.getElementById('fileInput').addEventListener('change', async (event) => {
  const filesContainer = document.getElementById('filesContainer');
  const filePreview = document.getElementById('filePreview');
  const files = event.target.files;

  const existingPreviews = JSON.parse(localStorage.getItem('filePreviews')) || [];
  const previews = [...existingPreviews];

  // Go through selected files of the wanted folder
  for (let file of files) {
    const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    // Check for allowed extensions
    if (!allowedExtensions.includes(fileExtension)) {
      alert(`File "${file.name}" is not allowed.`);
      continue;
    }

    // Determine preview handler
    let previewHandler = filePreviewHandlers['text/plain'];
    if (filePreviewHandlers[file.type]) {
      previewHandler = filePreviewHandlers[file.type];
    }

    // Generate preview content
    const previewContent = await previewHandler(file);

    // Check if preview already exists
    if (previews.some(preview => preview.name === file.name)) {
      alert(`Preview for "${file.name}" already exists.`);
      continue;
    }

    // Append preview to the modal
    const previewCard = document.createElement('div');
    previewCard.className = 'file-preview-card mb-2 p-2 border rounded';

    const fileName = document.createElement('div');
    fileName.textContent = file.name;
    fileName.className = 'font-bold mb-2';

    const modalPreviewContent = document.createElement('div');
    modalPreviewContent.innerHTML = previewContent;
    modalPreviewContent.className = 'file-preview';

    previewCard.appendChild(fileName);
    previewCard.appendChild(modalPreviewContent);
    filesContainer.appendChild(previewCard);

    // Append preview to the filePreview section
    const filePreviewContent = document.createElement('div');
    filePreviewContent.innerHTML = `<h4>${file.name}</h4>` + previewContent;
    filePreviewContent.className = 'file-preview';
    filePreview.appendChild(filePreviewContent);

    // Save the preview
    previews.push({ name: file.name, content: previewContent });
  }

  // Save all previews to localStorage
  localStorage.setItem('filePreviews', JSON.stringify(previews));
});


document.getElementById('folderFiles').addEventListener('click', (event) => {
  const clickedFileElement = event.target.closest('.file');
  if (!clickedFileElement) return;

  const clickedFileName = clickedFileElement.querySelector('span').textContent; // Get file name
  const filePreview = document.getElementById('filePreview');
  const previews = JSON.parse(localStorage.getItem('filePreviews')) || []; // Get saved previews

  // Find the clicked file's preview content
  const clickedFilePreview = previews.find(preview => preview.name === clickedFileName);

  if (clickedFilePreview) {
    // Clear previous preview
    filePreview.innerHTML = '';

    // Add the clicked file's preview
    const filePreviewContent = document.createElement('div');
    filePreviewContent.innerHTML = `<h4>${clickedFileName}</h4>` + clickedFilePreview.content;
    filePreviewContent.className = 'file-preview';
    filePreview.appendChild(filePreviewContent);
  } else {
    alert(`Preview for "${clickedFileName}" not found.`);
    previewContainer.innerHTML = ''; // Clear the preview area

  }
});

// Creates the preview for the file
document.addEventListener('DOMContentLoaded', () => {
  const filePreview = document.getElementById('filePreview');
  const previews = JSON.parse(localStorage.getItem('filePreviews')) || [];

  filePreview.innerHTML = ''; // Clear existing content

  previews.forEach(preview => {
    const filePreviewContent = document.createElement('div');
    filePreviewContent.innerHTML = `<h4>${preview.name}</h4>` + preview.content;
    filePreviewContent.className = 'file-preview';
    filePreview.appendChild(filePreviewContent);
  });
});


// Placeholder upload function (you'll replace with actual upload logic)
document.getElementById('uploadFileBtn').addEventListener('click', () => {
  const files = document.getElementById('fileInput').files;
  if (files.length === 0) {
    alert('Please select files to upload');
    return;
  }

  // TODO: Implement actual file upload logic
  console.log('Files ready to upload:', files);
  //alert('File upload functionality not yet implemented');
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

let currentFolderId = "";
// Handle folder click, displays files as well
foldersContainer.addEventListener("click", (e) => {
  const folderElement = e.target.closest(".folder");

  if (folderElement) {
    const folderName = e.target.closest(".folder").querySelector("span").innerText;
    document.getElementById("folder").textContent = folderName;
    async function loadExistingFolders() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const emailP = urlParams.get("email");
        console.log(emailP);
        //CANNOT MAKE IT SHORTER DUE TO ERROR
        const response = await fetch(`/get-files?email=${encodeURIComponent(emailP)}&folderName=${encodeURIComponent(folderName)}`);
        const ExistingFiles = await response.json();
        ExistingFiles.forEach(file => createFileElement(file));
      }
      catch (error) {
        console.log("error loading folders", error);
      }
    }
    function createFileElement(file) {
      const fileDiv = document.createElement("div");
      fileDiv.classList.add("file");

      fileDiv.innerHTML = `
            <i class="fa-solid fa-file" style="color: #3ba3c3"></i>
            <span>${file.name}</span>
        `;
      // Add to folders container
      folderFiles.appendChild(fileDiv);
    }
    loadExistingFolders();
    // Get the folder name

    currentFolderId = folderName;

    // Set the folder title           
    currentFolderTitle.innerHTML = `
    <div>${folderName}</div>`;
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
  // Clear files when returning to the dashboard
  folderFiles.innerHTML = ""; 
  folderContentPage.style.display = "none";
  folderContentPage.classList.remove("active");
  dashboardPage.style.display = "block";
  newFileButton.style.display = "none";
  newFolderButton.style.display = "block";
  folderSearchButton.style.display = "flex";
  fileSearchButton.style.display = "none";
  addCollaborators.style.display = "none";

});

// invite

const inviteCollaboratorbtn = document.getElementById("inviteCollaborator-btn");
const inviteInputBox = document.getElementById("invite-input-box");

inviteCollaboratorbtn.addEventListener("click", async () => {
  if (!inviteInputBox) {
    console.error("Invite input box not found. ");
    return;
  }

  const inviteEmail = inviteInputBox.value.trim();

  if (inviteEmail) {
    const urlParams = new URLSearchParams(window.location.search);
    const emailP = urlParams.get("email");
    const inviteData = { sender: emailP, recipient: inviteEmail, folder: currentFolderId };
    console.log("Invite Data:", inviteData);

    try {
      const response = await fetch("/invite", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inviteData)
      });

      if (response.ok) {
        const newInvite = await response.json();
        console.log("invitiation valid", newInvite);
        alert("Invitation sent!");
      }
      else {
        const errorInvite = await response.json();
        alert("ERROR inviting user", errorInvite);
      }
    }
    catch (error) {
      alert("Catch error", error);
    }
  } else {
    alert("Please enter an email.");
  }
});

document.getElementById("folderFiles").addEventListener("click", () => {
  showModal("previewFilemodal");
});

// Close previewFilemodal modal
document.getElementById("previewFilemodal").onclick = (event) => {
  closeModalOutside(event, "previewFilemodal");
};



// ************************
// Search Folder Section 
// ************************


const searchInput = document.querySelector(".search-input");
const foldersContainers = document.getElementById("foldersContainer");

// Add event listener for the search input
searchInput.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();
  // Dynamically fetch all folders
  const folderElements = foldersContainers.querySelectorAll(".folder");

  folderElements.forEach(folder => {
    const folderName = folder.querySelector("span").innerText.toLowerCase();

    if (folderName.includes(query)) {
      folder.style.display = "flex"; // Show matching folders
    } else {
      folder.style.display = "none"; // Hide non-matching folders
    }
  });


});
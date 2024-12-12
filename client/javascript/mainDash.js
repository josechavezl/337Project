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
const allowedExtensions = [
  '.js', '.py', '.html', '.css', '.json', '.java', 
  '.c', '.cpp', '.ts', '.jsx', '.tsx', '.php', 
  '.rb', '.go', '.sh', '.swift', '.kt', '.rs'
]; // Add more extensions if needed

const filePreviewHandlers = {
    'text/plain': async (file) => {
        const text = await file.text();
        return `<pre class="code-preview">${text}</pre>`;
    },
    'text/html': async (file) => {
        const text = await file.text();
        return `<iframe srcdoc="${text}"></iframe>`;
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

// File selection and preview handling
document.getElementById('fileInput').addEventListener('change', async (event) => {
    const filesContainer = document.getElementById('filesContainer');
    filesContainer.innerHTML = ''; // Clear previous previews

    const files = event.target.files;
    for (let file of files) {
        const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

        // Check if file extension is allowed
        if (!allowedExtensions.includes(fileExtension)) {
            alert(`File "${file.name}" is not allowed. Allowed file types: ${allowedExtensions.join(', ')}`);
            continue;
        }

        // Determine preview handler
        let previewHandler = filePreviewHandlers['text/plain'];
        if (filePreviewHandlers[file.type]) {
            previewHandler = filePreviewHandlers[file.type];
        }

        // Create preview card
        const previewCard = document.createElement('div');
        previewCard.className = 'file-preview-card';
        
        // File name
        const fileName = document.createElement('div');
        fileName.textContent = file.name;
        fileName.className = 'file-preview-card-file-name';
        
        // Preview content
        const previewContent = document.createElement('div');
        previewContent.innerHTML = await previewHandler(file);
        previewContent.className = 'file-preview';

        previewCard.appendChild(fileName);
        previewCard.appendChild(previewContent);
        
        filesContainer.appendChild(previewCard);
    }
});

// document.getElementById("uploadForm").addEventListener("submit", async (event) => {
//   event.preventDefault();

//   const formData = new FormData();
//   const fileInput = document.getElementById("fileInput");

//   if (!fileInput.files[0]) {
//     alert("Please select a file to upload.");
//     return;
//   }

//   formData.append("file", fileInput.files[0]);

//   try {
//     const response = await fetch("/upload", {
//       method: "POST",
//       body: formData,
//     });

//     const result = await response.json();

//     if (response.ok) {
//       // Add the uploaded file to the preview container
//       const folderFilesDiv = document.getElementById("folderFiles");
//       const fileElement = document.createElement("div");
//       fileElement.textContent = result.file.name;
//       folderFilesDiv.appendChild(fileElement);
//     } else {
//       alert(result.message || "File upload failed.");
//     }
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     alert("An unexpected error occurred while uploading the file.");
//   }
// });





















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
      
      if(response.ok) {
        const newInvite = await response.json();
        console.log("invitiation valid", newInvite);
        alert("Invitation sent!");
      }
      else{
        const errorInvite = await response.json();
        alert("ERROR inviting user", errorInvite);
      }
  }
  catch(error) {
    alert("Catch error", error);
  }
} else {
    alert("Please enter an email.");
  }
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















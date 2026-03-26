document.addEventListener("DOMContentLoaded", function () {
    const edittogglePassword = document.getElementById("editTogglePassword");
    const editpasswordInput = document.getElementById("editPassword");

    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    if (!edittogglePassword || !editpasswordInput) return;

        edittogglePassword.addEventListener("click", () => {
        const isPassword = editpasswordInput.type === "password";
        editpasswordInput.type = isPassword ? "text" : "password";
        edittogglePassword.classList.toggle("fa-eye");
        edittogglePassword.classList.toggle("fa-eye-slash");
    });

    if (!togglePassword || !passwordInput) return;

        togglePassword.addEventListener("click", () => {
        const isPassword = passwordInput.type === "password";
        passwordInput.type = isPassword ? "text" : "password";
        togglePassword.classList.toggle("fa-eye");
        togglePassword.classList.toggle("fa-eye-slash");
    });

    // Modal functionality
    const profmodal = document.getElementById("profileModal");
    const profbtn = document.getElementById("profileBtn");
    const profclose = document.getElementsByClassName("close")[0];
    const dropArea = document.getElementById("dropArea");
    const fileInput = document.getElementById("profilePictureInput");
    const fileLink = document.getElementById("fileLink");
    const imagePreview = document.getElementById("imagePreview");
    const previewImg = document.getElementById("previewImg");
    const saveBtn = document.getElementById("saveBtn");
    const cancelBtn = document.getElementById("cancelBtn");
    const profileImg = document.querySelector(".profile-picture img");

    let selectedFile = null;

    if (profmodal && profbtn && profclose) {
        // Open modal when button is clicked
        profbtn.onclick = function() {
            profmodal.style.display = "block";
        };

        // Close modal when close button is clicked
        profclose.onclick = function() {
            profmodal.style.display = "none";
            resetModal();
        };

        // Close modal when clicking outside of it
        window.onclick = function(event) {
            if (event.target === profmodal) {
                profmodal.style.display = "none";
                resetModal();
            }
        };
    }

    // Handle file link click to trigger file input
    if (fileLink) {
        fileLink.onclick = function() {
            fileInput.click();
        };
    }

    // Handle file input change
    if (fileInput) {
        fileInput.onchange = function(event) {
            handleFile(event.target.files[0]);
        };
    }

    // Drag and drop functionality
    if (dropArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        });

        function highlight(e) {
            dropArea.classList.add('dragover');
        }

        function unhighlight(e) {
            dropArea.classList.remove('dragover');
        }

        dropArea.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                handleFile(files[0]);
            }
        }
    }

    function handleFile(file) {
        if (file && file.type.startsWith('image/')) {
            selectedFile = file;
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImg.src = e.target.result;
                dropArea.style.display = 'none';
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }
    }

    function resetModal() {
        selectedFile = null;
        dropArea.style.display = 'block';
        imagePreview.style.display = 'none';
        previewImg.src = '';
        fileInput.value = '';
    }

    // Save button functionality
    if (saveBtn) {
        saveBtn.onclick = function() {
            if (selectedFile) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImg.src = e.target.result;
                    profmodal.style.display = "none";
                    resetModal();
                    alert('Profile picture updated successfully!');
                };
                reader.readAsDataURL(selectedFile);
            }
        };
    }

    // Cancel button functionality
    if (cancelBtn) {
        cancelBtn.onclick = function() {
            resetModal();
        };
    }

    const chngacctmodal = document.getElementById("ChangeAccountModal");

    if (chngacctmodal) {
        // Open modal when button is clicked
        document.querySelector('.dashboard-link[href="#"]').onclick = function() {
            chngacctmodal.style.display = "block";
        };

        // Close modal when close button is clicked
        chngacctmodal.querySelector('.close').onclick = function() {
            chngacctmodal.style.display = "none";
        };

        // Close modal when clicking outside of it
        window.onclick = function(event) {
            if (event.target === chngacctmodal) {
                chngacctmodal.style.display = "none";
            }
        };

        // Handle create new account button
        const createAccountBtn = document.getElementById("createAccountBtn");
        if (createAccountBtn) {
            createAccountBtn.onclick = function() {
            };
        }

        // Handle select existing account button
        const selectAccountBtn = document.getElementById("selectAccountBtn");
        if (selectAccountBtn) {
            selectAccountBtn.onclick = function() {
                // Connect to API for this, the one with google, facebook, etc. 
            };
        }
    }

    const somodal = document.getElementById("SignOutModal");
    const sobtn = document.getElementById("signOutBtn");
    const csobtn = document.getElementById("confirmsoBtn"); // Confirm Sign Out button, still to be added feature for backend sign out functionality
    const soclose = document.getElementById("cancelsoBtn");

    if (somodal && sobtn && soclose) {
        // Open modal when button is clicked
            sobtn.onclick = function() {
                somodal.style.display = "block";
            };
        };

        // Close modal when close button is clicked
        if (soclose) {
            soclose.onclick = function() {
                somodal.style.display = "none";
            };
        }

        // Close modal when clicking outside of it
        window.onclick = function(event) {
            if (event.target === somodal) {
                somodal.style.display = "none";
            }
        };
    });

    // Edit Profile Modal functionalities

    const editProfileBtn = document.getElementById("editProfileBtn");
    const editProfileModal = document.getElementById("edit-profile-modal");
    const cancelEditBtn = document.querySelector(".cancel-btn");


    if (editProfileBtn) {
        editProfileBtn.onclick = function() {
                editProfileModal.style.display = "block";
            };
        };

    if (cancelEditBtn) {
        cancelEditBtn.onclick = function() {
            editProfileModal.style.display = "none";
        };
    }


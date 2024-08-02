document.addEventListener('DOMContentLoaded', function() {

  const loginForm = document.getElementById('loginForm');

  const registerForm = document.getElementById('registerForm');

  const uploadForm = document.getElementById('uploadForm');

  const fileContainer = document.getElementById('file-container');

  const authContainer = document.getElementById('auth-container');

  const registerContainer = document.getElementById('register-container');

  const loginLink = document.getElementById('loginLink');

  const registerLink = document.getElementById('registerLink');

  const fileList = document.getElementById('fileList');

  const fileChart = document.getElementById('fileChart').getContext('2d');

  let user = null;

  let files = [];

  loginForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const username = document.getElementById('username').value;

    const password = document.getElementById('password').value;

    if (username === 'user' && password === 'pass') {

      user = username;

      document.getElementById('loggedInUser').textContent = user;

      authContainer.style.display = 'none';

      registerContainer.style.display = 'none';

      fileContainer.style.display = 'block';

      updateFileList();

    } else {

      document.getElementById('loginError').textContent = 'Invalid credentials';

    }

  });

  registerLink.addEventListener('click', function() {

    authContainer.style.display = 'none';

    registerContainer.style.display = 'block';

  });

  loginLink.addEventListener('click', function() {

    registerContainer.style.display = 'none';

    authContainer.style.display = 'block';

  });

  registerForm.addEventListener('submit', function(event) {

    event.preventDefault();

    document.getElementById('registerError').textContent = 'Registration is not supported in this demo.';

  });

  uploadForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const fileInput = document.getElementById('fileInput');

    const file = fileInput.files[0];

    

    if (file) {

      files.push({ name: file.name, size: file.size });

      updateFileList();

      fileInput.value = ''; // Clear the file input

    }

  });

  function updateFileList() {

    fileList.innerHTML = files.map(file => `<li>${file.name} (${file.size} bytes)</li>`).join('');

    updateChart();

  }

  function updateChart() {

    new Chart(fileChart, {

      type: 'bar',

      data: {

        labels: files.map(file => file.name),

        datasets: [{

          label: 'File Sizes',

          data: files.map(file => file.size),

          backgroundColor: 'rgba(75, 192, 192, 0.2)',

          borderColor: 'rgba(75, 192, 192, 1)',

          borderWidth: 1

        }]

      },

      options: {

        scales: {

          y: {

            beginAtZero: true

          }

        }

      }

    });

  }

});
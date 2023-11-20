document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  const entriesBody = document.getElementById('entriesBody');
  let entries = [];

  // Load entries from localStorage if available
  if (localStorage.getItem('entries')) {
    entries = JSON.parse(localStorage.getItem('entries'));
    renderEntries();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;

    // Validate email
    const validEmail = validateEmail(email);

    // Calculate age from date of birth
    const age = calculateAge(dob);

    if (validEmail && age >= 18 && age <= 55) {
      // Add entry to local entries array
      entries.push({
        name,
        email,
        password,
        dob,
        acceptTerms
      });

      // Save entries to localStorage
      localStorage.setItem('entries', JSON.stringify(entries));

      // Render entries
      renderEntries();

      // Clear form fields after submission
      form.reset();
    } else {
      alert('Enter a valid email address and Ensure age is between 18 and 55.');
    }
  });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function calculateAge(dob) {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
      age--;
    }

    return age;
  }

  function renderEntries() {
    // To Clear previous entries from table
    entriesBody.innerHTML = '';

    // To Render all entries
    entries.forEach(entry => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.email}</td>
        <td>${entry.password}</td>
        <td>${entry.dob}</td>
        <td>${entry.acceptTerms ? 'Yes' : 'No'}</td>
      `;
      entriesBody.appendChild(newRow);
    });
  }
});

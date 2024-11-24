document.addEventListener("DOMContentLoaded", () => {
    // Get the modal instance outside the event listener to avoid re-initializing it
    const editInventoryModal = new bootstrap.Modal(document.getElementById('editInventoryModal'));

    // Get the search bar input and table
    const searchBar = document.getElementById('searchBar');
    const productTable = document.getElementById('productTable');
    const rows = productTable.getElementsByTagName('tr');

    // Search functionality
    searchBar.addEventListener('input', function () {
        const searchQuery = searchBar.value.toLowerCase();

        // Loop through each table row (skip the first row which is the header)
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            const productName = cells[0].textContent.toLowerCase(); 

            // Show or hide row based on search query match
            rows[i].style.display = productName.includes(searchQuery) ? '' : 'none';
        }
    });

    // Handle delete and edit button clicks
    productTable.addEventListener('click', function(event) {
        // Delete button click
        if (event.target.classList.contains('btn-outline-danger')) {
            const row = event.target.closest('tr');
            if (confirm('Are you sure you want to delete this product?')) {
                row.remove(); // Removes the row from the table
            }
        }

        // Edit button click
        if (event.target.classList.contains('edit-btn')) {
            const row = event.target.closest('tr');
            const productName = row.querySelector('td:nth-child(1)').innerText;
            const quantity = row.querySelector('td:nth-child(2)').innerText;
            const price = row.querySelector('td:nth-child(3)').innerText.replace('Php', '').trim();

            // Populate the edit modal fields
            document.getElementById('editProductName').value = productName;
            document.getElementById('editQuantity').value = quantity;
            document.getElementById('editPrice').value = price;
            document.getElementById('editTotalPrice').value = (parseFloat(quantity) * parseFloat(price)).toFixed(2);

            // Show the modal (it should be instant now)
            editInventoryModal.show();
        }
    });
});

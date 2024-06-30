document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const stock = parseInt(card.getAttribute('data-stock'));
        const sold = parseInt(card.getAttribute('data-sold'));
        const progress = card.querySelector('.progress');
        const percentage = (sold / stock) * 100;
        progress.style.width = percentage + '%';
    });
});

function openModal() {
    document.getElementById("addItemModal").style.display = "block";
}

function closeModal() {
    document.getElementById("addItemModal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("addItemModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.getElementById("itemImage").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById("imagePreview");
            preview.src = e.target.result;
            preview.style.display = "block";
        }
        reader.readAsDataURL(file);
    }
});

document.getElementById("addItemForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Collect form data
    const itemName = document.getElementById("itemName").value;
    const itemDescription = document.getElementById("itemDescription").value;
    const itemStock = document.getElementById("itemStock").value;
    const itemPrice = document.getElementById("itemPrice").value;
    const itemSold = document.getElementById("itemSold").value;
    const itemImage = document.getElementById("imagePreview").src;

    // Create new card element
    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.innerHTML = `
        <img src="${itemImage}" alt="${itemName}">
        <div class="card-content">
            <h2>${itemName}</h2>
            <p>${itemDescription}</p>
            <p>Stock: ${itemStock}</p>
            <p>Price: $${itemPrice}</p>
            <p>Sold: ${itemSold}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${(itemSold/itemStock)*100}%;"></div>
            </div>
        </div>
    `;

    // Append the new card to the container
    document.querySelector(".card-container").appendChild(newCard);

    // Reset form and close modal
    document.getElementById("addItemForm").reset();
    document.getElementById("imagePreview").style.display = "none";
    closeModal();
});

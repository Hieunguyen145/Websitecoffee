// Mảng lưu trữ giỏ hàng
let cart = [];

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(name, price) {
    // Lấy thông tin user và table từ localStorage
    const user = localStorage.getItem('customerName') || 'Guest';
    const table = localStorage.getItem('tableNumber') || 'N/A';

    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    let item = cart.find(item => item.name === name && item.user === user && item.table === table);
    if (item) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng
        item.quantity++;
    } else {
        // Nếu chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
        cart.push({ name, price, quantity: 1, user, table });
    }

    // Cập nhật giỏ hàng và tổng tiền
    updateCart();
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(name) {
    // Lấy thông tin user và table từ localStorage
    const user = localStorage.getItem('customerName') || 'Guest';
    const table = localStorage.getItem('tableNumber') || 'N/A';

    // Tìm sản phẩm trong giỏ hàng và giảm số lượng
    let itemIndex = cart.findIndex(item => item.name === name && item.user === user && item.table === table);
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
        } else {
            cart.splice(itemIndex, 1); // Xóa sản phẩm nếu số lượng bằng 1
        }
    }

    // Cập nhật giỏ hàng và tổng tiền
    updateCart();
}

// Hàm cập nhật giỏ hàng và tổng tiền
function updateCart() {
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');

    // Xóa danh sách cũ
    cartList.innerHTML = '';

    // Nếu giỏ hàng trống, hiển thị thông báo
    if (cart.length === 0) {
        cartList.innerHTML = '<li>Không có sản phẩm trong giỏ hàng</li>';
    } else {
        // Thêm từng sản phẩm vào giỏ hàng
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - ${item.price.toLocaleString('vi-VN')} VND x ${item.quantity} (User: ${item.user}, Table: ${item.table})`;

            // Tạo nút xóa
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Xóa';
            removeButton.style.marginLeft = '10px';
            removeButton.onclick = () => removeFromCart(item.name);

            // Thêm nút xóa vào mục sản phẩm
            listItem.appendChild(removeButton);
            cartList.appendChild(listItem);
        });
    }

    // Tính tổng tiền
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    totalPriceElement.textContent = `${totalPrice.toLocaleString('vi-VN')} VND`;
}

// Hàm tìm kiếm trong menu
function filterMenu() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const itemName = item.dataset.name.toLowerCase();
        if (itemName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Hàm hiển thị thông báo "Đã đặt thành công"
function goToAdmin() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm.");
        return;
    }
    // Lưu giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Hiển thị thông báo đặt hàng thành công
    alert("Đơn hàng của bạn đã được đặt thành công! Cảm ơn bạn đã ủng hộ Coffee House.");

    // Chuyển hướng sang trang admin (file admin.html)
    window.location.href = 'admin.html';

    // Reset giỏ hàng sau khi đặt hàng
    cart = [];
    updateCart();
}
function goToAdmin() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm.");
        return;
    }

    // Lấy thông tin khách hàng từ localStorage
    const customerName = localStorage.getItem('customerName') || 'Guest';
    const tableNumber = localStorage.getItem('tableNumber') || 'N/A';

    // Lấy danh sách đơn hàng từ localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Thêm thông tin đơn hàng mới
    orders.push({
        customer: customerName,
        table: tableNumber,
        items: [...cart], // Sao chép giỏ hàng
        status: "Đang thực hiện",
    });

    // Lưu danh sách đơn hàng vào localStorage
    localStorage.setItem('orders', JSON.stringify(orders));

    // Hiển thị thông báo đặt hàng thành công
    alert("Đơn hàng của bạn đã được đặt thành công! Cảm ơn bạn đã ủng hộ Coffee House.");

    // Xóa giỏ hàng
    cart = [];
    updateCart();
}




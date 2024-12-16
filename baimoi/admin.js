document.addEventListener('DOMContentLoaded', () => {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersContainer = document.getElementById('orders-list');

    if (orders.length === 0) {
        ordersContainer.innerHTML = '<tr><td colspan="5">No orders available</td></tr>';
    } else {
        orders.forEach((order, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${order.customer}</td>
                <td>${order.table}</td>
                <td>${order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}</td>
                <td><span class="status">${order.status}</span></td>
                <td>
                    <button class="btn complete" onclick="markAsCompleted(${index})">Đã xong</button>
                </td>
            `;
            ordersContainer.appendChild(row);
        });
    }
});

// Đánh dấu đơn hàng là đã xong
function markAsCompleted(index) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (orders[index]) {
        orders[index].status = "Đã xong"; // Cập nhật trạng thái
        localStorage.setItem('orders', JSON.stringify(orders)); // Lưu lại
        location.reload(); // Cập nhật giao diện
    }
}

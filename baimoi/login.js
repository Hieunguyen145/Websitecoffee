function login() {
    // Lấy giá trị từ các input
    const customerName = document.getElementById('customer-name').value.trim();
    const tableNumber = document.getElementById('table-number').value.trim();

    // Kiểm tra các giá trị hợp lệ
    if (!customerName || !tableNumber) {
        alert('Vui lòng điền đủ thông tin.');
        return;
    }

    // Lưu thông tin vào localStorage
    localStorage.setItem('customerName', customerName);
    localStorage.setItem('tableNumber', tableNumber);

    // Chuyển hướng đến trang chủ
    window.location.href = 'trangchu2.html';
}

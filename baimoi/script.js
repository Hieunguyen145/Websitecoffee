document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function () {
        const row = this.closest('tr');
        const statusCell = row.querySelector('.status');

        if (this.classList.contains('complete')) {
            statusCell.textContent = 'Hoàn thành';
            statusCell.className = 'status completed';
        } else if (this.classList.contains('out-of-stock')) {
            statusCell.textContent = 'Hết hàng';
            statusCell.className = 'status out-of-stock';
        } else if (this.classList.contains('processing')) {
            statusCell.textContent = 'Đang xử lý';
            statusCell.className = 'status processing';
        }
    });
});

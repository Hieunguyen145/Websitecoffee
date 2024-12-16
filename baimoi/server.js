const express = require('express'); // Import thư viện Express
const app = express(); // Khởi tạo server
const port = 5000;

// Middleware để xử lý JSON
app.use(express.json());

// Route cơ bản: Trang chủ
app.get('/', (req, res) => {
    res.send('Chào mừng bạn đến với Backend của trang web order cafe!');
});

// Route API trả về danh sách sản phẩm (menu)
app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: 'Cà phê đen', price: 20000 },
        { id: 2, name: 'Cà phê sữa', price: 25000 },
        { id: 3, name: 'Trà sữa', price: 30000 }
    ];
    res.json(products);
});

// Route API tạo đơn hàng (POST request)
app.post('/api/orders', (req, res) => {
    const order = req.body;
    console.log('Đơn hàng nhận được:', order);
    res.status(201).json({ message: 'Đơn hàng đã được tạo thành công!', order });
});

// Khởi chạy server
app.listen(port, () => {
    console.log(`Server đang chạy tại http://localhost:${port}`);
});

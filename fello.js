setInterval(function () {
    document.querySelectorAll('.fello_product_card').forEach(function (card) {

        /* --- NHIỆM VỤ: TÁCH CHUỖI DANH MỤC THÀNH CÁC THẺ RIÊNG BIỆT --- */
        var categoryContainer = card.querySelector('.grid-product--category');

        // Kiểm tra xem thẻ này đã được tách chưa (để tránh JS chạy lặp lại vô tận gây lỗi)
        if (categoryContainer && !categoryContainer.hasAttribute('data-splitted')) {
            var catText = categoryContainer.innerText.trim();

            if (catText.length > 0) {
                // Cắt chuỗi dựa trên dấu phẩy
                var categories = catText.split(',');

                // Xóa sạch chữ gộp cũ
                categoryContainer.innerHTML = '';

                // Tạo lại từng thẻ riêng đắp vào
                categories.forEach(function (cat) {
                    var cleanCatName = cat.trim();
                    if (cleanCatName) {
                        var span = document.createElement('span');
                        span.className = 'fello-category-tag'; // Nối với CSS để bo góc, tô màu
                        span.innerText = cleanCatName;
                        categoryContainer.appendChild(span);
                    }
                });
            }
            // Đóng dấu đã xử lý
            categoryContainer.setAttribute('data-splitted', 'true');
        }

    });
}, 1000);


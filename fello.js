/* ==========================================================================
   TÁCH DANH MỤC SẢN PHẨM THÀNH CÁC PILL TAG RIÊNG BIỆT
   Mô tả: Webcake hiển thị danh mục dạng chuỗi gộp (vd: "Dưỡng ẩm, Phục hồi").
   Script này tách thành các thẻ <span> riêng để kết hợp với CSS pill tag.
   ========================================================================== */

setInterval(function () {
    var cards = document.querySelectorAll('.fello_product_card');

    cards.forEach(function (card) {
        var categoryContainer = card.querySelector('.grid-product--category');

        // Bỏ qua nếu không tìm thấy container hoặc đã được xử lý rồi
        if (!categoryContainer || categoryContainer.hasAttribute('data-splitted')) return;

        var rawText = categoryContainer.innerText.trim();

        // Bỏ qua nếu không có nội dung
        if (!rawText) return;

        // Tách chuỗi theo dấu phẩy, xóa nội dung cũ
        var categories = rawText.split(',');
        categoryContainer.innerHTML = '';

        // Tạo thẻ pill riêng cho từng danh mục
        categories.forEach(function (cat) {
            var name = cat.trim();
            if (!name) return;

            var pill = document.createElement('span');
            pill.className = 'fello-category-tag';
            pill.innerText = name;
            categoryContainer.appendChild(pill);
        });

        // Đánh dấu đã xử lý để tránh chạy lại
        categoryContainer.setAttribute('data-splitted', 'true');
    });

}, 1000);

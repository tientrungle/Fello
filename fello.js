/* ==========================================================================
   FELLO SKINCARE — CUSTOM JAVASCRIPT
   
   CẤU TRÚC MỤC LỤC (TABLE OF CONTENTS):
     1. TÁCH DANH MỤC SẢN PHẨM & BÀI VIẾT THÀNH PILL TAGS
        1a. Card Sản Phẩm (.fello_product_card)
        1b. Card Bài Viết — Slider Nhỏ (.fello_blog_card)
        1c. Card Bài Viết — Trang Lớn (.big_blog_card)
        
     2. CĂN CHỈNH VỊ TRÍ NÚT ĐIỀU HƯỚNG SLIDER (NAVIGATION BUTTONS)
        2a. Slider Bài Viết (.fello_blog_card)
        2b. Slider Danh Mục Sản Phẩm (.fello-categories-product)
        2c. Hàm kích hoạt & Lắng nghe sự kiện (Events & Timers)
   ========================================================================== */


/* ==========================================================================
   1. TÁCH DANH MỤC SẢN PHẨM & BÀI VIẾT THÀNH PILL TAGS
   --------------------------------------------------------------------------
   Mô tả: Webcake mặc định hiển thị danh mục dạng chuỗi gộp (vd: "Dưỡng ẩm, Phục hồi").
   Script này chạy định kỳ (mỗi 1s) để tìm các container chứa chuỗi này, tách theo dấu
   phẩy và tạo các thẻ <span class="fello-category-tag"> riêng biệt nhằm áp dụng CSS dạng Pill.
   Phạm vi áp dụng:
     - .fello_product_card (Card sản phẩm trang chủ & danh mục)
     - .fello_blog_card    (Card bài viết slider nhỏ)
     - .big_blog_card      (Card bài viết trang tin tức lớn)
   ========================================================================== */

setInterval(function () {
    // --- 1a. Tách danh mục Sản Phẩm (.fello_product_card) ---
    var cards = document.querySelectorAll('.fello_product_card');
    cards.forEach(function (card) {
        var categoryContainer = card.querySelector('.grid-product--category');
        if (!categoryContainer || categoryContainer.hasAttribute('data-splitted')) return;
        var rawText = categoryContainer.innerText.trim();
        if (!rawText) return;
        var categories = rawText.split(',');
        categoryContainer.innerHTML = '';
        categories.forEach(function (cat) {
            var name = cat.trim();
            if (!name) return;
            var pill = document.createElement('span');
            pill.className = 'fello-category-tag';
            pill.innerText = name;
            categoryContainer.appendChild(pill);
        });
        categoryContainer.setAttribute('data-splitted', 'true');
    });

    // --- 1b. Tách danh mục Bài Viết — Slider Nhỏ (.fello_blog_card) ---
    var blogSliders = document.querySelectorAll('.fello_blog_card');
    blogSliders.forEach(function (slider) {
        var categoryDivs = slider.querySelectorAll('.post-list__category');
        categoryDivs.forEach(function (categoryDiv) {
            if (categoryDiv.hasAttribute('data-splitted')) return;
            var rawText = categoryDiv.innerText.trim();
            if (!rawText) return;
            var categories = rawText.split(',');
            categoryDiv.innerHTML = '';
            categories.forEach(function (cat) {
                var name = cat.trim();
                if (!name) return;
                var pill = document.createElement('span');
                pill.className = 'fello-category-tag';
                pill.innerText = name;
                categoryDiv.appendChild(pill);
            });
            categoryDiv.setAttribute('data-splitted', 'true');
        });
    });

    // --- 1c. Tách danh mục Bài Viết — Card Lớn (.big_blog_card) ---
    var bigBlogCards = document.querySelectorAll('.big_blog_card');
    bigBlogCards.forEach(function (bigCard) {
        var categoryDivs = bigCard.querySelectorAll('.post-list__category');
        categoryDivs.forEach(function (categoryDiv) {
            if (categoryDiv.hasAttribute('data-splitted')) return;
            var rawText = categoryDiv.innerText.trim();
            if (!rawText) return;
            var categories = rawText.split(',');
            categoryDiv.innerHTML = '';
            categories.forEach(function (cat) {
                var name = cat.trim();
                if (!name) return;
                var pill = document.createElement('span');
                pill.className = 'fello-category-tag';
                pill.innerText = name;
                categoryDiv.appendChild(pill);
            });
            categoryDiv.setAttribute('data-splitted', 'true');
        });
    });
}, 1000);


/* ==========================================================================
   2. CĂN CHỈNH VỊ TRÍ NÚT ĐIỀU HƯỚNG SLIDER (NAVIGATION BUTTONS)
   --------------------------------------------------------------------------
   Mô tả: Tự động tính toán chiều cao phần thumbnail/ảnh và căn nút Prev/Next
   vào đúng vị trí giữa theo chiều cao của ảnh (tránh việc nút bị lệch xuống dưới).
   Phạm vi áp dụng:
     - .fello_blog_card          (Nút .slider-post--btn của Slider bài viết)
     - .fello-categories-product (Nút .slider-product--control của Slider danh mục)
   ========================================================================== */

/* --- 2a. Tính toán vị trí nút cho Slider Bài Viết (.fello_blog_card) --- */
function felloBlogNavPosition() {
    var sliders = document.querySelectorAll('.fello_blog_card');
    sliders.forEach(function (slider) {
        var thumb = slider.querySelector('.post-list__thumbnail');
        if (!thumb) return;
        var h = thumb.offsetHeight;
        if (h <= 0) return;
        // (h/2) = tâm ảnh; -16 = 1/2 chiều cao nút (32px); +8 = offset tinh chỉnh thực tế
        var topVal = (h / 2) - 16 + 8;
        var btns = slider.querySelectorAll('.slider-post--btn');
        btns.forEach(function (btn) {
            btn.style.top = topVal + 'px';
        });
    });
}

/* --- 2b. Tính toán vị trí nút cho Slider Danh Mục Sản Phẩm (.fello-categories-product) --- */
function felloCategoryNavPosition() {
    var sliders = document.querySelectorAll('.fello-categories-product');

    sliders.forEach(function (slider) {
        var thumb = slider.querySelector('.x-gc-thumbnail');
        if (!thumb) return;

        var thumbRect = thumb.getBoundingClientRect();
        var sliderRect = slider.getBoundingClientRect();
        if (thumbRect.height <= 0) return;

        var thumbTopRelative = thumbRect.top - sliderRect.top;
        var imageCenter = thumbTopRelative + (thumbRect.height / 2);

        var btns = slider.querySelectorAll('.slider-product--control');
        btns.forEach(function (btn) {
            var btnH = btn.offsetHeight || 40;

            // imageCenter - (btnH / 2) + 6: Căn giữa nút theo tâm ảnh + 6px bù phần cao
            var topVal = imageCenter - (btnH / 2) + 6;

            btn.style.setProperty('top', topVal + 'px', 'important');
        });
    });
}

/* --- 2c. Hàm kích hoạt cập nhật vị trí tổng hợp --- */
function felloUpdateNavPositions() {
    felloBlogNavPosition();
    felloCategoryNavPosition();
}

/* --- 2d. Lắng nghe sự kiện để cập nhật vị trí linh hoạt --- */
// Khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', felloUpdateNavPositions);
// Khi tất cả hình ảnh & tài nguyên đã load hoàn tất
window.addEventListener('load', felloUpdateNavPositions);
// Cập nhật lại sau các khoảng thời gian trễ ngắn (tránh layout shift do render chậm)
setTimeout(felloUpdateNavPositions, 300);
setTimeout(felloUpdateNavPositions, 1000);

// Cập nhật lại khi người dùng thay đổi kích thước màn hình
window.addEventListener('resize', function () {
    felloBlogNavPosition();
    felloCategoryNavPosition();
});

// Cập nhật định kỳ 2 giây/lần để đảm bảo vị trí luôn chuẩn kể cả khi slide thay đổi
setInterval(function () {
    felloBlogNavPosition();
    felloCategoryNavPosition();
}, 2000);

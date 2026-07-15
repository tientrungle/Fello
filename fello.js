/* ==========================================================================
   TÁCH DANH MỤC SẢN PHẨM & BÀI VIẾT THÀNH CÁC PILL TAG RIÊNG BIỆT
   Mô tả: Webcake hiển thị danh mục dạng chuỗi gộp (vd: "Dưỡng ẩm, Phục hồi").
   Script này tách thành các thẻ <span> riêng để kết hợp với CSS pill tag.
   Áp dụng cho .fello_product_card, .fello_blog_card và .big_blog_card.
   ========================================================================== */

setInterval(function () {
    // === SẢN PHẨM (.fello_product_card) ===
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

    // === BÀI VIẾT — Slider Nhỏ (.fello_blog_card) ===
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

    // === BÀI VIẾT — Card Lớn (.big_blog_card) ===
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
   CĂN CHỈNH NÚT ĐIỀU HƯỚNG SLIDER THEO CHIỀU CAO ẢNH
   Mô tả: Đặt nút prev/next ở giữa chiều cao phần ảnh (tỉ lệ 4:5).
   Áp dụng cho .fello_blog_card và .fello-categories-product.
   ========================================================================== */

/* --- Blog Slider (.fello_blog_card) --- */
function felloBlogNavPosition() {
    var sliders = document.querySelectorAll('.fello_blog_card');
    sliders.forEach(function (slider) {
        var thumb = slider.querySelector('.post-list__thumbnail');
        if (!thumb) return;
        var h = thumb.offsetHeight;
        if (h <= 0) return;
        // (h/2) = điểm giữa ảnh; -16 = nửa chiều cao nút (32px); +8 = offset thực tế
        var topVal = (h / 2) - 16 + 8;
        var btns = slider.querySelectorAll('.slider-post--btn');
        btns.forEach(function (btn) {
            btn.style.top = topVal + 'px';
        });
    });
}

/* --- Danh Mục Sản Phẩm Slider (.fello-categories-product) --- */
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

            // +6 để bù phần đang bị cao hơn tâm ảnh thực tế
            // Có thể tinh chỉnh thành +4 hoặc +8 nếu cần
            var topVal = imageCenter - (btnH / 2) + 6;

            btn.style.setProperty('top', topVal + 'px', 'important');
        });
    });
}

function felloUpdateNavPositions() {
    felloBlogNavPosition();
    felloCategoryNavPosition();
}

document.addEventListener('DOMContentLoaded', felloUpdateNavPositions);
window.addEventListener('load', felloUpdateNavPositions);
setTimeout(felloUpdateNavPositions, 300);
setTimeout(felloUpdateNavPositions, 1000);
window.addEventListener('resize', function () {
    felloBlogNavPosition();
    felloCategoryNavPosition();
});
setInterval(function () {
    felloBlogNavPosition();
    felloCategoryNavPosition();
}, 2000);

<!-- Lenis Smooth Scroll v1.1.14 — Script & Init -->
<script src="https://unpkg.com/lenis@1.1.14/dist/lenis.min.js"></script>
<script>
  const lenis = new Lenis({
        duration: 1.0,           // Thời gian cuộn (giây) — giảm từ 1.4 → 1.0 cho cảm giác nhanh hơn
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // Easing expo-out tự nhiên
        smoothWheel: true,       // Bật smooth scroll cho chuột
        smoothTouch: false,      // Tắt trên mobile (tránh xung đột với native scroll)
        wheelMultiplier: 1.3,    // Khoảng cách mỗi lần lăn bánh chuột (tăng từ 1.0 → 1.3)
        touchMultiplier: 2.0,    // Tốc độ cuộn trên màn hình cảm ứng
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
</script>

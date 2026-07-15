<!-- Lenis Smooth Scroll v1.1.14 — Script & Init -->
<script src="https://unpkg.com/lenis@1.1.14/dist/lenis.min.js"></script>
<script>
  const lenis = new Lenis({
        duration: 0.75,          // Thời gian cuộn (giây) — giảm từ 1.0 → 0.75s cho phản hồi tức thì, loại bỏ cảm giác delay nhẹ
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // Easing expo-out tự nhiên, bắt đầu cuộn nhanh và êm dần về cuối
        smoothWheel: true,       // Bật smooth scroll cho chuột
        smoothTouch: false,      // Tắt trên mobile (tránh xung đột với native scroll gây giật lag)
        wheelMultiplier: 1.2,    // Khoảng cách mỗi lần lăn chuột (1.2 vừa vặn, không bị trôi quá xa hay lag)
        touchMultiplier: 2.0,    // Tốc độ cuộn trên màn hình cảm ứng
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
</script>

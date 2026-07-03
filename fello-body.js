<!-- Lenis Smooth Scroll Init -->
<script src="https://unpkg.com/lenis@1.1.14/dist/lenis.min.js"></script>
<script>
    const lenis = new Lenis({
    duration: 1.0,           // Giảm từ 1.4 → 1.0 (nhanh hơn)
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1.3,    // Tăng từ 1.0 → 1.3 (cuộn mỗi lần xa hơn)
    touchMultiplier: 2.0,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
</script>


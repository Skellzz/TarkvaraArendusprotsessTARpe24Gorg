/* MATRIX BACKGROUND — FINAL, STABLE, CLICK-SAFE */

(function () {
  function init() {
    // FORCE BODY BASELINE
    document.documentElement.style.height = "100%";
    document.body.style.margin = "0";
    document.body.style.minHeight = "100vh";
    document.body.style.background = "black";

    // CREATE CANVAS
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    canvas.id = "matrix";

    // FORCE FIXED BACKGROUND
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.zIndex = "0";
    canvas.style.pointerEvents = "none";

    // INSERT AT TOP
    document.body.prepend(canvas);

    // CONTENT ABOVE BACKGROUND
    var children = document.body.children;
    for (var i = 0; i < children.length; i++) {
      if (children[i] !== canvas) {
        children[i].style.position = "relative";
        children[i].style.zIndex = "1";
      }
    }

    var fontSize = 16;
    var chars = "アァカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var drops = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      var columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (var i = 0; i < columns; i++) {
        drops[i] = Math.random() * canvas.height / fontSize;
      }
    }

    window.addEventListener("resize", resize);
    resize();

    function draw() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff88";
      ctx.font = fontSize + "px monospace";

      for (var i = 0; i < drops.length; i++) {
        var char = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      requestAnimationFrame(draw);
    }

    draw();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
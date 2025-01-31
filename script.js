// Center content
function wrapAutoElAdjust(el) {
  var timeout = null;
  function resize() {
    if (timeout) clearTimeout(timeout);
    anime.set(el, {scale: 1});
    var parentEl = el.parentNode;
    var elOffsetWidth = el.offsetWidth;
    var parentOffsetWidth = parentEl.offsetWidth;
    var elOffsetHeight = el.offsetHeight;
    var parentOffsetHeight = parentEl.offsetHeight;
    var ratio = parentOffsetWidth / elOffsetWidth;  //svg viewBox ? ? 740 582 8 for Octopus
    timeout = setTimeout(anime.set(el, {scale: ratio}), 10);
  }
  resize();
  window.addEventListener('resize', resize);
}
// End Center Content Code

// OctoAni Code Begin
(function() {
  var octoEl = document.querySelector('.octoSynth');
  var octoPathEls = octoEl.querySelectorAll('.octopus path');
  var pLength = octoPathEls.length;
  var octoLife = [];

  wrapAutoElAdjust(octoEl);
 

  var floatAni = anime({
    begin: function() {
      for (var i = 0; i < pLength; i++) {
        octoLife.push(anime({
          targets: octoPathEls[i],
          stroke: {value:'rgba(0,171,255,.5)', duration: 1000},
          translateY: 10,
          easing: 'linear',
          autoplay: false,
        }));
      }
    },
    update: function(ins) {
      octoLife.forEach(function(animation, i) {
        var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
        animation.seek(animation.duration * percent);
      });
    },
    duration: Infinity,
    autoplay: false
  });

  var octoSmoosh = anime({
      targets: '#octoSkin',
      x1: '25%',
      x2: '25%',
      y1: '0%',
      y2: '75%',
      duration: 5000,
      easing: 'easeOutQuart',
      autoplay: false
    }, 0);

  function init() {
    octoSmoosh.play();
    floatAni.play();
  }
  
  init();

}());
// OctoAni Code End
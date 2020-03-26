/**
 * Main JS file for theme behaviours
 */

// Responsive video embeds
var videoEmbeds = [
  'iframe[src*="youtube.com"]',
  'iframe[src*="vimeo.com"]'
];
reframe(videoEmbeds.join(','));

//Counter
  var options = {
    useEasing: true,
    useGrouping: true,
    separator: ',',
    decimal: '.'
  };
  var counter1 = new CountUp("{{ .section.section_id }}", 0, {{ .section.num_count }}, 0, 6); 
  var waypoint = new Waypoint({
  element: document.getElementById('counter1'),
  handler: function(direction) {    
    if (direction === 'down') {
      counter1.start();
    }
    else {
     counter1.reset();
    }
  },
  offset: '50%'
})  
</script>

// Mobile menu
var menuToggle = document.querySelectorAll('.menu-toggle');
if (menuToggle) {
  for (var i = 0; i < menuToggle.length; i++) {
    menuToggle[i].addEventListener('click', function (e) {
      document.body.classList.toggle('menu--opened');
      e.preventDefault();
    }, false);
  }

  document.body.classList.remove('menu--opened');

  window.addEventListener('resize', function () {
    if (menuToggle.offsetParent === null) {
      document.body.classList.remove('menu--opened');
    }
  }, true);
}

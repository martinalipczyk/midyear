var loadFile = function(event) { 
var image = document.getElementById('output');
image.src = URL.createObjectURL(event.target.files[0]); 
}; 

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.materialboxed');
    var instances = M.Materialbox.init(elems, options);
  });


function myFunction() {
    document.body.style.backgroundColor = "red";
}

// alert('hi');
// $(document).ready(function(){
//    $('#circle').click(function(){
//     document.getElementById('appCover')
//    }) 
// })

function myFunction() {
    var x = document.getElementById("appCover");
    if (x.style.display === "none") {
        x.style.display = "block";
    } 
    else {
        x.style.display = "none";
    }
}
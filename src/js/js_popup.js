$(document).on('change', '.switch-on-off', function(){
    if($('.switch-on-off').is(":checked")){
        localStorage.setItem("on", 1);
    }else{
        localStorage.removeItem("on");
    }
})
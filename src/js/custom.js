var path = [];

let HtmlRender= `
    <div class="wrap-element-extension">
        <div class="close-extension">
            <img src="https://cdnjs.cloudflare.com/ajax/libs/fontisto/3.0.4/icons/editor/close.png" alt="close">
        </div>
        <form>
            <textarea name="copy" id="copy-element" readonly cols="30" rows="4"></textarea>
            <button class="button-Copy">Copy</button>
        </form>
        <div class="wrap-on-off-element">
        </div>
    </div>
`; 

$(document).click(function(e) {
    if (e.altKey) {
        let target = e.target
        let tag = target.tagName.toLowerCase()
        let attributes = target.attributes;
        let nodeNames = [];
        let selector = cssPath(target);

        $('.wrap-element-extension').remove()
        $('body').append(HtmlRender).find('#copy-element').val(selector);
        $('.wrap-on-off-element').html(add_switch(path));
        return false;
    }
})

var cssPath = function(el) {
    path = [];
    if (!(el instanceof Element)) 
        return;
    while (el.nodeType === Node.ELEMENT_NODE) {
        var selector = el.nodeName.toLowerCase();
        if (el.id) {
            selector += '#' + el.id;
            path.unshift(selector);
            break;
        } else {
            var sib = el, nth = 1;
            while (sib = sib.previousElementSibling) {
                if (sib.nodeName.toLowerCase() == selector)
                   nth++;
            }
            if (nth != 1)
                selector += ":nth-of-type("+nth+")";
        }
        path.unshift(selector);
        el = el.parentNode;
    }
    return path.join(" > ");
 }

$(document).on('click', '.button-Copy', function(){
    $('#copy-element').focus()
    $('#copy-element').select()
    document.execCommand('copy');
    return false;
})

$(document).on('click', '.close-extension', function(){
    $(this).parent('.wrap-element-extension').remove()
})

$(document).on('change', '.checkbox-switch-element', function(){
    let arr_checked = [];
    let selector = "";
    let arr = path;

    $('.checkbox-switch-element').each(function(){
        if($(this).is(":checked")){
            arr_checked.push($(this).val())
        }
    })

    $.each(arr , function (index, value){
        if(in_array(index, arr_checked) < 0){
            selector += value+ " > ";
        }else{
            selector = selector.substring(0, selector.length - 3);
            if(index != 0 ) selector += " ";
        }
    })
    selector = selector.substring(0, selector.length - 3);
    $('body').find('#copy-element').val(selector);

})

function in_array(vl, arr){
    var pos = -1;
    for(var i = 0; i < arr.length; i++){
        if(vl == arr[i]){
            pos = i;
            break;
        }
    }
    return pos;
}

function add_switch(data){
    let html = ``;
    // path.join(" > ")
    $.each(data , function (index, value){  
        html+= `<div class="flex flex-space-between mb5">
            <label for="" class="label-switch-element">`+value+`</label>
            <label class="switch-element">
                <input type="checkbox" value="`+index+`" class="checkbox-switch-element"/>
                <span></span>
            </label>
        </div>`;
    });  
    return html;
}

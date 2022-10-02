var result = {
    'selector' : "",
    'target' : []
};

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
        tag = tag+ convert_target(e.target);
        let allParents = GetParents(tag);
        $('.wrap-element-extension').remove()
        let html_switch = add_switch(allParents.target);
        $('body').append(HtmlRender).find('#copy-element').val(allParents.selector);
        $('.wrap-on-off-element').html(html_switch);
        return false;
    }
})

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
    let _this = $(this);
    let arr_checked = [];
    let selector = "";
    let arr = result.target;

    $('.checkbox-switch-element').each(function(){
        if($(this).is(":checked")){
            arr_checked.push($(this).val())
        }
    })

    $.each(arr , function (index, value){
        if(in_array(index, arr_checked) < 0){
            selector += value.toLowerCase();
        }else{
            selector = selector.substring(0, selector.length - 1);
            if(index != 0 ) selector += " ";
        }
    })
    selector = selector.substring(0, selector.length - 1);
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

function GetParents(element) {
    var parents = $(element).parents();
    result = {
        'selector' : "",
        'target' : []
    };
    for (var i = parents.length-1; i >= 0; i--) {
        let target = parents[i].tagName+convert_target(parents[i]) + ">";
        result.selector += target;
        result.target.push(target)
    }
    result.target.push(element)
    result.selector += element;
    result.selector = result.selector.toLowerCase();
    return result;
}


function convert_target(target){
    return (target.id ? '#'+$.trim(target.id).replace(" ", "#") : '')+(target.className ? '.'+$.trim(target.className).replace(" ", ".") : '')+(target.getAttribute('name') ? '[name="'+$.trim(target.getAttribute('name'))+'"]' : '');
}

function add_switch(data){
    let html = ``;
    $.each(data , function (index, value){  
        html+= `<div class="flex flex-space-between mb5">
            <label for="" class="label-switch-element">`+value.replace(">", "").toLowerCase()+`</label>
            <label class="switch-element">
                <input type="checkbox" value="`+index+`" class="checkbox-switch-element"/>
                <span></span>
            </label>
        </div>`;
    });  
    return html;
}

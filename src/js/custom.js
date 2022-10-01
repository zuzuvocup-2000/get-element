let HtmlRender= `
    <div class="wrap-element-extension">
        <form>
            <textarea name="copy" id="copy-element" readonly cols="30" rows="10"></textarea>
            <button class="button-Copy">Copy</button>
        </form>
    </div>
`; 

let XPATHDATA = [];

$('body').append(HtmlRender);

$(document).click(function(e) {
    if (e.altKey) {
        let target = e.target
        let tag = target.tagName.toLowerCase()
        let attributes = target.attributes;
        addAllXPathAttributes(attributes, tag, target);
        tag = tag+(e.target.id ? '#'+e.target.id.replace(" ", "#") : '')+(e.target.className ? '.'+e.target.className.replace(" ", ".") : '')
        XPATHDATA.push(tag)
        console.log(XPATHDATA);
        return false;
    }
})

function addAllXPathAttributes(attributes, tagName, target) {
    jQuery.each( attributes, function( i, element ) {
        console.log(attributes[i].name);
        switch (attributes[i].name) {
            case "id":
                getUniqueId(target, tagName);
                break;
            case "name":
                getUniqueName(target, tagName);
                break;
            case "class":
                getUniqueClassName(target, tagName);
                break;
        }
    });
}

function getUniqueId(elemet, tag) {
    let idValue = elemet.id;
    let idPattern = '#'+idValue.replace(" ", "#");
    XPATHDATA.push(idPattern);
}

function getUniqueName(element, tag) {
    let value = element.name;
    let nameValue = `[name="`+value+`"]`;
    XPATHDATA.push(nameValue);
}

function getUniqueClassName(elemet, tag) {
    let classValue = elemet.className;
    let classPattern = '.'+classValue.replace(" ", ".");
    XPATHDATA.push(classPattern);
}

$(document).on('click', '.button-Copy', function(){
    $('#copy-element').focus()
    $('#copy-element').select()
    document.execCommand('copy');
    return false;
})
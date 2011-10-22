(function() {

    // var POST_URL = 'http://localhost:8080/translate/typo/index'
    var POST_URL = 'http://translate.cloudfoundry.com/typo/index'

    function x(element, map, events) {
        var result = typeof(element)=='string'?document.createElement(element):element
        for (var k in map) {
            if (k != 'style') result[k] = map[k]
            else x(result.style, map.style)
        }
        if (events) {
            for (var k in events) result.addEventListener(k, events[k], false)
        }
        return result
    }

    var dialog = x('div', {style:{
        position:'fixed',
        top:'10px',
        right: '10px',
        width:'600px',
        backgroundColor:'white'
    }})

    var f = x('form', {method:'POST', action:POST_URL})
    f.appendChild(x('div', {textContent:'内容：'}))
    f.appendChild(x('textarea', {rows:3, name:'content', textContent: window.getSelection() + '', style:{width:'100%'}}))
    f.appendChild(x('div', {textContent:'コメント：'}))
    f.appendChild(x('textarea', {rows:3, name:'comment', style:{width:'100%'}}))
    f.appendChild(x('input', {type:'hidden', name:'url', value:location.href}))
    f.appendChild(x('input', {type:'submit', value:'送信'}))
    f.appendChild(x('input', {type:'button', value:'キャンセル'}, {click:function() {document.body.removeChild(dialog)}}))

    dialog.appendChild(f)
    document.body.appendChild(dialog)
})()
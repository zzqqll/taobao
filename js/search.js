const oIpt = document.querySelector('input');
const oUl = document.querySelector('.search ul');

oIpt.addEventListener('input', function () {
    // 1,获取数据

    // 关键词
    let key = this.value;

    // 当前时间
    const t = new Date();
    let keyT = t.getTime();

    let s = document.createElement('script');

    // 给生成的跨域请求script,添加区别属性 name="jsonp"
    s.setAttribute('name', 'jsonp');

    // 获取当前页面中,所有的script标签,找到name是jsonp的标签
    let scriptAll = document.querySelectorAll('script');


    // 循环遍历所有的script标签
    scriptAll.forEach(function (item) {
        // 判断script标签,也就是现在的item,name属性是jsonp
        if (item.getAttribute('name') == 'jsonp') {
            // 使用已有的,name是jsonp的标签来作为新的,写入的script标签的内容
            // 将已有的item内容,替换为s节点的内容
            s = item;
        }

        s.src = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1444,21127,30211,26350&wd=${key}&req=2&csor=1&pwd=b&cb=fun&_=${keyT}`;

    })

    // 将s标签,写入到页面那种
    document.body.appendChild(s);

    window.fun = function (result) {
        // console.log(result);
        // 给ul中,写入li之前,应该先清除ul中,之前的内容
        oUl.innerHTML = '';

        // 在自定义的回调函数中,可以使用result参数,生成内容
        // 属性g当中存储的是数据内容
        // 如果没有g,不显示ul,如果有g,再显示内容
        if(result.g){
            // 让ul显示
            oUl.style.display = 'block';

            // 根据g的内容,生成li
            // g当中的数据q,存储的是我们需要的文字内容
            result.g.forEach(function(item){
                // 生成li标签
                let oLi = document.createElement('li');
                // li的内容是q中存储的内容
                oLi.innerHTML = item.q;
                // 将li写入到ul中
                oUl.appendChild(oLi);
            })
        }else{
            oUl.style.display = 'none';
        }
        
        // 删除script标签
        document.body.removeChild(s)
    }

})
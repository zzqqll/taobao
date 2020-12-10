$(function () {

    let info = null;
    const id = getCookie('goods_id')
    getGoodsInfo()
    async function getGoodsInfo() {
        const goodsInfo = await $.get('../server/getGoodsInfo.php', {
            goods_id: id
        }, null, 'json');
        bindHtml(goodsInfo.info)
        info = goodsInfo.info
        console.log(info)
    }
    //渲染页面
    function bindHtml(info) {
        // console.log(info)
        $('.enlargeBox').html(`
<div class="show">
  <img src="${ info.goods_big_logo }" alt="">
</div>
<div class="list">
<p class="active">
<img src="${ info.goods_small_logo }" alt="">
</p>
</div>
`)

        $('.goodsInfo').html(`
<p calss="desc">${ info.goods_name }</p>
<div calss="byn-group size">
<button type="button" class="btn btn-default">S</button> 
<button type="button" class="btn btn-default">M</button> 
<button type="button" class="btn btn-default">L</button> 
<button type="button" class="btn btn-default">XL</button> 
</div>
<p class="price">
 ￥<span class="text-danger">${ info.goods_price }</span>
</p>
<div class="num">
<button calss="subNum">-</button>
<input type="text" value=1 class="cartNum">
<button calss="subNum">+</button>
</div>

<div>
<button class="btn btn-success addCart">加入购物车</button>
<button class="btn btn-waening continue"><a href="../pages/index.html">继续去购物</button>
</div>
 `)
        $('.goodsDesc').html(info.goods_introduce)
    }
    $('.goodsInfo').on('click', '.addCart', function () {
        const cart = JSON.parse(window.localStorage.getItem('cart')) || [];
        const flag = cart.some(item => item.goods_id === id)
        if (flag) {
            const cart_goods = cart.filter(item => item.goods_id === id)[0]
            cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
        } else {
            info.cart_number = 1
            cart.push(info) //一条信息添加到数组里边、数组里面有很多填信息，一个一个的对象都是每一条信息
        }
        window.localStorage.setItem('cart', JSON.stringify(cart))

    })

    $('.goodsInfo')
        .on('click', '.subNum', function () {
            let num = $('.cartNum').val - 0
            if (num === 1) return
            $('.cartNum').val(num - 1)
        })
        .on('click', '.addNum', function () {
            let num = $('.cartNum').val - 0
            $('.cart').val(num + 1)
        })
})
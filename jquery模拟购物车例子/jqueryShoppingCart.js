/**
 * Created by jessietang on 11/4/2016.
 */
$(function(){
    var products = [
        {
            id: 1,
            name: "pen",
            price: 200
        },
        {
            id:"2",
            name:"book",
            price:30
        },
        {
            id:"3",
            name:"keybord",
            price:40
        },
        {
            id:"4",
            name:"mouth",
            price:50
        },
        {
            id:"5",
            name:"food",
            price:60
        },
        {
            id:"6",
            name:"phone",
            price:70
        }
    ];

    var boughtList = [];

    for(var i in products){
        var proItem = `<div class="col-md-4">
                <h3 class="pro-title">${products[i].name}</h3>
                <h3 class="pro-price">${products[i].price}</h3>
                <button class="btn btn-default add-cart-btn"
                data-id="${products[i].id}" data-price="${products[i].price}" data-name="${products[i].name}">add to cart</button>
            </div>`;
        $('.leftPdp').append(proItem);
    }

    function showCart(boughtList){
        if(boughtList.length > 0){
            for(var i in boughtList){
                var cartItem = `<div class="row cartItem">
                    <div class="col-md-4 pro-cart-name">${boughtList[i].name}</div>
                    <div class="col-md-2 pro-cart-price">${boughtList[i].price}</div>
                    <div class="col-md-4 pro-cart-num">
                        <button class="btn-default btn-sm glyphicon glyphicon-minus substract-btn" data-id="${boughtList[i].id}"></button>
                        <input type="text" value="${boughtList[i].num}"/>
                        <button class="btn btn-default btn-sm glyphicon glyphicon-plus add-btn" data-id="${boughtList[i].id}"></button>
                    </div>
                    <div class="col-md-2 pro-cart-delete">
                        <a class="btn btn-danger delete-btn" data-id="${boughtList[i].id}">delete</a>
                    </div>
                </div>`;
                $('.cartItemContent').append(cartItem);
            }
        }
    }

    function getTotal(boughtList){
        var total = 0;
        for(var i in boughtList){
            total += boughtList[i].num * boughtList[i].price;
        }
        return total;
    }

    $(document).on('click', '.add-cart-btn', function(){
        var nowId = $(this).attr("data-id");
        var nowIdPrice = $(this).attr("data-price");
        var nowIdName = $(this).attr("data-name");
        console.log(nowIdName);
        var flag = false; /*哎哟，这里搞了半天*/
        if(boughtList.length > 0){
            for(var i in boughtList){
                if(boughtList[i].id == nowId){
                    boughtList[i].num += 1;
                    flag = true;
                    break;
                }
            }
        }
        if(!flag){
            var arr = {};
            arr.id = nowId;
            arr.name = nowIdName;
            arr.num = 1;
            arr.price = nowIdPrice;
            boughtList.push(arr);
        }

        $('.cartItemContent').empty();//先清空购物车，再重新渲染整个boughtList
        showCart(boughtList);
        $('.total').text(getTotal(boughtList));
    }).on('click', '.delete-btn', function(){
        var nowId = $(this).attr('data-id');
        for(var i in boughtList){
            if(boughtList[i].id == nowId){
                delete boughtList[i];
                break;
            }
        }
        $('.cartItemContent').empty();//先清空购物车，再重新渲染整个boughtList
        showCart(boughtList);
        $('.total').text(getTotal(boughtList));
    }).on('click','.add-btn', function(){
        var nowId = $(this).attr("data-id");
        for(var i in boughtList){
            if(boughtList[i].id == nowId){
                boughtList[i].num += 1;
                break;
            }
        }
        $('.cartItemContent').empty();//先清空购物车，再重新渲染整个boughtList
        showCart(boughtList);
        $('.total').text(getTotal(boughtList));
    }).on('click','.substract-btn', function(){
        var nowId = $(this).attr("data-id");
        for(var i in boughtList){
            if(boughtList[i].id == nowId){
                boughtList[i].num -= 1;
                break;
            }
        }
        $('.cartItemContent').empty();//先清空购物车，再重新渲染整个boughtList
        showCart(boughtList);
        $('.total').text(getTotal(boughtList));
    });
});
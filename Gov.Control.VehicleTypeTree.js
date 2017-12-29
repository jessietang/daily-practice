	var sel = Gov.Control({
        ctlType: Gov.EnumControl.VehicleTypeTree
    });
    var opt = {
        dbName: "CarType",
        selItems: [{
            name: "所有车辆", children: [
                {
                    name: "重点营运车辆", children: [
                      {
                          name: "两客一危", children: [
                            {
                                name: "三类以上班线客运", children: [
                                    { name: "高速客车", val: 0x1000},
                                    { name: "超长客车", val: 0x0002 },
                                    { name: "三类以上班线客运（除高速，超长）", val: 0x0001 }
                                ]
                            },
                            {
                                name: "旅游包车", children: [
                                    { name: "旅游客车", val: 0x0004 },
                                    { name: "包车客车", val: 0x100000 },
                                ]
                            },
                            {
                                name: "危险品运输车", val: 0x0080
                            },
                          ],
                        
                      },
                       {
                           name: "重货车辆", children: [
                                { name: "重型货物运输车", val: 0x0010 },
                                { name: "半挂牵引车", val: 0x0020 },
                           ]
                       },
                    ]
                },
                {
                    name: "非重点营运车辆", children: [
                         { name: "普通货运", val: 0x8000 },
                         { name: "农村客运", val: 0x2000 },
                         { name: "驾培车", val: 0x10000 },
                         { name: "出租车", val: 0x4000 },
                         { name: "公交车", val: 0x20000 },
                         { name: "租赁客车", val: 2097152 },
                         { name: "校园车辆", val: 0x40000 },
                         { name: "其他车", val: 0x80000 },
                    ]
                }
            ]
        }
            
        ],
        label: "车辆类型",
        width: 400,
        isAllSelect: true,
        isMultiselect: true,
        mustChoose: false,
        setItemClick: function () { },
        isAddItem: false,
        isHidden: false,
        addFun: function () { },
        itemHeight: 0,
        isCondition: false,
    }
    Gov.Class.extend(sel, opt, options);
    var ary = jQuery.extend(true, [], sel.getSelItems());
    var str = [];
    var getStr = [];

    function getNewItems() {
        return ary;
    }
    function getOptionsCss(isChecked) {
        var css = "control-select-single";
        if (sel.getIsMultiselect()) {
            if (isChecked) css += " control-select-checked ";
            else css += " control-select-check ";
        }
        return css;
    }
    function setALLSel(isAll) {
        var items = getNewItems();
        for (var i = 0; i < items.length; i++) {
            items[i].isSelect = isAll;
        }
    }

    function setSelChildVal(li, val) {
        if(!parseInt($(li).attr("val"))){
            var liC = $(li).children("ul").children("li");
            for (var i = 0; i < liC.length; i++) {
                if (!parseInt($(liC[i]).attr("val"))) {
                    setSelChildVal(liC[i],val);
                } else {
                    if ((parseInt($(liC[i]).attr("val"), 10) & val) == parseInt($(liC[i]).attr("val"), 10)) {
                        str.push($(liC[i]).attr("name"))
                        $(liC[i]).children("span").removeClass("control-select-check");
                        $(liC[i]).children("span").addClass("control-select-checked");
                    }
                    var rootUl = Gov.getDomById(sel.getId()).children("ul");
                    setParentStatus(rootUl);
                }
            }
        }
        $(Gov.getDomById(sel.getId())).find("input").val("");
        $(Gov.getDomById(sel.getId())).find("input").val(str.join(","));
    }

    function setSelCVal(val) {
        if (val === -99) {
            Gov.getDomById(sel.getId()).find("li").children("span").addClass("control-select-check");
            Gov.getDomById(sel.getId()).find("li").children("span").removeClass("control-select-checked");
            return;
        }
        var li = $(Gov.getDomById(sel.getId())).children("ul").children("li");
        var str = [];
      
        setSelChildVal(li, val);
        if (sel.getIsCondition()) {
            //if ($("body").attr("id") == "blueSkin") {
            if (Gov.getDomById(sel.getId()).find(".control-select-showtext").val()) {

                Gov.getDomById(sel.getId()).addClass("active") // 输入框里面有内容，label标签文字上浮
            } else {
                Gov.getDomById(sel.getId()).removeClass("active")
            }
            //}
        }
    }
	
	// 返回所有被选中的标签的或运算的结果
    function getSelVal() {
        var retVal = getSelValData();
        return retVal;
    }
	
	// 这个方法好像没有用
    function setSelVal_click(index) {
        var items = getNewItems();
        items[index].isSelect = items[index].isSelect ? false : true;

        if (isClickAll(index)) { // 如果当前点击的是全选
            for (var i = 0; i < items.length; i++) {
                items[i].isSelect = items[items.length - 1].isSelect;
            }
        } else {
            if (!sel.getIsMultiselect()) {
                for (var i = 0; i < items.length; i++) {
                    if (i != index) {
                        items[i].isSelect = false;
                    }
                    else {
                        items[i].isSelect = true;
                    }
                }
            } else {
                if (getIfAllSelected()) {
                    items[items.length - 1].isSelect = true;
                } else {
                    items[items.length - 1].isSelect = false;
                }
            }
        }
    }
	// 未用
    function getIfAllSelected() {
        var items = getNewItems();
        var flag = true;
        for (var i = 0; i < items.length - 1; i++) {
            if (!items[i].isSelect) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    function createChildren(items, html) {
        html.push("<ul>")
        for (var i = 0; i < items.length; i++) {
            var val = items[i].val ? items[i].val : "";
            html.push("<li val='" + val + "' name='" +items[i].name+ "' class='control-select-options' ");
            if (sel.getItemHeight() != 0) {
                html.push(" style='height:" + sel.getItemHeight() + "px;'");
            }
            html.push('><span class="' + getOptionsCss(false) + '" val="' + i + '"></span>');
            html.push(items[i].name);
            //if (items[i].children) {
               
            //    //for (var j = 0; j < items[i].children.length;j++){
            //    //    if (items[i].children[j].children) {
            //    //        html.push("<i class='report-i report-line-select'></i>");
            //    //        break;
            //    //    }
            //    //}
            //}
			// 如果当前元素还有子元素（children）,再次执行 createChildren()，并传入该子元素作为参数
            if (items[i].children) {
                html.push("<i class='report-i report-line-select'></i>");
                createChildren(items[i].children, html);
            }
            
            html.push("</li>");
            //items[i].isSelect = items[i].isSelect ? items[i].isSelect : false; 
        }
        html.push("</ul>")
    }

    function getSelectDiv() {
        var items = getNewItems();
      
        var html = ["<label style='margin-top: 4px;'>" + sel.getLabel() + "：</label>"];
        html.push("<input class='control-select-showtext' type='text' data-type='" + Gov.EnumControl.Select + "' readonly='readonly'></input>");
        html.push("<ul>");
        for (var i = 0; i < items.length; i++) {
            html.push("<li class='control-select-options' ");
            if (sel.getItemHeight() != 0) {
                html.push(" style='height:" + sel.getItemHeight() + "px;'");
            }
            html.push('><span class="' + getOptionsCss(false) + '" val="' + i + '"></span>');
            html.push(items[i].name);
            if (items[i].children) {
                html.push("<i class='report-i report-line-select'></i>");
                createChildren(items[i].children, html)
            }
            html.push("</li>");
            //items[i].isSelect = items[i].isSelect ? items[i].isSelect : false;
           
        }
        if (sel.getIsAddItem()) { // 默认是false, 是否添加可自动输入的选项
            html.push("<li>");
            html.push("<input class='control-select-add' type='text' placeholder='新增项(失去焦点时保存)'/>");
            html.push("</li>");
        }
        html.push("</ul>");
        return html.join("");
    }
    function createHTML() {
        return getSelectDiv();
    }
    function isClickAll(index) {
        if (index == (getNewItems().length - 1) && sel.getIsAllSelect() && sel.getIsMultiselect()) {
            return true;
        }
        return false;
    }
    sel.override_create = Gov.Class.base(createHTML, sel.override_create);
	// 组件渲染完成后添加相应的事件
    sel.override_renderComplete = function () {
        var timer = null;
        Gov.getDomById(sel.getId()).on("click", ".control-select-single", function (evt) { // 给正方形框框添加点击事件
            if ($(this).find('.control-select-add').length > 0) {
                return;
            }
            if (evt.target != this) {
                return;
            }
            var isSelectAll = false;
            var temp = [];
            var ul = $(evt.currentTarget).parent().find("ul");
            if ($(evt.currentTarget).hasClass("control-select-check")) { // 如果，当前点击的这一项是未选中的
                $(evt.currentTarget).removeClass("control-select-check")
                $(evt.currentTarget).addClass("control-select-checked") // 选中当前项
                var nameVal = $(evt.currentTarget).parent().attr("name"); // 当前选中项的名字
                if ($(evt.currentTarget).parent().attr("val")) { // 如果当前选中项有val值，即当前选中项不再有子元素了
					// $.inArray() 函数用于在数组中查找指定值，并返回它的索引值（如果没有找到，则返回-1）
                    if ($.inArray(nameVal, getStr) == -1) { // 当前getStr数组中，没有nameVal这个值
                        getStr.push(nameVal);
                    }
                }
                if (ul.length > 0) { // 当前点击的这一项下面还有子元素
                    var nameVal1 = $(ul).find("li");
                    for (var i = 0; i < nameVal1.length; i++) {
                        if ($(nameVal1[i]).attr("val")) { // 如果是最后一层级，没有子元素了
                            var item = $(nameVal1[i]).attr("name")
                            if ($.inArray(item, getStr) == -1) {
                                getStr.push(item);
                            }
                           
                        }
                    }
					// 把当前项下面的所有子元素（包括儿子、孙子...）都选上
                    $(ul).find("li").find("span").removeClass("control-select-check")
                    $(ul).find("li").find("span").addClass("control-select-checked")
                }
            } else { // 当前点击项是选中的
                $(evt.currentTarget).addClass("control-select-check")
                $(evt.currentTarget).removeClass("control-select-checked") // 取消选中当前项
                if (ul.length > 0) { // 当前点击的这一项下面还有子元素
					// 把当前项下面的所有子元素（包括儿子、孙子...）都取消选中
                    $(ul).find("li").find("span").removeClass("control-select-checked")
                    $(ul).find("li").find("span").addClass("control-select-check")
                    var nameVal3 = $(ul).find("li"); // 当前项下面的所有li元素
                    for (var i = 0; i < nameVal3.length; i++) {
                        var item = $(nameVal3[i]).attr("name");
                        var index = $.inArray(item, getStr);
                        if (index != -1) { 
                            getStr.splice(index, 1); // 从getStr数组中去掉
                        }
                    }
                } else { // 当前点击的这一项下面没有子元素
                    var nameVal2 = $(evt.currentTarget).parent().attr("name");
                    var index = $.inArray(nameVal2, getStr);
                    if (index != -1) {
                        getStr.splice(index, 1); // 从getStr数组中去掉
                    }

                }
            }
            if (!sel.getIsMultiselect()) { // 不是多选
                hidSelectDiv();
            }
            
            
            Gov.getDomById(sel.getId()).find("input").val(getStr.join(",")) // input输入框赋值为当前选中的值
            var rootUl = Gov.getDomById(sel.getId()).children("ul");
            setParentStatus(rootUl); // 设置父元素选中或者不选中的状态
			
            if (sel.getIsCondition()) { // 当前input框是否处于有值选中的状态
                //if ($("body").attr("id") == "blueSkin") {
                if (Gov.getDomById(sel.getId()).find(".control-select-showtext").val()) { // 当前输入框里面有值
                    Gov.getDomById(sel.getId()).addClass("active"); // 给渲染该组件的元素添加active样式 目的是使label标签上移，不在input框内
                } else {
                    Gov.getDomById(sel.getId()).removeClass("active")

                }
                //}
            }
        });
		// 给input框添加点击事件，控制下拉框的显示和隐藏
        Gov.getDomById(sel.getId()).on("click", ".control-select-showtext", function () {

            if (Gov.getDomById(sel.getId() + " ul").css("display") == "block") {
                hidSelectDiv();
            } else {
                showSelectDiv();
            }
        });
		
		// 给三角形枝枝添加点击事件，控制子元素的显示隐藏
        Gov.getDomById(sel.getId()).on("click", ".control-select-options i", function (evt) {
            //阻止事件冒泡
            if (evt.target != this) {
                return;
            }
            var ul = $(this).parent().children("ul");
            if (ul.length > 0) { // 存在子元素
                if ($(ul).css("display") == "block") {
                    $(this).removeClass("report-down")
                    $(ul).hide();
                } else if ($(ul).css("display") == "none") {
                    $(this).addClass("report-down")
                    $(ul).show();
                }
            }
        })
		
		// 给每个Li标签添加dblclick双击事件 （双击控制子元素的展开或者显示）
        Gov.getDomById(sel.getId()).on("dblclick", ".control-select-options", function (evt) {
            //阻止事件冒泡
            clearTimeout(timer);
            if (evt.target != this) {
                return;
            }
            var ul = $(this).children("ul");
            if (ul.length > 0) {
                if ($(ul).css("display") == "block") {
                    $(ul).parent().children("i").removeClass("report-down")
                    $(ul).hide();
                } else if ($(ul).css("display") == "none") {
                    $(ul).parent().children("i").addClass("report-down")
                    $(ul).show();
                }
            }
        })
		
		// 给每个Li标签添加click单击事件 （单击）
        Gov.getDomById(sel.getId()).on("click", ".control-select-options", function (evt) {
          
            if ($(this).find('.control-select-add').length > 0) {
                return;
            }
			// 阻止事件冒泡
            if (evt.target != this) {
                return;
            }
            clearTimeout(timer);
            var obj = evt.currentTarget;
			// 添加一个定时器，防止一直点击出现bug
			timer = window.setTimeout(function () {
                var isSelectAll = false;
                var temp = [];
               //var ul = $(evt.currentTarget).find("ul");
                var ul = $(obj).find("ul");
                if ($(obj).children("span").hasClass("control-select-check")) { // 当前是未选中的，则选中
                    $(obj).children("span").removeClass("control-select-check")
                    $(obj).children("span").addClass("control-select-checked")
                    var nameVal = $(evt.currentTarget).attr("name");
                    if ($(obj).attr("val")) { // 如果是最后一层元素
                        if ($.inArray(nameVal, getStr) == -1) {
                            getStr.push(nameVal);
                        }
                    }
                    if (ul.length > 0) { // 如果还有子元素
                        var nameVal1 = $(ul).find("li"); // 拿到所有的li, 包括儿子、孙子...
                        for (var i = 0; i < nameVal1.length; i++) {
                            if ($(nameVal1[i]).attr("val")) { // 因为input框里面只展示最底层的车辆类型， 所所以这里判断是不是最后一层极元素
                                var item = $(nameVal1[i]).attr("name")
                                if ($.inArray(item, getStr) == -1) {
                                    getStr.push(item);
                                }

                            }
                        }
                        $(ul).find("li").find("span").removeClass("control-select-check")
                        $(ul).find("li").find("span").addClass("control-select-checked") // 选中当前点击元素下面所有的元素
                    }
                } else { // 当前是选中的，
                    $(obj).children("span").addClass("control-select-check")
                    $(obj).children("span").removeClass("control-select-checked") // 取消选中当前项
                    if (ul.length > 0) { // 有子元素
                        $(ul).find("li").find("span").removeClass("control-select-checked") // 所有子元素都取消选中
                        $(ul).find("li").find("span").addClass("control-select-check")
                        var nameVal3 = $(ul).find("li");
                        for (var i = 0; i < nameVal3.length; i++) { // 循环所有子元素，把当前数组里面有的子元素都去掉
                            var item = $(nameVal3[i]).attr("name");
                            var index = $.inArray(item, getStr);
                            if (index != -1) {
                                getStr.splice(index, 1);
                            }
                        }
                    } else { // 没有子元素
                        var nameVal2 = $(evt.currentTarget).attr("name");
                        var index = $.inArray(nameVal2, getStr);
                        if (index != -1) {
                            getStr.splice(index, 1);
                        }

                    }
                }
                if (!sel.getIsMultiselect()) { // 不是多选
                    hidSelectDiv(); // 隐藏下拉列表
                }


                Gov.getDomById(sel.getId()).find("input").val(getStr.join(","))
                var rootUl = Gov.getDomById(sel.getId()).children("ul");
                setParentStatus(rootUl);
                if (sel.getIsCondition()) {
                    //if ($("body").attr("id") == "blueSkin") {
                    if (Gov.getDomById(sel.getId()).find(".control-select-showtext").val()) {
                        Gov.getDomById(sel.getId()).addClass("active")
                    } else {
                        Gov.getDomById(sel.getId()).removeClass("active")

                    }
                    //}
                }
            },300)
        })

		// 点击空白区域关闭下拉列表
        $(document).on('click', function (e) {
            var e = e || window.event; //浏览器兼容性
            var elem = e.target || e.srcElement;

            while (elem) { //循环判断至跟节点，防止点击的是div子元素
                if (elem.id && (elem.id == sel.getId())) { // 如果点击的是div子元素
                    return; // 跳出当前方法
                }
                elem = elem.parentNode; // 到了根节点，elem就不再存在了，就跳出while循环了
            }
            hidSelectDiv(); // 隐藏下拉列表
        });
		
        setShowName(); // 再一次计算 正方形框框的选中或不选中状态 以及input框显示的值

        Gov.getDomById(sel.getId()).on("blur", ".control-select-add", function () {
            if (sel.getIsAddItem()) {
                var newItem = $(this).val();
                if (newItem != '') {
                    opt.addFun(newItem);
                    $(this).val('');
                }
            }
        });
    }
	
	// 根据子元素的勾选状态来设置父元素的勾选状态
    function setParentStatus(obj) {
        var liArr = $(obj).children("li");
        for (var i = 0; i < liArr.length; i++) {
            if (!$(liArr[i]).attr("val")) {
                setParentStatus($(liArr[i]).children("ul"));
                var cLi = $(liArr[i]).children("ul").children("li");
				// 对子元素进行循环判断，只要有一个子元素是没被选中的，那么父元素就不能被选中；否则（子元素都是被选中的），那么父元素就要被选中
                for (var k = 0; k < cLi.length;k++){ 
                    if ($(cLi[k]).children("span").hasClass("control-select-check")) {
                        $(liArr[i]).children("span").addClass("control-select-check");
                        $(liArr[i]).children("span").removeClass("control-select-checked");
                        break; // 跳出当前FOR循环
                    }
                    $(liArr[i]).children("span").removeClass("control-select-check");
                    $(liArr[i]).children("span").addClass("control-select-checked");
                }
            } else {
                var childLi = $(liArr[i]).parent().children("li");
                for (var j = 0; j < childLi.length; j++) {
                    if ($(childLi[j]).children("span").hasClass("control-select-check")) {
                        $(liArr[i]).parent().parent().children("span").addClass("control-select-check");
                        $(liArr[i]).parent().parent().children("span").removeClass("control-select-checked");
                        break;
                    }
                    $(liArr[i]).parent().parent().children("span").removeClass("control-select-check");
                    $(liArr[i]).parent().parent().children("span").addClass("control-select-checked");
                }
            }
            
        }
    }

    sel.getVal = function () {
        return getSelVal();
    }
    sel.setVal = function (val) {
        setSelCVal(val);
    }
    sel.setAll = function () {
        sel.setVal(-1);
    }
    sel.setUnAll = function () {
        sel.setVal(-99);
    }
    sel.clearVal = function () {
        sel.setUnAll();
        str = [];
        Gov.getDomById(sel.getId()).find("input").val("");
    }
	// 验证
    sel.validateItem = function () {
        if (opt.mustChoose) {
            return validateSel();
        } else {
            return true;
        }
    }
    sel.setShow = function () {
        Gov.getDomById(sel.getId()).css("display", "block");
    }
    sel.setHidden = function () {
        Gov.getDomById(sel.getId()).css("display", "none");
    }
    function validateSel() {
        if (sel.getVal() == 0) {
            //Gov.Controls.ObjectArtDialog.msg("请选择值");
            Gov.getDomById(sel.getId()).find("input").css("border", "1px solid red");
            Gov.Controls.ObjectArtDialog.tips("请选择值", sel.getId(), "1000");
            return false;
        }
        return true;
    }

    function setShowNameData(items, dom) {
        for (var i = 0; i < items.length; i++) {
            dom.eq(i).removeClass().addClass(getOptionsCss(items[i].isSelect));
            if (items[i].isSelect) {
                retVal.push(items[i].name);
            }
        }
    }
    function setShowName() {
        var retVal = [];
        var items = getNewItems();
        if (Gov.getDomById(sel.getId()).length == 0) {
            return;
        }
        var dom = Gov.getDomById(sel.getId() + " li > span");
        for (var i = 0; i < items.length; i++) {
            dom.eq(i).removeClass().addClass(getOptionsCss(items[i].isSelect));
            if (items[i].isSelect) {
                retVal.push(items[i].name);
            }
        }
        Gov.getDomById(sel.getId() + " .control-select-showtext").val(retVal.join(","));
        if (sel.getIsCondition()) {
            //if ($("body").attr("id") == "blueSkin") {
            if (Gov.getDomById(sel.getId()).find(".control-select-showtext").val()) {
                
                Gov.getDomById(sel.getId()).addClass("active")
            } else {
                Gov.getDomById(sel.getId()).removeClass("active")
            }
            //}
        }


    }
    function hidSelectDiv() {
        Gov.getDomById(sel.getId() + " ul").css("display", "none");
        Gov.getDomById(sel.getId() + " .control-select-showtext").css("background-image", ""); // input默认有个背景图片 select-up.png
    }
    function showSelectDiv() {
        Gov.getDomById(sel.getId() + " ul").css("display", "block");
        var lis = Gov.getDomById(sel.getId()).find("li");
        var uls = Gov.getDomById(sel.getId()).find("ul");
        for (var j = 0; j < lis.length; j++) {
            if ($(lis[j]).find("ul").length <= 0) {
                $(lis[j]).parent().css("display", "none");
            } 
        }
        for (var i = 0; i < uls.length;i++){
            var dis = $(uls[i]).css("display");
            if (dis == "block") {
                $(uls[i]).parent().children("i").addClass("report-down")
            } else {
                $(uls[i]).parent().children("i").removeClass("report-down")
            }
        }
      
		// 显示下拉框的时候，给input设置select-down.png, 覆盖默认的select-up.png背景图片
        Gov.getDomById(sel.getId() + " .control-select-showtext").css("background-image", "url(/Images/Controls/Select/select-down.png)"); 
    }
    function setSelVal(items, val) {
        for (var i = 0; i < items.length; i++) {
            if (!items[i].children) {
                if ((val & items[i].val) == items[i].val) {
                    items[i].isSelect = true;
                }
                else {
                    items[i].isSelect = false;
                }
            } else {
                setSelVal(items[i], val);
            }
            
        }
    }
    function getMultiAllValData(items, retVal) {
        for (var i = 0; i < items.length; i++) {
            if (!items[i].children) {
                retVal = retVal | items[i].val;
            } else {
                getMultiAllValData(items[i], retVal)
            }
        }
    }
	
	// 获取所有被选中的标签的val值，每个值来做或（|）运算
    function getSelValData() {
        var retVal = 0;
        var lis = Gov.getDomById(sel.getId()).find("li");
        for (var i = 0; i < lis.length;i++){
            if ($(lis[i]).children("span").hasClass("control-select-checked") && $(lis[i]).attr("val")) {
                var val = parseInt($(lis[i]).attr("val"),10);
                retVal = retVal | val;
            }
        }
        return retVal; // 返回所有被选中的标签的或运算的结果
        
    }
    function getMultiAllVal() {
        var isMulti = sel.getIsMultiselect();
        var retVal = 0;
        if (isMulti) {
            var items = getNewItems();
            getMultiAllValData(items,retVal)
            //for (var i = 0; i < items.length; i++) {
            //    retVal = retVal | items[i].val;
            //}
        }
        return retVal;
    }

    sel.refreshByData = function (data) {
        ary = jQuery.extend(true, [], data);
        Gov.getDomById(sel.getId()).html("").html(getSelectDiv());
        setShowName();

    }

    return sel;
}
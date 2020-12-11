$(function () {
    // 1. 按下回车 把完整数据 存储到本地存储里面
    load();
    $("#title").on("keydown", function (event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入内容");
            } else {
                // 先读取本地存储原来的数据，因为getData是个数组，local也是数组了
                var local = getDate();
                // 追加最新的数据
                local.push({
                    title: $(this).val(),
                    done: false
                });
                // 最后存储给本地存储
                saveDate(local);

                // 2. 渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });

    // 3. 删除操作
    $("ol, ul").on("click", "a", function () {
        // 先获取本地存储
        var data = getDate();
        // 修改数据
        var index = $(this).attr("id");
        data.splice(index, 1);
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });

    // 4. 正在进行和已完成选项操作
    $("ol, ul").on("click", "input", function () {
        // 先获取本地存储的数据
        var data = getDate();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });

    // 读取本地存储的数据 
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 渲染加载数据
    function load() {
        // 读取本地存储的数据
        var data = getDate();
        console.log(data);
        // 遍历之前先要清空ol里面的元素内容
        $("ol, ul").empty();
        var todoCount = 0; // 正在进行的个数
        var doneCount = 0; // 已经完成的个数
        // 遍历这个数据
        $.each(data, function (i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked' > <p>" + n.title + "</p > <a href=' ' id=" + i + " ></a ></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox' > <p>" + n.title + "</p > <a href='javascript:;' id=" + i + " ></a ></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})

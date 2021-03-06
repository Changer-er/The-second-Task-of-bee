/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

function addAqiData() {
  var city = document.getElementById("aqi-city-input").value.trim();
  var quality = document.getElementById("aqi-value-input").value.trim();
  if (!city.match(/^[A-za-z/\u4E00-\u9FA5]+$/)) {
    alert("输入的城市必须是中英文字符");
    return;
  }

  if (!quality.match(/^\d+$/)) {
    alert("空气质量指数必须为整数！");
    return;
  }
  aqiData[city] = quality;
}


/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var table = document.getElementById("aqi-table");
  table.innerHTML="";
  for (city in aqiData) {
    if (table.childNodes.length === 0) {
      table.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"
    }
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.innerHTML = city;
    tr.appendChild(td1);
    var td2 = document.createElement("td");
    td2.innerHTML = aqiData[city];
    tr.appendChild(td2);
    var td3 = document.createElement("td");
    var btn = document.createElement("button");
    btn.setAttribute("class", "del")
    btn.innerHTML = "删除";
    td3.appendChild(btn);
    tr.appendChild(td3);
    table.appendChild(tr);
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(t) {
  // do sth.
  var tr = t.parentElement.parentElement;   //"tr"
  var City=tr.children[0].innerHTML;    //获取第一个子元素的值
  delete aqiData[City];
  renderAqiList();
}

function init() {
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var btn_add = document.getElementById("add-btn");
  btn_add.onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var table = document.getElementById("aqi-table");
  table.addEventListener("click", function (e) {
    if (e.target && e.target.nodeName === "BUTTON") {
      delBtnHandle(e.target);
    }
  })
}

init();
export function setCookie(c_name, n_value, expiredays) {
  var exdate = new Date();
  //  exdate.setTime(exdate.getTime() + expiredays*24*60*60*1000);  // 按天
  exdate.setTime(exdate.getTime() + expiredays * 60 * 60 * 1000); // 按小时
  document.cookie =
    c_name +
    "=" +
    escape(n_value) +
    ";path=/" +
    (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
}

export function getCookieValue(cookieName) {
  var cookieValue = document.cookie;
  var cookieStartAt = cookieValue.indexOf("" + cookieName + "=");
  if (cookieStartAt == -1) {
    cookieStartAt = cookieValue.indexOf(cookieName + "=");
  }
  if (cookieStartAt == -1) {
    cookieValue = null;
  } else {
    cookieStartAt = cookieValue.indexOf("=", cookieStartAt) + 1;
    var cookieEndAt = cookieValue.indexOf(";", cookieStartAt);
    if (cookieEndAt == -1) {
      cookieEndAt = cookieValue.length;
    }
    cookieValue = unescape(cookieValue.substring(cookieStartAt, cookieEndAt)); //解码latin-1
  }
  return cookieValue;
}

export function delCookie(name) {
  console.log(name);
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookieValue(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

export function Editor(input, preview) {
  this.update = function () {
    console.log(qt_type);
      preview.innerHTML = markdown.toHTML(input.value);
      markAnswer(qt_type);
      changeSize();
  };
  input.editor = this;
}


 // 标记答案
export function markAnswer(type) {
  console.log(type);
      var list = ['A','B','C','D','E','F','G','H'];
      if(type=="1"||type=="2"){
          $(".question").each(function (index, element) {
              var answer = $(this).find(".qt_answer").addClass("hidden").text().replace(/^答案[:：]/,"").toUpperCase();
              for (var i = 0; i < list.length; i++) {
                  if(answer.search(list[i])!=-1){
                      $(this).find(".key_"+list[i]+" .checkOrRadio").prop("checked",true);
                  }
              }
          });
      }
  }
  //当题号过长时改变字号
export function changeSize() {
      $(".question .qt_title .title").each(function(index, element) {
          var $numWords = $(this).text().length;
          if($numWords==4){
              $(this).css({"font-size":"20px"});
          }else if ($numWords==5) {
              $(this).css({"font-size":"16px"});
          }else if ($numWords>5) {
              $(this).css({"font-size":"14px"});
          }
      });
  }
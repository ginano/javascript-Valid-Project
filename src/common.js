var isDebug=/debug/i.test(window.location.hash);
(function log(window){
	var loginfos=[],
		_log=function(str){
			var html, ol; //是否开启debug模式仅仅在控制台显示
			if (isDebug && typeof console !== 'undefined' && console.log) {
				console.log(str);
			}
			else {
				html = document.getElementById('logging');
				//alert(html);
				if (!html) {
					html = document.createElement('div');
					html.setAttribute('id', 'logging');
					html.innerHTML = '<h3>Debug Results:</h3><ol id="debug-list"></ol>';
					document.body.appendChild(html);
				}
				ol = document.getElementById('debug-list');
				ol.innerHTML = ol.innerHTML + '<li>' + str + '</li>';
				
			}
			loginfos.push(str);
		},
		_getLog=function(index){
			if(typeof loginfos[index]!==undefined){
				return loginfos[index];
			}else{
				return '';
			}
		};
	window.log=_log;
	window.getLog=_getLog;
})(window);
window.onload=function(){
	var init={
		done:function(){
			this.showSource();
			this.declare(); //最后才免责声明
		},
		declare:function(){
			var html=document.createElement('div');
			html.setAttribute('id','declare');
			html.innerHTML='<h3>免责声明：</h3>\
							本系列相关案例都来源于互联网大牛们，只是兴趣验证一下解惑而已。如果有任何不妥，请及时联系我微博<a href="http://weibo.com/ginano" target="_blank">http://weibo.com/ginano</a><br/>\
							目前主要来源：汤姆大叔的博客http://www.cnblogs.com/TomXu/';
			document.body.appendChild(html);
		},
		showSource:function(){
			var sourceCode=document.getElementById('script-source-code').innerHTML,
				html=document.createElement('div'),
				_html=[],
				arr,i,len,j=0;
			html.setAttribute('id','script-source-show');
			_html.push('<h3>Source Code：</h3>');
			//目前提供debug信息独立以及debug信息和源代码混合在一起的功能
			
			_html.push('<ol class="source-list">')
			arr=sourceCode.split('\n');
			for(i=0,len=arr.length;i<len;i++){
				arr[i]='<li>'+arr[i].replace(/\s/g,'&nbsp;');
				//这个方法不一定准确，还有待提高好好想想
				if(isDebug&&/\s*log\(/.test(arr[i])){
					arr[i]+='<span class="debug-result-item">//'+getLog(j)+'</span>';
					j++;
				}
				arr[i]+='</li>';
			}
			_html.push(arr.join(''));
			_html.push('</ol>');
			html.innerHTML=_html.join('');				
			document.body.appendChild(html);
			
		}
	};
	
	init.done();
}

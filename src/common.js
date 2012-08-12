var isDebug=/debug/i.test(window.location.hash),
	Menus=[
		{
			'url':'function_declare.html',
			'name':'函数声明与函数表达式',
			'title':'测试函数声明与表达式的一些基本特征'
		},
		{
			'url':'global_var_delete.html',
			'name':'全局变量的声明和未声明的区别',
			'title':'全局变量的声明和未声明的区别'
		}
	];
(function(window){
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
		},
		/**
		 * 去除子元素影响
		 * @param {Object} fun
		 */
		_withinEl=function(fun){
			return function(e){
				var parent=e.relatedTarget;//上一次相应mouseover/out的元素
				while(parent!=this&&parent){
					try{
						parent=parent.parentNode;
					}catch(e){
						break;
					}
				}
				if(parent!=this){
					fun(e);
				}
			};
		},
		_addEvent=function(el,event,fun){
			if(el.attachEvent){
				el.attachEvent('on'+event,fun);
			}else if(el.addEventListener){
				switch(event){
					case 'mouseenter':
						el.addEventListener('mouseover',_withinEl(fun),false);
						break;
					case 'mouseleave':
						el.addEventListener('mouseout',_withinEl(fun),false);
						break;
					default:
						el.addEventListener(event,fun,false);
						break;
				}
				
			}else{
				el['on'+event]=fun;
			}
			
		},
		_removeEvent=function(el,event,fun){
			if(el.removeEventListener){
				switch(event){
					case 'mouseenter':
						event='mouseover';
						break;
					case 'mouseleave':
						event='mouseout';
						break;
					default:
						break; 
				}
				el.removeEventListener(event,fun,false);
			}else if(el.detachEvent){
				el.detachEvent('on'+event,fun);
			}else{
				el['on'+event]=null;
			}
		};
	window.log=_log;
	window.getLog=_getLog;
	window.addEvent=_addEvent;
	window.removeEvent=_removeEvent;
})(window);
window.onload=function(){
	var init={
		done:function(){
			this.showSource();
			this.declare(); //最后才免责声明
			this.showMenu();//菜单显示
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
			
		},
		showMenu:function(){
			var html=document.createElement('div'),
				i,len,temp,_html=[],cls='',
				menuList,
				arrow,
				url=location.href;
			html.setAttribute('id','testcase-menus');
			_html.push('<ul id="menu-list" class="menu-list">');
			for(i=0,len=Menus.length;i<len;i++){
				temp=Menus[i];
				if(url.indexOf(temp['url'])>-1){
					cls='current';
				}else{
					cls='';
				}
				_html.push('<li><a class=" '+cls+' " href="'+temp['url']+'" title="'+temp['title']+'">'+temp['name']+'</a></li>');
			}
			_html.push('</ul>');
			_html.push('<div id="menu-key" class="menu-key">>></div>');
			html.innerHTML=_html.join('');
			document.body.appendChild(html);
			menuList=document.getElementById('menu-list');
			arrow=document.getElementById('menu-key');
			//bindevent
			addEvent(html,'mouseenter',function(e){
				menuList.style.width='220px';
				arrow.innerHTML='<<';
			});
			addEvent(html,'mouseleave',function(){
				menuList.style.width='0px';
				arrow.innerHTML='>>';
			});
		}
	};
	
	init.done();
}

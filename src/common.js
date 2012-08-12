var isDebug=/debug/i.test(window.location.hash),
	Menus=[
		{
			'url':'function_declare.html',
			'name':'���������뺯�����ʽ',
			'title':'���Ժ�����������ʽ��һЩ��������'
		},
		{
			'url':'global_var_delete.html',
			'name':'ȫ�ֱ�����������δ����������',
			'title':'ȫ�ֱ�����������δ����������'
		}
	];
(function(window){
	var loginfos=[],
		_log=function(str){
			var html, ol; //�Ƿ���debugģʽ�����ڿ���̨��ʾ
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
		 * ȥ����Ԫ��Ӱ��
		 * @param {Object} fun
		 */
		_withinEl=function(fun){
			return function(e){
				var parent=e.relatedTarget;//��һ����Ӧmouseover/out��Ԫ��
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
			this.declare(); //������������
			this.showMenu();//�˵���ʾ
		},
		declare:function(){
			var html=document.createElement('div');
			html.setAttribute('id','declare');
			html.innerHTML='<h3>����������</h3>\
							��ϵ����ذ�������Դ�ڻ�������ţ�ǣ�ֻ����Ȥ��֤һ�½����ѡ�������κβ��ף��뼰ʱ��ϵ��΢��<a href="http://weibo.com/ginano" target="_blank">http://weibo.com/ginano</a><br/>\
							Ŀǰ��Ҫ��Դ����ķ����Ĳ���http://www.cnblogs.com/TomXu/';
			document.body.appendChild(html);
		},
		showSource:function(){
			var sourceCode=document.getElementById('script-source-code').innerHTML,
				html=document.createElement('div'),
				_html=[],
				arr,i,len,j=0;
			html.setAttribute('id','script-source-show');
			_html.push('<h3>Source Code��</h3>');
			//Ŀǰ�ṩdebug��Ϣ�����Լ�debug��Ϣ��Դ��������һ��Ĺ���
			
			_html.push('<ol class="source-list">')
			arr=sourceCode.split('\n');
			for(i=0,len=arr.length;i<len;i++){
				arr[i]='<li>'+arr[i].replace(/\s/g,'&nbsp;');
				//���������һ��׼ȷ�����д���ߺú�����
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

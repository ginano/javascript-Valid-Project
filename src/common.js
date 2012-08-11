var isDebug=/debug/i.test(window.location.hash);
(function log(window){
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
		};
	window.log=_log;
	window.getLog=_getLog;
})(window);
window.onload=function(){
	var init={
		done:function(){
			this.showSource();
			this.declare(); //������������
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
			
		}
	};
	
	init.done();
}

var hiv = {
	seq: function(target, v) {
		target.eSeq.textContent = v || '';
	},
	actionName: function(target, v) {
		target.eActionName.textContent = v || '';
	},
	actionStatus: function(target, v) {
		var text;
		text = v === '0' ? 
					'进行中' : 
					v === '1' ?
						'成功' :
						v === '-1' ?
							'失败' : '未知';

		target.eActionResult.textContent = text;

		// 样式也要相应的修改
		switch(v) {
			case '1':
				target.eActionResult.classList.add('success');
				break;
			case '-1':
				target.eActionResult.classList.add('failed');
				break;
		}

	},
	ps: function(target, v) {
		target.ePs.textContent = v || '';
	}
}

// # scb(historyItemVisual)
// historyItemVisual:
// eLine, eActionItem, eSeq, eActionName, eActionResult, ePs
function HistoryItemVisual(scb) {
	scb = scb || function(){};

	var lineDiv = element('div', 'line'),
		actionItemDiv = element('div', 'action-item'),
		seqSpan = element('span', 'seq'),
		actionNameSpan = element('span', 'action-name'),
		actionResultSpan = element('span', 'action-result'),
		psSpan = element('span', 'ps');

	lineDiv.appendChild(actionItemDiv);
	actionItemDiv.appendChild(seqSpan);
	actionItemDiv.appendChild(actionNameSpan);
	actionItemDiv.appendChild(actionResultSpan);
	actionItemDiv.appendChild(psSpan);

	var result = {
		eLine: lineDiv,
		eActionItem: actionItemDiv,
		eSeq: seqSpan,
		eActionName: actionNameSpan,
		eActionResult: actionResultSpan,
		ePs: psSpan
	};

	scb(result);

	function element(name, classAttr) {
		var e = document.createElement(name);
		e.setAttribute('class', classAttr);
		return e;
	}
}
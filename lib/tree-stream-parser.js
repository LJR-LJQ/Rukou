exports.parse = parse;

// 输入字符串定义
// [Input]			=	[Node]*
// [Node]			=	[ParentId]"\"[CurrentId]<SP>[ContentLength]<CR><LF>[Content]<CR><LF>
// [ParentId]		=	[^\\]+
// [CurrentId]		=	[^\\]+
// [ContentLength]	=	[\d]+
// [Content]		=	<any character>*

// 输出对象定义
// <Node-Obj-List>	=	[<Node-Obj>, <Node-Obj>, ...]
// <Node-Obj>		=	{id: '...', text: '...', children: [<Node-Obj>, <Node-Obj>, ...]}

// 注意：
// 如果 Input 为空字符串（长度为零的字符串），那么输出为 [] 空数组


// scb 是什么？
// scb => Success Callback
// 也就是只有当处理过程顺利完成（没有错误发生）时调用的回调函数
// 在这个函数里传递处理成功后的结果给上层调用者
// 如果发生了错误，例如输入字符串非法、格式错误、或者其他问题
// 是一定不会调用 scb 的

// scb 是一种乐观编程模式，可以增强程序稳定性、减少代码量
// 相关的细节我们以后再讨论

// # scb(result:<Node-Obj-List>)
function parse(input, scb) {
	// TODO

	// [变量]
	var lines,
		nodeList,
		node,
		tree,
		stack;

	// [流程]
	nodeList = new Array();
	tree = new Array();
	stack = new Array();

	// 按换行符分行
	lines = toLines(input);

	// 将每两行合并为一个node
	for(var i = 0; i < lines.length; i += 2) {
		nodeList.push(parseLine(lines[i], lines[i + 1]));
	}

 	// 将“没有父节点的节点”从nodeList中删除，并添加到tree中
	for(var key in nodeList){
		if(nodeList[key].parentId == '') {
			node = nodeList.splice(key, 1)[0];
			tree.push(node); // 作为结果集返回
			stack.push(node); // 作为栈，下一步将对其进行操作
		}
	}

	// 对tree进行深度优先遍历，为每个节点从nodeList中寻找children
	while(stack.length > 0) {
		node = stack.pop();
		for(var key in nodeList){
			if(node.id == nodeList[key].parentId) {
				node.children.push(nodeList[key]);
				stack.push(nodeList.splice(key, 1)[0]);
			}
		}
	}


	console.log(tree);
	console.log(tree[0].children);
	scb(tree);

	// [函数]
	function toLines(inputStr) {
		var lines = inputStr.split('\r\n');
		// 删除所有空白的行
		lines = lines.filter(function(line) {
			return !isEmptyLine(line);
		});
		return lines;

		function isEmptyLine(line) {
			if (!line) return true;
			for (var i = 0, len = line.length; i < len; ++i) {
				if (!isWhiteSpace(line[i])) {
					return false;
				}
			}
			return true;
		}
	}

	function isWhiteSpace(c) {
		return c === ' ' || c === '	';
	}

	function parseLine(line1, line2) {
		// [变量]
		var node,
			index,
			id,
			text,
			parentId;

		// [流程]
		index = line1.indexOf('\\');
		parentId = line1.substring(0, index);
		id = line1.substring(index + 1, line1.lastIndexOf(' '));
		text = line2
		node = createNode(id, text, parentId);

		return node;
	}

	function createNode(id, text, parentId) {
		return {id: id, text: text, children: [], parentId: parentId};
	}
}

parse('1\\2 101\r\ntext1\r\n\\1 102\r\ntext2\r\n', function(node){});
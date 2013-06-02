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
	tree = new Array();
	stack = new Array();
	nodeList = toNodes(input);

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
	if (typeof scb !== 'function') return;
	try {
		scb(tree);
	} catch(err) {

	}

	// [函数]
	function toNodes(inputStr) {
		// [变量]
		var nodeList,
			indexOfSprit,
			indexOfSpace,
			indexOfBreak,
			id,
			parentId,
			length,
			text;

		// [流程]
		nodeList = new Array();
		while(inputStr.length > 0) {
			indexOfSprit = inputStr.indexOf('\\');
			indexOfSpace = inputStr.indexOf(' ');
			indexOfBreak = inputStr.indexOf('\r\n');
			parentId = inputStr.substring(0, indexOfSprit);
			id = inputStr.substring(indexOfSprit + 1, indexOfSpace);
			length = parseInt(inputStr.substring(indexOfSpace + 1, indexOfBreak));
			text = inputStr.substring(indexOfBreak + 2, indexOfBreak + 2 + length);
			nodeList.push(createNode(id, text, parentId));

			inputStr = inputStr.substring(indexOfBreak + 2 + length + 2);
		}

		return nodeList;
	}

	function createNode(id, text, parentId) {
		return {id: id, text: text, children: [], parentId: parentId};
	}
}

// [测试]
parse('1\\2 5\r\ntext1\r\n\\1 5\r\ntext2\r\n', function(node){});
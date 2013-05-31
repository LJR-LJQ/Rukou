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
}
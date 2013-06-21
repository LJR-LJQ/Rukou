function animationShow(element) {
	element.classList.add('ani-hide');
	setTimeout(function(){
		element.classList.add('ani-show');
	}, 0);
}
function News(id, title, content, userId) {
	this.id = id || null;
	this.title = title || null;
	this.content = content || null;
	this.userId = userId || null;
}


module.exports = News;

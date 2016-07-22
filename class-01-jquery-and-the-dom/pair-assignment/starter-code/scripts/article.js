var articles = [];

function Article (opts) {
    this.title = opts.title;
    this.category = opts.category;
    this.authorUrl = opts.authorUrl;
    this.publishedOn = opts.publishedOn;
    this.body = opts.body;
    this.author = opts.author;

    //constructor takes one argument - opts, basically translating the blog article objects into the constructor. Iterating over each one.
}

Article.prototype.toHtml = function() {
    var $newArticle = $('article.template').clone();

    $newArticle.attr('data-category', this.category);

    // Add title
    $newArticle.find('h1').html(this.title);

    // Add author & url
    $newArticle.find('address > a').html(this.author);
    $newArticle.find('address > a').attr('href', this.authorUrl);

    // add body
    $newArticle.find('.article-body').html(this.body);

    // Include the publication date as a 'title' attribute to show on hover:
    $newArticle.find('time[pubdate]').attr('title', this.publishedOn);

    // Display the date as a relative number of "days ago":
    $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

    $newArticle.append('<hr>');

    // remove template class
    $newArticle.removeClass('template');

    return $newArticle;
    //we are returning it here
}
//rawData.sort sorts stuff. It's giving you some flexibility on how you want something sorted. A callback is a function as an argument. It's expecting two parameters. We are just doing math. We are comparing the two. .sort is an interation tool. .sort is just an array method.
rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});
//Another array method that has another call back. For the length of this array, do something with this element. articles.push pushes that object into the articles array.
rawData.forEach(function(ele) {
    articles.push(new Article(ele));
})
//for every new article object, we are runnning an append method.
articles.forEach(function(a){
    $('#articles').append(a.toHtml())
});

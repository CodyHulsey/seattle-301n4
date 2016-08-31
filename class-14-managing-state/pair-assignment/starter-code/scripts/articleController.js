(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    articleView.index(ctx.articles);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // ANSWER: This method loads articles with a certain ID. The first thing that happens is that we are calling Article.findWhere which is finding all articles that match a certain id that gets passed into the ctx.params.id, and then it's call articleData. This is assigning the results of that SQL query to the ctx.articles property. Then it's call next() which is articlesController.index. THEN articleView.index renders ctx.articles to the page.

  articlesController.loadById = function(ctx, next) {
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // ANSWER: This is essentially doing the same thing as the above method, but the article.findWhere is finding the articles by a specific author, then grabbing that data and replacing all instances of '+' with ' '. Then it's calling authorData as the callback article.findWhere which is assigning those articles to the ctx.articles property. Then it's calling next() which is linked to articleView.index and rendering that data to the page.
  articlesController.loadByAuthor = function(ctx, next) {
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  //ANSWER: Similar to the above method, but we are focusing solely on categories. We are first starting with the article.findWhere method and finding articles within a certain category, then grabbing the data associated with that particular category, then its calling categoryData as the callback article.findWhere which is assiging those articles to the ctx.articles property Then it's calling next() which is linked to articleView.index and rendering the articles associated with that particular category.
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  // ANSWER: The first step is that this method checks to see if Article.all has a length. If they exist then it's assigning those articles them to ctx.articles property. Then calling articleView.index and rendering all articles to the page. If Article.all is empty, then we are calling fetchAll which will grab all data from the SQL database, then it will call articleData, and then assign it to ctx.articles. Then next() is called and triggers articlesView.index which renders the articles to the page. 
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);

(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[0],{175:function(e,t,a){},176:function(e,t,a){},80:function(e,t,a){e.exports=a(81)},81:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(47),o=a.n(r),s=a(3),c=a.n(s),l=a(79),m=a.n(l);a(175),a(176);new m.a({boxClass:"wow",animateClass:"animated",offset:0,live:!0}).init(),c()((function(){var e=c()('a[href="#about"]'),t=c()('a[href="#projects"]'),a=c()('a[href="#contact"]'),n=0,r=0;function s(e){var t=e.listItems.map((function(e){return i.a.createElement("li",{key:e},e)}));return i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"container wow","data-wow-duration":"2s"},i.a.createElement("div",{className:"col-xs-12 col-sm-12 col-md-6 desc vcenter"},i.a.createElement("h1",null,e.title),i.a.createElement("h2",null,e.date),i.a.createElement("p",null,e.desc),i.a.createElement("ul",{className:"tags"},t),i.a.createElement("a",{href:e.href},i.a.createElement("i",{className:"fa fa-lg fa-github"}),"source code")),i.a.createElement("div",{className:"col-xs-12 col-sm-12 col-md-6 imgDiv vcenter"},i.a.createElement("img",{src:e.image,alt:e.alt}))))}function l(e){return i.a.createElement("div",{className:"col-xs-6 col-sm-6 col-md-4"},i.a.createElement("img",{src:e.image,alt:e.alt}),i.a.createElement("span",null,e.name))}function m(){return i.a.createElement("div",null,i.a.createElement(s,{title:"Custom WordPress Plugin Development",date:"December 2018 - April 2019",desc:"A plugin for various functionality across an eCommerce website, including browsing based on tags and recommending similar items.\r Implemented with prepared statements and HTML escaping to prevent introducing any vulnerabilities to the site.",listItems:["PHP","CSS","JavaScript"]}),i.a.createElement(s,{title:"StreamSurfer",date:"January 2017 - May 2017",desc:"A search engine to find sources to stream movies and TV shows.\r Also acts as a database containing information on shows or movies similar to IMDb and user lists.",listItems:["C#","PostgreSQL",".NET Core","REST","MVC"],href:"https://github.com/jackw117/stream-surfer",image:"img/ss-home.png",alt:"StreamSurfer home image"}),i.a.createElement(s,{title:"StreamSurfer Mobile",date:"February 2017 - March 2017",desc:"An Android application for StreamSurfer.\r The only added feature on the mobile app is the option to have notifications sent when a show on a user list is updated.",listItems:["Android","Java","MVC"],href:"https://github.com/jackw117/stream-surfer-android",image:"img/ssa.png",alt:"StreamSurfer Mobile search image"}),i.a.createElement(s,{title:"QuizDroid",date:"January 2017 - February 2017",desc:"An Android application that uses an online JSON file to generate quizzes.\r Quiz information is stored in a singleton repository for easy access throughout the app.",listItems:["Android","Java","MVC"],href:"https://github.com/jackw117/quizdroid",image:"img/qd.png",alt:"QuizDroid home screen"}),i.a.createElement(s,{title:"CNN Wikipedia Search",date:"April 2016 - June 2016",desc:"A search engine for CNN articles with autocomplete suggestions that appear while a user types.\r Autocomplete information is taken from a list of every Wikipedia page title, and stored in a trie data structure for fast suggestions as a user types.",listItems:["C#","ASP.NET","Azure","jQuery","Web Crawling"],href:"https://github.com/jackw117/344-assignment-4",image:"img/cnnw.png",alt:"CNN Wikipedia Search home image"}),i.a.createElement(s,{title:"ADP Trivia",date:"November 2015 - December 2015",desc:"A website for members of the University of Washington Anime Discovery Project (ADP) to answer trivia questions.\r Information is displayed back to every user in real time.",listItems:["AngularJS","Firebase"],href:"https://github.com/jackw117/activity-answer-button",image:"img/adp.png",alt:"ADP Trivia home image"}))}function g(){return i.a.createElement("div",null,i.a.createElement(l,{image:"img/icons/cs.png",alt:"C# icon",name:"C#"}),i.a.createElement(l,{image:"img/icons/asp.png",alt:"ASP.NET icon",name:"ASP.NET"}),i.a.createElement(l,{image:"img/icons/netfoundation.png",alt:".NET Core icon",name:".NET Core"}),i.a.createElement(l,{image:"img/icons/java.png",alt:"Java icon",name:"Java"}),i.a.createElement(l,{image:"img/icons/js.png",alt:"JavaScript icon",name:"JavaScript"}),i.a.createElement(l,{image:"img/icons/jquery.png",alt:"jQuery icon",name:"jQuery"}),i.a.createElement(l,{image:"img/icons/reactjs.png",alt:"React icon",name:"React"}),i.a.createElement(l,{image:"img/icons/angularjs.png",alt:"AngularJS icon",name:"AngularJS"}),i.a.createElement(l,{image:"img/icons/html5.png",alt:"HTML icon",name:"HTML"}),i.a.createElement(l,{image:"img/icons/css3.png",alt:"CSS icon",name:"CSS"}),i.a.createElement(l,{image:"img/icons/sqlserver.png",alt:"SQL Server icon",name:"SQL Server"}),i.a.createElement(l,{image:"img/icons/nosql.png",alt:"NoSQL icon",name:"NoSQL"}),i.a.createElement(l,{image:"img/icons/postgresql.png",alt:"PostgreSQL icon",name:"PostgreSQL"}),i.a.createElement(l,{image:"img/icons/azure.png",alt:"Azure icon",name:"Azure"}),i.a.createElement(l,{image:"img/icons/aws.png",alt:"AWS icon",name:"AWS"}))}function u(){c()(document).ready((function(){d(),c()(".imgDiv").each((function(e){c()(window).width()<=974?(e%2===1&&c()(this).insertAfter(c()(this).closest(".container").children(".desc")),c()(this).css("margin-top","35px")):(e%2===1?(c()(this).closest(".container").addClass("fadeInRight"),c()(this).insertBefore(c()(this).closest(".container").children(".desc"))):c()(this).closest(".container").addClass("fadeInLeft"),c()(this).css("margin-top","0px"))})),f()}))}function d(){n=c()("#projects").offset().top,r=c()("#contact").offset().top}function f(){var i=c()(document).scrollTop();i>=0&&i<n-50?(e.css("color","#fff"),t.css("color","#ccc"),a.css("color","#ccc")):i>=n-50&&i<r-50&&(e.css("color","#ccc"),t.css("color","#fff"),a.css("color","#ccc")),i+c()(window).height()>c()(document).height()-c()("#contact").outerHeight()&&(e.css("color","#ccc"),t.css("color","#ccc"),a.css("color","#fff"))}o.a.render(i.a.createElement(m,null),document.getElementById("projects"),u()),o.a.render(i.a.createElement(g,null),document.getElementById("skillsContent")),c()(window).on("load",(function(){d()})),c()(document).on("click",".navlink",(function(e){e.preventDefault();var t=c()(c.a.attr(this,"href"));c()("html, body").animate({scrollTop:t.offset().top},500,(function(){f()}))})),c()(document).scroll((function(){f()})),c()(window).on("resize",(function(){u()}))}))}},[[80,1,2]]]);
//# sourceMappingURL=main.15a524c8.chunk.js.map
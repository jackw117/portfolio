(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[0],{175:function(e,t,a){},176:function(e,t,a){},80:function(e,t,a){e.exports=a(81)},81:function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),s=a(47),r=a.n(s),o=a(3),c=a.n(o),l=a(79),m=a.n(l);a(175),a(176);new m.a({boxClass:"wow",animateClass:"animated",offset:0,live:!0}).init(),c()((function(){var e=c()('a[href="#about"]'),t=c()('a[href="#projects"]'),a=c()('a[href="#contact"]'),n=0,s=0;function o(e){var t,a=e.listItems.map((function(e){return i.a.createElement("li",{key:e},e)}));return t=null!=e.href?i.a.createElement("a",{href:e.href},i.a.createElement("i",{className:"fa fa-lg fa-github"}),"source code"):i.a.createElement("p",null,"source code unavailable"),i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"container wow","data-wow-duration":"2s"},i.a.createElement("div",{className:"col-xs-12 col-sm-12 col-md-6 desc vcenter"},i.a.createElement("h1",null,e.title),i.a.createElement("h2",null,e.date),i.a.createElement("p",null,e.desc),i.a.createElement("ul",{className:"tags"},a),t),i.a.createElement("div",{className:"col-xs-12 col-sm-12 col-md-6 imgDiv vcenter"},i.a.createElement("img",{src:e.image,alt:e.alt}))))}function l(e){return i.a.createElement("div",{className:"col-xs-6 col-sm-6 col-md-4"},i.a.createElement("img",{src:e.image,alt:e.alt}),i.a.createElement("span",null,e.name))}function m(){return i.a.createElement("div",null,i.a.createElement(o,{title:"MMO Goal Tracker",date:"July 2020 - Current",desc:"A desktop app where users can create and edit goals, and set timers for recurring events in an online video game. Utilizes a SQLite database to allow for dependencies between goals, with checks and prepared statements to validate data. (Design not final)",listItems:["Electron","React","jQuery","SQL"],href:"https://github.com/jackw117/rs-tracker",image:"img/tracker.PNG",alt:"RuneScape Goal Tracker image"}),i.a.createElement(o,{title:"Haskell Battleship",date:"July 2020 - August 2020",desc:"A text-based game of battleship to be played against a computer opponent that makes educated guesses on where to fire. Developed as a REPL with a custom parser and interpreter to evaluate user input.",listItems:["Haskell","REPL"],href:"https://github.com/jackw117/haskell-battleship",image:"img/battleship.PNG",alt:"Haskell Battleship image"}),i.a.createElement(o,{title:"Distributed Memory Histogram Sort",date:"April 2020 - May 2020",desc:"Implemented a histogram sorting algorithm that splits data between processors so that each processor has a near equal amount of elements in sorted order. Developed with a focus on speed and efficiency using a mixture of MPI to split the task between multiple processors and OpenMP to further split up the task on each processor into multiple threads.",listItems:["C++","OpenMP","MPI","Parallel Programming"],image:"img/parallel.png",alt:"Parallel image"}),i.a.createElement(o,{title:"Custom WordPress Plugin Development",date:"January 2019 - March 2019",desc:"A plugin for various functionality across an eCommerce website, including browsing based on tags and recommending similar items. Implemented with prepared statements and HTML escaping to prevent introducing any vulnerabilities to the site.",listItems:["PHP","CSS","JavaScript"],image:"img/wpplugin.jpg",alt:"WordPress image"}),i.a.createElement(o,{title:"StreamSurfer",date:"January 2017 - May 2017",desc:"An innovative search engine to find sources to stream movies and TV shows, with options to browse by categories, search for an entry, view details of the entry, and keep user accounts with custom lists. Developed as a website with a responsive mobile view, as well as an Android app.",listItems:["C#","PostgreSQL",".NET Core","MVC","Android","Java"],href:"https://github.com/jackw117/stream-surfer",image:"img/ss-home.png",alt:"StreamSurfer home image"}),i.a.createElement(o,{title:"QuizDroid",date:"January 2017 - February 2017",desc:"An Android application that uses an online JSON file to generate quizzes. Quiz information is stored in a singleton repository for easy access throughout the app.",listItems:["Android","Java","MVC"],href:"https://github.com/jackw117/quizdroid",image:"img/qd.png",alt:"QuizDroid home screen"}),i.a.createElement(o,{title:"CNN Wikipedia Search",date:"April 2016 - June 2016",desc:"A search engine for CNN articles with autocomplete suggestions that appear while a user types. Autocomplete information is taken from a list of every Wikipedia page title, and stored in a trie data structure for fast suggestions as a user types.",listItems:["C#","ASP.NET","Azure","jQuery","Web Crawling"],href:"https://github.com/jackw117/344-assignment-4",image:"img/cnnw.png",alt:"CNN Wikipedia Search home image"}),i.a.createElement(o,{title:"ADP Trivia",date:"November 2015 - December 2015",desc:"A website for members of the University of Washington Anime Discovery Project (ADP) to answer trivia questions. Information is displayed back to every user in real time.",listItems:["AngularJS","Firebase"],href:"https://github.com/jackw117/activity-answer-button",image:"img/adp.png",alt:"ADP Trivia home image"}))}function u(){return i.a.createElement("div",null,i.a.createElement(l,{image:"img/icons/cs.png",alt:"C# icon",name:"C#"}),i.a.createElement(l,{image:"img/icons/netfoundation.png",alt:".NET Core icon",name:".NET Core"}),i.a.createElement(l,{image:"img/icons/java.png",alt:"Java icon",name:"Java"}),i.a.createElement(l,{image:"img/icons/cpp.png",alt:"C++ icon",name:"C++"}),i.a.createElement(l,{image:"img/icons/js.png",alt:"JavaScript icon",name:"JavaScript"}),i.a.createElement(l,{image:"img/icons/jquery.png",alt:"jQuery icon",name:"jQuery"}),i.a.createElement(l,{image:"img/icons/reactjs.png",alt:"React icon",name:"React"}),i.a.createElement(l,{image:"img/icons/html5.png",alt:"HTML icon",name:"HTML"}),i.a.createElement(l,{image:"img/icons/css3.png",alt:"CSS icon",name:"CSS"}))}function d(){c()(document).ready((function(){p(),c()(".imgDiv").each((function(e){c()(window).width()<=974?(e%2===1&&c()(this).insertAfter(c()(this).closest(".container").children(".desc")),c()(this).css("margin-top","35px")):(e%2===1?(c()(this).closest(".container").addClass("fadeInRight"),c()(this).insertBefore(c()(this).closest(".container").children(".desc"))):c()(this).closest(".container").addClass("fadeInLeft"),c()(this).css("margin-top","0px"))})),g()}))}function p(){n=c()("#projects").offset().top,s=c()("#contact").offset().top}function g(){var i=c()(document).scrollTop();i>=0&&i<n-50?(e.css("color","#fff"),t.css("color","#ccc"),a.css("color","#ccc")):i>=n-50&&i<s-50&&(e.css("color","#ccc"),t.css("color","#fff"),a.css("color","#ccc")),i+c()(window).height()>c()(document).height()-c()("#contact").outerHeight()&&(e.css("color","#ccc"),t.css("color","#ccc"),a.css("color","#fff"))}r.a.render(i.a.createElement(m,null),document.getElementById("projects"),d()),r.a.render(i.a.createElement(u,null),document.getElementById("skillsContent")),c()(window).on("load",(function(){p()})),c()(document).on("click",".navlink",(function(e){e.preventDefault();var t=c()(c.a.attr(this,"href"));c()("html, body").animate({scrollTop:t.offset().top},500,(function(){g()}))})),c()(document).scroll((function(){g()})),c()(window).on("resize",(function(){d()}))}))}},[[80,1,2]]]);
//# sourceMappingURL=main.9de7bf47.chunk.js.map
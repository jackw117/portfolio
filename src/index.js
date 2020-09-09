import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import WOW from 'wow.js'
import './main.css';
import './animate.css';

const wow = new WOW({
  boxClass: 'wow',
  animateClass: 'animated',
  offset: 0,
  live: true
});

wow.init();

$(function() {
	var about = $('a[href="#about"]');
	var projects = $('a[href="#projects"]');
	var contact = $('a[href="#contact"]');
	var projectTop = 0;
	var contactTop = 0;

	//React function to create a project element
	function Project(props) {
		const li = props.listItems;
	  const listItems = li.map((item) =>
	    <li key={item}>{item}</li>
	  );

    var url;
    if (props.href != null) {
      url = <a href={props.href}><i className="fa fa-lg fa-github"></i>source code</a>
    } else {
      url = <p>source code unavailable</p>
    }

		return (

			<div className="row">
				<div className="container wow" data-wow-duration="2s">
					<div className="col-xs-12 col-sm-12 col-md-6 desc vcenter">
						<h1>{props.title}</h1>
						<h2>{props.date}</h2>
						<p>{props.desc}</p>
						<ul className="tags">
							{listItems}
						</ul>
						{url}
					</div>

					<div className="col-xs-12 col-sm-12 col-md-6 imgDiv vcenter">
						<img src={props.image} alt={props.alt}/>
					</div>
				</div>
			</div>
		);
	}

  function Skill(props) {
    return (
      <div className="col-xs-6 col-sm-6 col-md-4">
        <img src={props.image} alt={props.alt}></img>
        <span>{props.name}</span>
      </div>
    );
  }

	//React function to create multiple project elements with specified information
	function Projects() {
		return (
			<div>

        <Project
          title="MMO Goal Tracker"
          date="July 2020 - Current"
          desc="A desktop app where users can create and edit goals, and set timers for recurring events in an online video game. Utilizes a SQLite database to allow for dependencies between goals, with checks and prepared statements to validate data. (Design not final)"
          listItems={["Electron", "React", "jQuery", "SQL"]}
          href="https://github.com/jackw117/rs-tracker"
          image="img/tracker.PNG"
          alt="RuneScape Goal Tracker image"
        />

        <Project
          title="Haskell Battleship"
          date="July 2020 - August 2020"
          desc="A text-based game of battleship to be played against a computer opponent that makes educated guesses on where to fire. Developed as a REPL with a custom parser and interpreter to evaluate user input."
          listItems={["Haskell", "REPL"]}
          href="https://github.com/jackw117/haskell-battleship"
          image="img/battleship.PNG"
          alt="Haskell Battleship image"
        />

        <Project
          title="Distributed Memory Histogram Sort"
          date="April 2020 - May 2020"
          desc="Implemented a histogram sorting algorithm that splits data between processors so that each processor has a near equal amount of elements in sorted order. Developed with a focus on speed and efficiency using a mixture of MPI to split the task between multiple processors and OpenMP to further split up the task on each processor into multiple threads."
          listItems={["C++", "OpenMP", "MPI", "Parallel Programming"]}
          //href=
          image="img/parallel.png"
          alt="Parallel image"
        />

        <Project
          title="Custom WordPress Plugin Development"
          date="January 2019 - March 2019"
          desc="A plugin for various functionality across an eCommerce website, including browsing based on tags and recommending similar items. Implemented with prepared statements and HTML escaping to prevent introducing any vulnerabilities to the site."
          listItems={["PHP", "CSS", "JavaScript"]}
          //href="https://github.com/jackw117/stream-surfer"
          image="img/wpplugin.jpg"
          alt="WordPress image"
        />

				<Project
					title="StreamSurfer"
					date="January 2017 - May 2017"
					desc="An innovative search engine to find sources to stream movies and TV shows, with options to browse by categories, search for an entry, view details of the entry, and keep user accounts with custom lists. Developed as a website with a responsive mobile view, as well as an Android app."
					listItems={["C#", "PostgreSQL", ".NET Core", "MVC", "Android", "Java"]}
					href="https://github.com/jackw117/stream-surfer"
					image="img/ss-home.png"
					alt="StreamSurfer home image"
				/>

				<Project
					title="QuizDroid"
					date="January 2017 - February 2017"
					desc="An Android application that uses an online JSON file to generate quizzes. Quiz information is stored in a singleton repository for easy access throughout the app."
					listItems={["Android", "Java", "MVC"]}
					href="https://github.com/jackw117/quizdroid"
					image="img/qd.png"
					alt="QuizDroid home screen"
				/>

				<Project
					title="CNN Wikipedia Search"
					date="April 2016 - June 2016"
					desc="A search engine for CNN articles with autocomplete suggestions that appear while a user types. Autocomplete information is taken from a list of every Wikipedia page title, and stored in a trie data structure for fast suggestions as a user types."
					listItems={["C#", "ASP.NET", "Azure", "jQuery", "Web Crawling"]}
					href="https://github.com/jackw117/344-assignment-4"
					image="img/cnnw.png"
					alt="CNN Wikipedia Search home image"
				/>

				<Project
					title="ADP Trivia"
					date="November 2015 - December 2015"
					desc="A website for members of the University of Washington Anime Discovery Project (ADP) to answer trivia questions. Information is displayed back to every user in real time."
					listItems={["AngularJS", "Firebase"]}
					href="https://github.com/jackw117/activity-answer-button"
					image="img/adp.png"
					alt="ADP Trivia home image"
				/>
			</div>
		);
	}

  function Skills() {
    return <div>
      <Skill
        image="img/icons/cs.png"
        alt="C# icon"
        name="C#"
      />

      <Skill
        image="img/icons/netfoundation.png"
        alt=".NET Core icon"
        name=".NET"
      />

      <Skill
        image="img/icons/java.png"
        alt="Java icon"
        name="Java"
      />

      <Skill
        image="img/icons/cpp.png"
        alt="C++ icon"
        name="C++"
      />

      <Skill
        image="img/icons/js.png"
        alt="JavaScript icon"
        name="JavaScript"
      />

      <Skill
        image="img/icons/jquery.png"
        alt="jQuery icon"
        name="jQuery"
      />

      <Skill
        image="img/icons/reactjs.png"
        alt="React icon"
        name="React"
      />

      <Skill
        image="img/icons/html5.png"
        alt="HTML icon"
        name="HTML"
      />

      <Skill
        image="img/icons/css3.png"
        alt="CSS icon"
        name="CSS"
      />
    </div>
  }

	//adds the React elements to the page
	ReactDOM.render(
		<Projects />,
		document.getElementById('projects'),
		startingFunctions()
	);

  ReactDOM.render(
    <Skills />,
    document.getElementById('skillsContent'),
  );

	function startingFunctions() {
		$(document).ready(function() {
			getOffsets();
			moveImage();
			linkDecoration();
		});
	}


	//gets sizes of the tops of the main divs to be used with the linkDecoration function
	//so it doesn't have to check every time a user scrolls
	function getOffsets() {
		projectTop = $('#projects').offset().top;
		contactTop = $('#contact').offset().top;
	}
	//gets the initial tops of the divs once the images have loaded completely
	$(window).on('load', function() {
		getOffsets();
	});

	//animation for clicking on one of the nav bar links
	$(document).on('click', '.navlink', function(event){
    event.preventDefault();
    var id = $($.attr(this, 'href'));
    $('html, body').animate({
        scrollTop: id.offset().top
    }, 500, function() {
    	linkDecoration();
    });
	});

	//any time the user scrolls
  $(document).scroll(function() {
  	linkDecoration();
  });

	//hides underline for nav links that are not in the current view of the webpage
	//displays the underline for the nav link that is currently being viewed
	//uses the top of each of the sections to determine which ones to hide/unhide
  function linkDecoration() {
  	var current = $(document).scrollTop();
  	if (current >= 0 && current < projectTop - 50) {
  		about.css('color', '#fff');
  		projects.css('color', '#ccc');
  		contact.css('color', '#ccc');
  	}
  	else if (current >= projectTop - 50 && current < contactTop - 50) {
  		about.css('color', '#ccc');
  		projects.css('color', '#fff');
  		contact.css('color', '#ccc');
  	}
  	if ((current + $(window).height()) > $(document).height() - $('#contact').outerHeight()) {
  		about.css('color', '#ccc');
  		projects.css('color', '#ccc');
  		contact.css('color', '#fff');
  	}
  }

	//places the image on even rows in the projects table in the left column when
	//window size is over 974 and below the description on anything less
	function moveImage() {
		$('.imgDiv').each(function( index ) {
			if ($(window).width() <= 974) {
				if (index % 2 === 1) {
					$(this).insertAfter($(this).closest('.container').children('.desc'));
				}
				$(this).css('margin-top', '35px');
			} else {
				if (index % 2 === 1) {
					$(this).closest('.container').addClass('fadeInRight');
					$(this).insertBefore($(this).closest('.container').children('.desc'));
				} else {
					$(this).closest('.container').addClass('fadeInLeft');
				}

				$(this).css('margin-top', '0px');
			}
		});
	}

	//called each time the page is resized
	$(window).on('resize', function() {
		startingFunctions();
	});
});

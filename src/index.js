import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import './main.css';

$(function() {
	var projectTop = $('#projects').offset().top;
	var contactTop = $('#contact').offset().top;
	var about = $('a[href="#about"]');
	var projects = $('a[href="#projects"]');
	var contact = $('a[href="#contact"]');

	//React function to create a project element
	function Project(props) {
		const li = props.listItems;
	  const listItems = li.map((item) =>
	    <li key={item}>{item}</li>
	  );

		return (
			<div className="row">
				<div className="container">
					<div className="col-xs-12 col-sm-12 col-md-6 desc vcenter">
						<h1>{props.title}</h1>
						<h2>{props.date}</h2>
						<p>{props.desc}</p>
						<ul className="tags">
							{listItems}
						</ul>
						<a href={props.href}><i className="fa fa-lg fa-github"></i>source code</a>
					</div>

					<div className="col-xs-12 col-sm-12 col-md-6 imgDiv vcenter">
						<img src={props.image} alt={props.alt}/>
					</div>
				</div>
			</div>
		);
	}

	//React function to create multiple project elements with specified information
	function Projects() {
		return (
			<div>
				<Project
					title="StreamSurfer"
					date="January 2017 - May 2017"
					desc="A search engine to find sources to stream movies and TV shows.
					Also acts as a database containing information on shows or movies similar to IMDb."
					listItems={["C#", "PostgreSQL", ".NET Core", "REST", "MVC"]}
					href="https://github.com/jackw117/stream-surfer"
					image="img/ss-home.png"
					alt="StreamSurfer home image"
				/>

				<Project
					title="QuizDroid"
					date="January 2017 - February 2017"
					desc="An Android application that uses an online JSON file to generate quizzes.
					Quiz information is stored in a singleton repository for easy access throughout the app."
					listItems={["Android", "Java", "MVC"]}
					href=""
					image=""
					alt=""
				/>

				<Project
					title="CNN Wikipedia Search"
					date="April 2016 - June 2016"
					desc="A search engine for CNN articles with autocomplete suggestions that appear while a user types.
					Autocomplete information is taken from a list of every Wikipedia page title, and stored in a trie data structure for fast suggestions as a user types."
					listItems={["C#", "ASP.NET", "Azure", "jQuery", "Web Crawling"]}
					href="https://github.com/jackw117/344-assignment-4"
					image="img/cnnw.png"
					alt="CNN Wikipedia Search home image"
				/>

				<Project
					title="ADP Trivia"
					date="November 2015 - December 2015"
					desc="A website for members of the University of Washington Anime Discovery Project (ADP) to answer trivia questions.
					Information is displayed back to every user in real time."
					listItems={["AngularJS", "Firebase"]}
					href="https://github.com/jackw117/activity-answer-button"
					image="img/adp.png"
					alt="ADP Trivia home image"
				/>
			</div>
		);
	}

	//adds the React elements to the page
	ReactDOM.render(
		<Projects />,
		document.getElementById('projects'),
		moveImage()
	);


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
  		about.css('text-decoration', 'underline');
  		projects.css('text-decoration', 'none');
  		contact.css('text-decoration', 'none');
  	}
  	else if (current >= projectTop - 50 && current < contactTop - 50) {
  		about.css('text-decoration', 'none');
  		projects.css('text-decoration', 'underline');
  		contact.css('text-decoration', 'none');
  	}
  	if ((current + $(window).height()) > $(document).height() - $('#contact').outerHeight()) {
  		about.css('text-decoration', 'none');
  		projects.css('text-decoration', 'none');
  		contact.css('text-decoration', 'underline');
  	}
  }

	//places the image on even rows in the projects table in the left column when
	//window size is over 974 and below the description on anything less
	function moveImage() {
		$(document).ready(function() {
			$('.imgDiv').each(function( index ) {
				if ($(window).width() <= 974) {
					if (index % 2 === 1) {
						$(this).insertAfter($(this).closest('.container').children('.desc'));
					}
					$(this).css('margin-top', '35px');
				} else {
					if (index % 2 === 1) {
						$(this).insertBefore($(this).closest('.container').children('.desc'));
					}
					$(this).css('margin-top', '0px');
				}
			});
		});
	}

	//called each time the page is resized
	$(window).on('resize', function() {
		moveImage();
	});
});

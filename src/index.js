import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import $ from 'jquery';
import WOW from 'wow.js'
import './main.css';
import './animate.css';
import {BubbleSort, BucketSort, InsertionSort, MergeSort, SelectionSort, QuickSort, ShellSort} from './algorithms.js'
import {Projects, Skills} from './components.js'

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

  const min = 10;
  const max = 100;
  const arraySize = 32;
  const bucketNum = 5;

  var interval = 20;

  // default sort object
  var sortObject = new BubbleSort(interval);
  console.log(sortObject)
  sortObject.display();

  $("#nextStep").click(function() {
    sortObject.next();
    console.log(sortObject);
  });

  $("#start").click(function() {
    sortObject.intervalId = setInterval(function() {
      sortObject.next();
      console.log(sortObject);
    }, sortObject.interval);
  });

  $("#reset").click(function() {
    sortObject.reset();
  });

  $("#stop").click(function() {
    sortObject.stop();
  });

  $(".sortButton").click(function() {
    sortObject.stop();
  });

  $("#bubbleSort").click(function() {
    sortObject = new BubbleSort(interval);
  });

  $("#bucketSort").click(function() {
    sortObject = new BucketSort(interval);
  });

  $("#insertionSort").click(function() {
    sortObject = new InsertionSort(interval);
  });

  $("#mergeSort").click(function() {
    sortObject = new MergeSort(interval);
  });

  $("#quickSort").click(function() {
    sortObject = new QuickSort(interval);
  });

  $("#selectionSort").click(function() {
    sortObject = new SelectionSort(interval);
  });

  $("#shellSort").click(function() {
    sortObject = new ShellSort(interval);
  });

  $(document).on("click", "#modalButton", function() {
    $("#algorithmModal").addClass("is-active");
  });

  $(".modal-background, .delete, .closeButton").click(function() {
    $("#algorithmModal").removeClass("is-active");
    sortObject.reset();
  });

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

// TODO: BucketSort, InsertionSort, MergeSort, QuickSort

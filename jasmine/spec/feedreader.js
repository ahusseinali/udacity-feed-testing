/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have url defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have name defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        function isMenuHidden() {
            return $('body').hasClass('menu-hidden');
        }
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('hidden by default', function() {
            expect(isMenuHidden()).toBeTruthy();
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when menu icon is clicked', function() {
            // Trigger menu-icon-link click to show the menu.
            $('.menu-icon-link').trigger('click');
            expect(isMenuHidden()).toBeFalsy();

            // Trigger menu-icon-link click again to hide the menu.
            $('.menu-icon-link').trigger('click');
            expect(isMenuHidden()).toBeTruthy();

        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         beforeEach(function(done) {
            // Load feed asynchronously then trigger done after the loading finish.
            loadFeed(0, function() {
                done();
            });
         });

         it('loads initial feed correctly', function(done) {
            expect($('.feed').find('.entry').length).not.toBe(0);
            done();
         })
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        var initialFeed;
        function getFirstFeedEntryUrl() {
            return $('.feed').find('.entry-link').first().attr('href');
        }
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('changes feed content', function(done) {
            loadFeed(0, function() {
                initialFeed = getFirstFeedEntryUrl();
                // perform another load feed
                loadFeed(1, function() {
                    var newFirstFeedEntry = getFirstFeedEntryUrl();
                    expect(newFirstFeedEntry).not.toBe(initialFeed);
                    done();
                });
            });
        });

        it('fails to load out of bound feed', function() {
            expect(function() { loadFeed(-1); }).toThrow();
        });

        it('fails to load data from undefined feed list', function() {
            var oldFeeds = allFeeds;
            allFeeds = undefined;
            expect(function() { loadFeed(0); }).toThrow();
            allFeeds = oldFeeds;
        });
    });
}());

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
    // Test suite to test defining allFeeds
    describe('RSS Feeds', function() {
        // Test that allFeeds is defined
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // Test that allFeeds items have valid url (defined and not empty)
        it('have url defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        // Test that allFeeds items have valid name (defined and not empty)
        it('have name defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    // Test suite for menu visibility
    describe('The menu', function() {
        function isMenuHidden() {
            return $('body').hasClass('menu-hidden');
        }

        // Test default status of the menu
        it('hidden by default', function() {
            expect(isMenuHidden()).toBeTruthy();
        });

        // Test toggling visibility on menu-icon click
        it('changes visibility when menu icon is clicked', function() {
            // Trigger menu-icon-link click to show the menu.
            $('.menu-icon-link').trigger('click');
            expect(isMenuHidden()).toBeFalsy();

            // Trigger menu-icon-link click again to hide the menu.
            $('.menu-icon-link').trigger('click');
            expect(isMenuHidden()).toBeTruthy();

        });
    });

    // Test suite for testing initial loading of feeds using async calls.
    describe('Initial Entries', function() {
         beforeEach(function(done) {
            // Load feed asynchronously then trigger done after the loading finish.
            loadFeed(0, done);
         });

         // Test that initial feed exists when loadFeed runs
         it('loads initial feed correctly', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
         });
    });

    // Test suite to test the change in feed selection.
    describe('New Feed Selection', function() {
        var initialFeed;

        // Retreives the url of the first entry in the feed list.
        function getFirstFeedEntryUrl() {
            return $('.feed .entry-link').first().attr('href');
        }

        // Test that chaning the loaded feed changes the DOM entries as well.
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

        // Test the failure of loading out of bound feed.
        it('fails to load out of bound feed', function() {
            expect(function() { loadFeed(-1); }).toThrow();
        });

        // Test the failure of loading feed from undefined allFeeds.
        it('fails to load data from undefined feed list', function() {
            var oldFeeds = allFeeds;
            allFeeds = undefined;
            expect(function() { loadFeed(0); }).toThrow();
            allFeeds = oldFeeds;
        });
    });
}());

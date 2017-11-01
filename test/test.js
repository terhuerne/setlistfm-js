const should = require("should");
const setlistfm = require("../");

describe("Constructor", function() {
  // Need to set a SETLISTFM_KEY environment variable in Travis before this can work
  it("Should save the configuration to the Object", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.key.should.equal(process.env.SETLISTFM_KEY);
    setlistfmClient.format.should.equal("application/xml");
    setlistfmClient.language.should.equal("de");
  });

  it("Should throw an error if no API key is defined", function() {
    var setlistfmClient = new setlistfm();
    setlistfmClient.getArtist()
      .then(function(results){
        should.fail();
      });
  });
});

describe("getArtist", function() {
  it("Should get artist profile", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getArtist("8538e728-ca0b-4321-b7e5-cff6565dd4c0")
      .then(function(artist, error) {
        artist.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get artist profile as XML", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.getArtist("8538e728-ca0b-4321-b7e5-cff6565dd4c0")
      .then(function(artist, error) {
        should.exist(artist);
        error.should.equal(null);
      });
  });
  it("Shouldn't get artist profile", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getArtist()
      .then(function(artist, error) {
        should.fail();
      });
  });
});

describe("getArtistSetlists", function() {
  it("Should get artist setlists", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getArtistSetlists("8538e728-ca0b-4321-b7e5-cff6565dd4c0")
      .then(function(setlist, error) {
        setlist.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get artist setlists at 2nd page", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getArtistSetlists("8538e728-ca0b-4321-b7e5-cff6565dd4c0", {
      p: 2
    })
      .then(function(setlist, error) {
        setlist.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get artist setlists as XML", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.getArtistSetlists("8538e728-ca0b-4321-b7e5-cff6565dd4c0")
      .then(function(setlist, error) {
        should.exist(setlist);
        error.should.equal(null);
      });
  });
  it("Shouldn't get artist setlists", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getArtistSetlists()
      .then(function(artist, error) {
        should.fail();
      });
  });
});

describe("getCity", function() {
  it("Should get city", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getCity("2921466")
      .then(function(city, error) {
        city.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get city as XML", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.getCity("2921466")
      .then(function(artist, error) {
        should.exist(artist);
        error.should.equal(null);
      });
  });
  it("Shouldn't get city", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getCity()
      .then(function(city, error) {
        should.fail();
      });
  });
});

describe("searchArtists", function() {
  it("Should get results", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.searchArtists({
      artistName: "Linkin Park"
    })
      .then(function(results, error) {
        results.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get results as XML", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.searchArtists({
      artistName: "Linkin Park"
    })
      .then(function(results, error) {
        should.exist(results);
        error.should.equal(null);
      });
  });
  it("Shouldn't get any results", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.searchArtists()
      .then(function(results, error) {
        should.fail();
      });
  });
});

describe("searchCities", function() {
  it("Should get results", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.searchCities({
      name: "Cologne"
    })
      .then(function(results, error) {
        results.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get results as XML", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.searchCities({
      name: "Cologne"
    })
      .then(function(results, error) {
        should.exist(results);
        error.should.equal(null);
      });
  });
  it("Shouldn't get any results", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.searchCities()
      .then(function(results, error) {
        should.fail();
      });
  });
});

describe("searchCountries", function() {
  it("Should get results", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.searchCountries()
      .then(function(results, error) {
        results.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get results as XML", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.searchCountries()
      .then(function(results, error) {
        should.exist(results);
        error.should.equal(null);
      });
  });
});

describe("searchSetlists", function() {
  it("Should get results", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.searchSetlists({
      artistName: "Linkin Park"
    })
      .then(function(results, error) {
        results.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get results as XML", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.searchSetlists({
      artistName: "Linkin Park"
    })
      .then(function(results, error) {
        should.exist(results);
        error.should.equal(null);
      });
  });
  it("Shouldn't get any results", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.searchSetlists()
      .then(function(results, error) {
        should.fail();
      });
  });
});

describe("searchVenues", function() {
  it("Should get results", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.searchVenues({
      name: "Palladium"
    })
      .then(function(results, error) {
        results.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get results as XML", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.searchVenues({
      name: "Palladium"
    })
      .then(function(results, error) {
        should.exist(results);
        error.should.equal(null);
      });
  });
  it("Shouldn't get any results", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.searchVenues()
      .then(function(results, error) {
        should.fail();
      });
  });
});

describe("getSetlistByVersion", function() {
  it("Should get setlist by version", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getSetlistByVersion("43596f23")
      .then(function(setlist, error) {
        setlist.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get setlist by version as XML", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.getSetlistByVersion("43596f23")
      .then(function(setlist, error) {
        should.exist(setlist);
        error.should.equal(null);
      });
  });
  it("Shouldn't get setlist by version", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getSetlistByVersion()
      .then(function(setlist, error) {
        should.fail();
      });
  });
});

describe("getSetlist", function() {
  it("Should get setlist", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getSetlist("53e493bd")
      .then(function(setlist, error) {
        setlist.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get setlist as XML", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.getSetlist("53e493bd")
      .then(function(setlist, error) {
        should.exist(setlist);
        error.should.equal(null);
      });
  });
  it("Shouldn't get setlist", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getSetlist()
      .then(function(setlist, error) {
        should.fail();
      });
  });
});

describe("getUser", function() {
  it("Should get user", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getUser("terhuerne")
      .then(function(setlist, error) {
        setlist.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get user as XML", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.getUser("terhuerne")
      .then(function(setlist, error) {
        should.exist(setlist);
        error.should.equal(null);
      });
  });
  it("Shouldn't get user", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getUser()
      .then(function(setlist, error) {
        should.fail();
      });
  });
});

describe("getUserAttended", function() {
  it("Should get setlists of concerts a user has attended", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getUserAttended("terhuerne")
      .then(function(setlist, error) {
        setlist.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get setlists of concerts a user has attended at 2nd page", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getUserAttended("terhuerne", {
      p: 2
    })
      .then(function(setlist, error) {
        setlist.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get setlists of concerts a user has attended as XML", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.getUserAttended("terhuerne")
      .then(function(setlist, error) {
        should.exist(setlist);
        error.should.equal(null);
      });
  });
  it("Shouldn't get setlists", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getUserAttended()
      .then(function(artist, error) {
        should.fail();
      });
  });
});

describe("getUserEdited", function() {
  it("Should get setlists of concerts a user has edited", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getUserEdited("terhuerne")
      .then(function(setlist, error) {
        setlist.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get setlists of concerts a user has edited at 2nd page", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getUserEdited("terhuerne", {
      p: 2
    })
      .then(function(setlist, error) {
        setlist.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get setlists of concerts a user has edited as XML", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.getUserEdited("terhuerne")
      .then(function(setlist, error) {
        should.exist(setlist);
        error.should.equal(null);
      });
  });
  it("Shouldn't get setlists", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getUserEdited()
      .then(function(artist, error) {
        should.fail();
      });
  });
});

describe("getVenue", function() {
  it("Should get venue profile", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getVenue("4bd78fbe")
      .then(function(artist, error) {
        artist.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get venue profile as XML", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.getVenue("4bd78fbe")
      .then(function(artist, error) {
        should.exist(artist);
        error.should.equal(null);
      });
  });
  it("Shouldn't get venue profile", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getVenue()
      .then(function(artist, error) {
        should.fail();
      });
  });
});

describe("getVenueSetlists", function() {
  it("Should get setlists of a venue", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getVenueSetlists("4bd78fbe")
      .then(function(setlist, error) {
        setlist.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get setlists of concerts of a venue at 2nd page", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getVenueSetlists("4bd78fbe", {
      p: 2
    })
      .then(function(setlist, error) {
        setlist.should.be.an.instanceOf(Object);
        error.should.equal(null);
      });
  });
  it("Should get setlists of concerts of a venue as XML", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      format: "xml",
      language: "de"
    });
    setlistfmClient.getVenueSetlists("4bd78fbe")
      .then(function(setlist, error) {
        should.exist(setlist);
        error.should.equal(null);
      });
  });
  it("Shouldn't get setlists", function() {
    var setlistfmClient = new setlistfm({
      key: process.env.SETLISTFM_KEY,
      language: "de"
    });
    setlistfmClient.getVenueSetlists()
      .then(function(artist, error) {
        should.fail();
      });
  });
});

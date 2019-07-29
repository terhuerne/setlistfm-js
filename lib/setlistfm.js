require('isomorphic-fetch');
const queryString = require('query-string');

/*
The MIT License (MIT)

Copyright (c) 2017 Johannes Terhürne <johannes@terhuerne.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Static Variables
var version = "1.0";
var defaultBaseUrl = "https://api.setlist.fm/rest/";
var paths = {
  getArtist: "/artist/%s",
  getArtistSetlists: "/artist/%s/setlists",
  getCity: "/city/%s",
  searchArtists: "/search/artists",
  searchCities: "/search/cities",
  searchCountries: "/search/countries",
  searchSetlists: "/search/setlists",
  searchVenues: "/search/venues",
  getSetlistByVersion: "/setlist/version/%s",
  getSetlist: "/setlist/%s",
  getUser: "/user/%s",
  getUserAttended: "/user/%s/attended",
  getUserEdited: "/user/%s/edited",
  getVenue: "/venue/%s",
  getVenueSetlists: "/venue/%s/setlists"
};
var languages = ["en", "es", "fr", "de", "pt", "tr", "it", "pl"];

var SetlistFmApi = function(config) {

  // Public Variables
  this.key = false;
  this.format = "application/json";
  this.language = "en";

  // Helper to access Global-Variables
  var self = this;

  // Public Functions
  this.getArtist = function(mbid) {
    return new Promise(function(resolve, reject) {
      if (self.key) {
        if (typeof mbid !== "undefined" && mbid) {
          requestApi(buildUrl(paths.getArtist, mbid), null)
            .then(function(artist) {
              resolve(artist);
            })
            .catch(function(error) {
              reject(error);
            })
        } else {
          reject("setlist.fm API Error: You need to define a 'mbid' to request API.");
        }
      } else {
        reject("SetlistFM API Error: You have to set an application key to request API.");
      }
    });
  }

  this.getArtistSetlists = function(mbid, query) {
    return new Promise(function(resolve, reject) {
      if (self.key) {
        if (typeof mbid !== "undefined" && mbid) {
          if (typeof query === "object" || typeof query === "undefined") {
            requestApi(buildUrl(paths.getArtistSetlists, mbid), query)
              .then(function(setlists) {
                resolve(setlists);
              })
              .catch(function(error) {
                reject(error);
              });
          } else {
            reject("setlist.fm API Error: 'query' must be an object to request API.");
          }
        } else {
          reject("setlist.fm API Error: You need to define a 'mbid' to request API.");
        }
      } else {
        reject("setlist.fm API Error: You have to set an application key to request API.");
      }
    });
  }

  this.getCity = function(geoId) {
    return new Promise(function(resolve, reject) {
      if (self.key) {
        if (typeof geoId !== "undefined" && geoId) {
          requestApi(buildUrl(paths.getCity, geoId), null)
            .then(function(city) {
              resolve(city);
            })
            .catch(function(error) {
              reject(error);
            })
        } else {
          reject("setlist.fm API Error: You need to define a 'geoId' to request API.");
        }
      } else {
        reject("setlist.fm API Error: You have to set an application key to request API.");
      }
    });
  }

  this.searchArtists = function(query) {
    return new Promise(function(resolve, reject) {
      if (self.key) {
        if (query !== null && typeof query === "object") {
          requestApi(buildUrl(paths.searchArtists, null), query)
            .then(function(results) {
              resolve(results);
            })
            .catch(function(error) {
              reject(error);
            });
        } else {
          reject("setlist.fm API Error: 'query' must be an object to request API.");
        }
      } else {
        reject("setlist.fm API Error: You have to set an application key to request API.");
      }
    });
  }

  this.searchCities = function(query) {
    return new Promise(function(resolve, reject) {
      if (self.key) {
        if (query !== null && typeof query === "object") {
          requestApi(buildUrl(paths.searchCities, null), query)
            .then(function(results) {
              resolve(results);
            })
            .catch(function(error) {
              reject(error);
            });
        } else {
          reject("setlist.fm API Error: 'query' must be an object to request API.");
        }
      } else {
        reject("setlist.fm API Error: You have to set an application key to request API.");
      }
    });
  }

  this.searchCountries = function() {
    return new Promise(function(resolve, reject) {
      if (self.key) {
        requestApi(buildUrl(paths.searchCountries, null), null)
          .then(function(results) {
            resolve(results);
          })
          .catch(function(error) {
            reject(error);
          });
      } else {
        reject("setlist.fm API Error: You have to set an application key to request API.");
      }
    });
  }

  this.searchSetlists = function(query) {
    return new Promise(function(resolve, reject) {
      if (self.key) {
        if (query !== null && typeof query === "object") {
          requestApi(buildUrl(paths.searchSetlists, null), query)
            .then(function(results) {
              resolve(results);
            })
            .catch(function(error) {
              reject(error);
            });
        } else {
          reject("setlist.fm API Error: 'query' must be an object to request API.");
        }
      } else {
        reject("setlist.fm API Error: You have to set an application key to request API.");
      }
    });
  }

  this.searchVenues = function(query) {
    return new Promise(function(resolve, reject) {
      if (self.key) {
        if (query !== null && typeof query === "object") {
          requestApi(buildUrl(paths.searchVenues, null), query)
            .then(function(results) {
              resolve(results);
            })
            .catch(function(error) {
              reject(error);
            });
        } else {
          reject("setlist.fm API Error: 'query' must be an object to request API.");
        }
      } else {
        reject("setlist.fm API Error: You have to set an application key to request API.");
      }
    });
  }

  this.getSetlistByVersion = function(versionId) {
    return new Promise(function(resolve, reject) {
      if (self.key) {
        if (typeof versionId !== "undefined" && versionId) {
          requestApi(buildUrl(paths.getSetlistByVersion, versionId), null)
            .then(function(setlist) {
              resolve(setlist);
            })
            .catch(function(error) {
              reject(error);
            })
        } else {
          reject("setlist.fm API Error: You need to define a 'versionId' to request API.");
        }
      } else {
        reject("setlist.fm API Error: You have to set an application key to request API.");
      }
    });
  }

  this.getSetlist = function(setlistId) {
    return new Promise(function(resolve, reject) {
      if (self.key) {
        if (typeof setlistId !== "undefined" && setlistId) {
          requestApi(buildUrl(paths.getSetlist, setlistId), null)
            .then(function(setlist) {
              resolve(setlist);
            })
            .catch(function(error) {
              reject(error);
            })
        } else {
          reject("setlist.fm API Error: You need to define a 'setlistId' to request API.");
        }
      } else {
        reject("setlist.fm API Error: You have to set an application key to request API.");
      }
    });
  }

  this.getUser = function(userId) {
    return new Promise(function(resolve, reject) {
      if (self.key) {
        if (typeof userId !== "undefined" && userId) {
          requestApi(buildUrl(paths.getUser, userId), null)
            .then(function(user) {
              resolve(user);
            })
            .catch(function(error) {
              reject(error);
            })
        } else {
          reject("setlist.fm API Error: You need to define a 'userId' to request API.");
        }
      } else {
        reject("setlist.fm API Error: You have to set an application key to request API.");
      }
    });
  }

  this.getUserAttended = function(userId, query) {
    return new Promise(function(resolve, reject) {
      if (self.key) {
        if (typeof userId !== "undefined" && userId) {
          if (typeof query === "object" || typeof query === "undefined") {
            requestApi(buildUrl(paths.getUserAttended, userId), query)
              .then(function(concerts) {
                resolve(concerts);
              })
              .catch(function(error) {
                reject(error);
              });
          } else {
            reject("setlist.fm API Error: 'query' must be an object to request API.");
          }
        } else {
          reject("setlist.fm API Error: You need to define a 'userId' to request API.");
        }
      } else {
        reject("setlist.fm API Error: You have to set an application key to request API.");
      }
    });
  }

  this.getUserEdited = function(userId, query) {
    return new Promise(function(resolve, reject) {
      if (self.key) {
        if (typeof userId !== "undefined" && userId) {
          if (typeof query === "object" || typeof query === "undefined") {
            requestApi(buildUrl(paths.getUserEdited, userId), query)
              .then(function(edits) {
                resolve(edits);
              })
              .catch(function(error) {
                reject(error);
              });
          } else {
            reject("setlist.fm API Error: 'query' must be an object to request API.");
          }
        } else {
          reject("setlist.fm API Error: You need to define a 'userId' to request API.");
        }
      } else {
        reject("setlist.fm API Error: You have to set an application key to request API.");
      }
    });
  }

  this.getVenue = function(venueId) {
    return new Promise(function(resolve, reject) {
      if (self.key) {
        if (typeof venueId !== "undefined" && venueId) {
          requestApi(buildUrl(paths.getVenue, venueId), null)
            .then(function(venue) {
              resolve(venue);
            })
            .catch(function(error) {
              reject(error);
            })
        } else {
          reject("setlist.fm API Error: You need to define a 'venueId' to request API.");
        }
      } else {
        reject("setlist.fm API Error: You have to set an application key to request API.");
      }
    });
  }

  this.getVenueSetlists = function(venueId, query) {
    return new Promise(function(resolve, reject) {
      if (self.key) {
        if (typeof venueId !== "undefined" && venueId) {
          if (typeof query === "object" || typeof query === "undefined") {
            requestApi(buildUrl(paths.getVenueSetlists, venueId), query)
              .then(function(setlists) {
                resolve(setlists);
              })
              .catch(function(error) {
                reject(error);
              });
          } else {
            reject("setlist.fm API Error: 'query' must be an object to request API.");
          }
        } else {
          reject("setlist.fm API Error: You need to define a 'venueId' to request API.");
        }
      } else {
        reject("setlist.fm API Error: You have to set an application key to request API.");
      }
    });
  }

  // Private functions
  function buildUrl(endpoint, variable) {
    return self.baseUrl + version + endpoint.replace("%s", variable);
  }

  function requestApi(endpoint, variables) {
    const qs = queryString.stringify(variables);
    const url = endpoint + "?" + qs;
    return fetch(url, {
            headers: {
                Accept: self.format,
                "Accept-Language": self.language,
                "x-api-key": self.key
            }
        })
        .then(function(response) {
          var contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          }
          
          return response;
        })
        .catch(function(error) {
          console.error("setlist.fm API Error: Could not reach API.", error);
        });
}

  // Constructor Actions
  self.baseUrl = defaultBaseUrl;
  if (typeof config !== "undefined" && typeof config.baseUrl !== "undefined") {
    self.baseUrl = config.baseUrl || defaultBaseUrl;
  }

  if (typeof config !== "undefined" && typeof config.key !== "undefined") {
    self.key = config.key;
  }

  if (typeof config !== "undefined" && typeof config.format !== "undefined") {
    if (config.format == "json") {
      self.format = "application/json";
    } else if (config.format == "xml") {
      self.format = "application/xml";
    }
  }

  if (typeof config !== "undefined" && typeof config.language !== "undefined") {
    if (languages.includes(config.language)) {
      self.language = config.language;
    }
  }
}

// Export Class
module.exports = SetlistFmApi;

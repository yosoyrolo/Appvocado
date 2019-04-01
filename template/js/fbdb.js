var fbdb = {};

fbdb.db = firebase.database();
fbdb.set = function(url, value) {
  fbdb.db.ref(url).set(value);
};
fbdb.push = function(url, value) {
  fbdb.db.ref(url).push(value);
};

fbdb.ref = function(url) {
  return fbdb.db.ref(url);
};

function rf(url) {
  return fbdb.ref(url);
}

const clientId = '43ae29847337457081c0ffbfcba91328';

const redirectUri = 'http://localhost:8889/callback/';
//const redirectUri= 'http://nwjammming.surge.sh';

let accessToken = '';
let userID
const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];

      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
    }
  },

  async getCurrentUserId() {
    if (userID) return userID;

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const url = 'https://api.spotify.com/v1/me';

    try {
      const response = await fetch(url, { headers: headers });
      if (response.ok) {
        const jsonResponse = await response.json();
        userID = jsonResponse.id;
        return userID;
      }
    } catch (error) {
      console.log(error);
    }
  },
  //* API Reference:	Get Track
  /*
Endpoint:	https://api.spotify.com/v1/tracks/{id} (id = clientId (developer's id on Spotify))
HTTP Method:	GET
OAuth:	Required
*/
  async search(term) {
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;

    try {
      const response = await fetch(url, { headers: headers });
      if (response.ok) {
        const jsonResponse = await response.json();

        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  },

  async savePlaylist(name, URIs, id) {
    if (!name || !URIs.length) return;

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    const currentUser = await Spotify.getCurrentUserId();

    if (id) {
      try {
        const url = `https://api.spotify.com/v1/playlists/${id}`;
        const response = await fetch(url, {
          headers: headers,
          method: 'PUT',
          body: JSON.stringify({ name: name }),
        });
        if (response.ok) {
          try {
            const url = `https://api.spotify.com/v1/playlists/${id}/tracks`;
            const response = await fetch(url, {
              headers: headers,
              method: 'PUT',
              body: JSON.stringify({ uris: URIs }),
            });
            if (response.ok) {
              const jsonResponse = await response.json();
              console.log(jsonResponse);
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const url = `https://api.spotify.com/v1/users/${currentUser}/playlists`;
      try {
        const response = await fetch(url, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ name: name }),
        });
        if (response.ok) {
          const jsonResponse = await response.json();
          const playlistID = jsonResponse.id;
          const url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

          try {
            const response = await fetch(url, {
              headers: headers,
              method: 'POST',
              body: JSON.stringify({ uris: URIs }),
            });
            if (response.ok) {
              const jsonResponse = await response.json();
              console.log(jsonResponse);
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  },

    async getUserPlaylists() {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        const currentUser = await Spotify.getCurrentUserId();
        const url = `https://api.spotify.com/v1/users/${currentUser}/playlists?limit=50`;

        try {
            const response = await fetch(url, { headers: headers });
            if(response.ok) {
                const jsonResponse = await response.json();

                if(!jsonResponse.items) return [];

                const ownedPlaylists = jsonResponse.items.filter(item => item.owner.id === currentUser);
                return ownedPlaylists.map(playlist => ({
                    id: playlist.id,
                    name: playlist.name
                }));
            }

        } catch(error) {
            console.log(error);
        }
    },

    async getPlaylist(id) {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        const url = `https://api.spotify.com/v1/playlists/${id}`;

        try {
            const response = await fetch(url, { headers: headers });
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                return jsonResponse;
            }
        } catch(error) {
            console.log(error);
        }
    },
};// Spotify

export default Spotify;

//*console output
/*
jsonResponse: 
Spotify.js:44 {tracks: {…}}tracks: {href: 'https://api.spotify.com/v1/search?query=elvis&type…ack&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20', items: Array(20), limit: 20, next: 'https://api.spotify.com/v1/search?query=elvis&type…ck&locale=en-US%2Cen%3Bq%3D0.9&offset=20&limit=20', offset: 0, …}[[Prototype]]: Object

Spotify.js:46 tracks: 
Spotify.js:47 {href: 'https://api.spotify.com/v1/search?query=elvis&type…ack&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20', items: Array(20), limit: 20, next: 'https://api.spotify.com/v1/search?query=elvis&type…ck&locale=en-US%2Cen%3Bq%3D0.9&offset=20&limit=20', offset: 0, …}href: "https://api.spotify.com/v1/search?query=elvis&type=track&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20"items: (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]limit: 20next: "https://api.spotify.com/v1/search?query=elvis&type=track&locale=en-US%2Cen%3Bq%3D0.9&offset=20&limit=20"offset: 0previous: nulltotal: 10276[[Prototype]]: Object

Spotify.js:49 items: 
Spotify.js:50 {album: {…}, artists: Array(1), available_markets: Array(183), disc_number: 1, duration_ms: 182906, …}
*/


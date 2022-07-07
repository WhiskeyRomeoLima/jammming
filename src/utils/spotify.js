let accessToken=null,
expiresIn=null,
userID=null,
userName="",
headers;

export const Spotify={
   
getUserName:function(){
   if(userID || (userID=this.getLocalData("userID")))return Promise.resolve(userName);
  const  endpoint="https://api.spotify.com/v1/me";
  if(headers)delete headers["Content-Type"];
  else return Promise.reject("error no headers");
  return fetch(endpoint,{headers:headers}).then(res=>res.json())
   .then(({id,display_name})=>{
   if(display_name) localStorage.setItem("display_name",display_name);
      localStorage.setItem("userID",id);
  return  ((userID=id),(userName=display_name))})
},
getPlaylistID:function(name){
    if(!userID)return Promise.reject("no user id"); 
    const endpoint=`https://api.spotify.com/v1/users/${userID}/playlists`;
 const body=JSON.stringify({name});
 headers["Content-Type"]="application/json";
return    fetch(endpoint,{method:"POST",headers:headers,body:body})
    .then(res=>res.json()).then(({id})=>id)
},

savePlaylist:function(name,uris){ 
  
  if(!accessToken)return Promise.reject("error: no access token");
  
  function postPlaylist(playlistID){
    const  endpoint=`https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
    const body=JSON.stringify({uris});
     headers["Content-Type"]="application/json";
    return fetch(endpoint,{method:"POST",headers:headers,body:body})
     .then(res=>res.json()).then(({snapshot_id})=>snapshot_id)
    }
    
 return  this.getUserName().then(()=>this.getPlaylistID(name))
 .then(id=>postPlaylist(id));

  
  
},
search:function(term){
    if (!accessToken)return;
    const headers={Authorization:"Bearer "+accessToken};
 const  endpoint = "https://api.spotify.com/v1/search?limit=10&type=track&q="+term;
return fetch(endpoint,{headers:headers}).then(
    res=>{return res.json()}
).then(json_data=>{
    const items=json_data.tracks?json_data.tracks.items:json_data.items;
    if(Array.isArray(items))return items;
    else return [];
   })

},
getAccessTime:function(){
return ""+(Date.now()+expiresIn)
},
getLocalData:function(type){
    const accessTime=localStorage.getItem("accessTime");
if(type==="accessToken"){
const accessToken=localStorage.getItem(type);
if(accessToken && accessTime && Date.now()<parseInt(accessTime))return accessToken;

}
else if(type==="userID"){
 const userID=localStorage.getItem(type);
if(userID && accessTime && Date.now()<parseInt(accessTime)){
  return  ((userName=localStorage.getItem("display_name")),userID);
     
}
}
return null
},
getAccessToken:function(){
if (accessToken)  {
    headers={Authorization:"Bearer "+accessToken};
  return  accessToken
}
if (accessToken=this.getLocalData("accessToken")){
    headers={Authorization:"Bearer "+accessToken};
    return accessToken;

}

const match=window.location.href.match(/access_token=([^&]*)[\w&=]*expires_in=([^&]*)/);
if (match){
    window.setTimeout(() =>{
         accessToken = null;
         localStorage.removeItem("accessToken");
         localStorage.removeItem("accessTime");
         localStorage.removeItem("userID");
         localStorage.removeItem("display_name");
        }, (expiresIn=parseInt(match[2]) * 1e3));
        

headers={Authorization:"Bearer "+(accessToken=match[1])};
localStorage.setItem("accessToken", accessToken);
localStorage.setItem("accessTime",this.getAccessTime());
window.history.pushState('Access Token', null, 'index.html');
    return accessToken;
}
let client_id="b6e05da2381741dca9663c1f41718e8b",
scope="playlist-modify-public",
redirect_uri="http://localhost:5000/static/index.html?",
 state = "jhfufghjfhufhvfb"+Math.floor(Math.random()*5e3).toString(16);

sessionStorage.setItem("stateKey", state);
var url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
url += '&state=' + encodeURIComponent(state);

alert("this demo project requires a spotify account");
window.location=url;
}
}
//todo: get local token , check the time


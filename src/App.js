import React from "react";
import "./styles.css";
import firebase from "firebase";
import SendIcon from "@material-ui/icons/Send";
var firebaseConfig = {
  apiKey: "AIzaSyAAT2v_m7UXFZ0qKJKHLblZUATidd7Zmdk",
  authDomain: "web-chatapp-ec9dc.firebaseapp.com",
  databaseURL: "https://web-chatapp-ec9dc.firebaseio.com",
  projectId: "web-chatapp-ec9dc",
  storageBucket: "web-chatapp-ec9dc.appspot.com",
  messagingSenderId: "100218405958",
  appId: "1:100218405958:web:69e1892e975be81a1bf647",
  measurementId: "G-XMGWSNDCNN"
};
firebase.initializeApp(firebaseConfig);
var usr = prompt("Name :");
function pass() {
  var msg = document.getElementById("msg").value;
  firebase.database().ref("messages").push().set({
    user: usr,

    massage: msg
  });
}

firebase
  .database()
  .ref("messages")
  .on("child_removed", function (sp) {
    document.getElementById("message-" + sp.key).innerHTML = null;
  });
firebase
  .database()
  .ref("messages")
  .on("child_added", function (prp) {
    var html = "";
    html += "<li id='message-" + prp.key + "'>";
    if (prp.val().user === usr) {
    }
    html += prp.val().user + " : " + prp.val().massage;

    html += "</li>";

    document.getElementById("msgs").innerHTML += html;
  });

const styleObj = {
  color: "#4a54f1"
};

export default function App() {
  return (
    <div className="App">
      <div className="chats">
        <ul id="msgs"></ul>
      </div>
      <input id="msg" />

      <button onClick={pass}>
        <SendIcon style={styleObj} />
      </button>
    </div>
  );
}

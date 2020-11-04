import React from "react";
import "./styles.css";
import firebase from "firebase";
import SendIcon from "@material-ui/icons/Send";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
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
  document.getElementById("msg").value = null;
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
    if (prp.val().user === usr) {
      html += "<ul id='gg'>";
      html += "<li id='kk'>";
      html += "<p id='cc'>" + prp.val().massage + "</p>";

      html += "</li>";
      html += "</ul>";
    } else {
      html += "<ul>";
      html += "<li id='kk'>";
      html +=
        "<p id='cc'> @" +
        prp.val().user +
        "</p><p>" +
        prp.val().massage +
        "</p>";

      html += "</li>";
      html += "</ul>";
    }

    html += "<br/>";

    document.getElementById("msgs").innerHTML += html;
  });

export default function App() {
  return (
    <div className="App">
      <div className="all">
        <div className="header">
          {" "}
          <strong>
            <AccountCircleIcon style={{ color: "grey", fontSize: "30px" }} />
          </strong>
          <span> @{usr}</span>{" "}
        </div>
        <div className="ff">
          <div className="chats">
            <ul id="msgs"></ul>
          </div>
          <div id="x">
            <input id="msg" />

            <button onClick={pass}>
              <SendIcon style={{ color: "black" }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

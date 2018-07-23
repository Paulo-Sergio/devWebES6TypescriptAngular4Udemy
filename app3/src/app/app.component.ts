import { Component, OnInit } from '@angular/core'
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  ngOnInit(): void {
    
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDVwlMXH0S0Tfst5XPR9Dwzbd9bBhB35gM",
      authDomain: "instagram-clone-9662e.firebaseapp.com",
      databaseURL: "https://instagram-clone-9662e.firebaseio.com",
      projectId: "instagram-clone-9662e",
      storageBucket: "instagram-clone-9662e.appspot.com",
      messagingSenderId: "139673862437"
    }

    firebase.initializeApp(config)
  }

}

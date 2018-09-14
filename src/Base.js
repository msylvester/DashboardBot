import firebase from "firebase";



class Base {
  constructor() {
      this.firebase = firebase
    this.instantiate()

    // this._type = 'SingletonDefaultExportInstance';
  }

  instantiate() {

    this.firebase.initializeApp({
      apiKey: "AIzaSyANdkPvOsVgDPwXeP0HcN3Bp1fsBQwmCXM",
      authDomain: "zenith-botcopy.firebaseapp.com",
      databaseURL: "https://zenith-botcopy.firebaseio.com",
      projectId: "zenith-botcopy",
      storageBucket:"zenith-botcopy.appspot.com",
      messagingSenderId: "284635359967"
    });

  }

  getInstance() {

      return this.firebase
  }



  // static staticMethod() {
  //   return 'staticMethod';
  // }
  //
  // get type() {
  //   return this._type;
  // }
  //
  // set type(value) {
  //   this._type = value;
  // }
}

export default new Base();

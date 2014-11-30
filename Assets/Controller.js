static var speed : int = 100;
 
 function Update () {
     transform.Translate (Vector3(0,0,1) * Time.deltaTime*speed);
     if (Input.GetKey (KeyCode.LeftArrow)) transform.Translate (Vector3(-1,0,0) * Time.deltaTime*speed);
     if (Input.GetKey (KeyCode.RightArrow)) transform.Translate (Vector3(1,0,0) * Time.deltaTime*speed);
 }
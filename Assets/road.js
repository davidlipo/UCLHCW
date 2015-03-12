public class Road extends BackgroundObject {
	protected override function Start() {
		super.Start();
		initPos = controllerScript.initialRoadPosition;
		length = GetComponent.<Renderer>().bounds.size.z;
	}
}
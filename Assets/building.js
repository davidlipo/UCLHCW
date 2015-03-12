public class Building extends BackgroundObject {
	protected override function Start() {
		super.Start();
		initPos = controllerScript.initialBuildingPosition;
		length = controllerScript.lengthOfBuilding;
	}
}
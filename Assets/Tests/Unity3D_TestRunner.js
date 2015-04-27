#pragma strict

import SharpUnit;

function Start () {
	var suite: TestSuite = new TestSuite();
	suite.AddAll(DummyTest());
	var res: TestResult = suite.Run(null);
	var reporter: Unity3D_TestReporter = new Unity3D_TestReporter();
	reporter.LogResults(res);
}
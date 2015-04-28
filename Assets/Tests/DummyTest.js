#pragma strict

import SharpUnit;

class DummyTest extends TestCase {

    var dummy: String;  

    /** Setup test resources, called before each test. */
    function SetUp() {
        dummy = "test";
        var test : Coin = NSubstitute.Substitute.For<Coin>();
    }

    /** Dispose of test resources, called after each test */
    function TearDown() {
        dummy = null; 
    }

    /** Sample test that passes */
    @UnitTest
    function TestDummy_Pass() {
        Assert.NotNull(dummy);
    }

    /** Sample test that fails. */
    @UnitTest
    function TestDummy_Fail() {
        Assert.Null(dummy);
    }
}
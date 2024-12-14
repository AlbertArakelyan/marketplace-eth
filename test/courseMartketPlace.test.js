const { catchRevert } = require("./utils/exceptions");

const CourseMarketPlace = artifacts.require("CourseMarketPlace");

// Mocha - testing framework
// Chai - assertion JS library

contract("CourseMarketPlace", (accounts) => {
  const courseId = "0x00000000000000000000000000003130";
  const proof =
    "0x0000000000000000000000000000313000000000000000000000000000003130";
  const value = "900000000";

  let _contract = null;
  let contractOwner = null;
  let buyer = null;
  let courseHash = null;

  before(async () => {
    _contract = await CourseMarketPlace.deployed();
    contractOwner = accounts[0];
    buyer = accounts[1];
  });

  describe("Purchase the new course", () => {
    before(async () => {
      await _contract.purchaseCourse(courseId, proof, { from: buyer, value });
    });

    it("can get the purchased course hash by index", async () => {
      const index = 0;
      courseHash = await _contract.getCourseHashAtIndex(index);

      const expectedHash = web3.utils.soliditySha3(
        { type: "bytes16", value: courseId },
        { type: "address", value: buyer }
      );

      assert.equal(
        courseHash,
        expectedHash,
        "Course hash is not matching the hash of purchased course."
      );
    });

    it("should match the data of the course purchased by buyer", async () => {
      const expectedIndex = 0;
      const expectedState = 0;
      const course = await _contract.getCourseByHash(courseHash);

      assert.equal(
        course.id,
        expectedIndex,
        `Course index is not matching, it should be ${expectedIndex}.`
      );
      assert.equal(
        course.price,
        value,
        `Course price is not matching, it should be ${value}.`
      );
      assert.equal(
        course.proof,
        proof,
        `Course proof is not matching, it should be ${proof}.`
      );
      assert.equal(
        course.owner,
        buyer,
        `Course owner is not matching, it should be ${buyer}.`
      );
      assert.equal(
        course.state,
        expectedState,
        `Course state is not matching, it should be ${expectedState}.`
      );
    });
  });

  describe("Activate the purchased course", () => {
    it("should NOT be able to activate course by NOT contract owner", async () => {
      await catchRevert(_contract.activateCourse(courseHash, { from: buyer }));
    });

    it("should have 'ACTIVATED' state after activation by contract owner", async () => {
      await _contract.activateCourse(courseHash, { from: contractOwner });
      const course = await _contract.getCourseByHash(courseHash);
      const expectedState = 1;

      assert.equal(
        course.state,
        expectedState,
        "State is not matching, it should be 1 (ACTIVATED)."
      );
    });
  });
});
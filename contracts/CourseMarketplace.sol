// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace {
  enum State {
    Purchased,
    Activated,
    Deactivated
  }

  struct Course {
    uint id;
    uint price;
    bytes32 proof;
    address owner;
    State state;
  }

  // mapping of courseHash to Course data
  mapping(bytes32 => Course) private ownedCourses;

  // mapping of courseId to courseHash
  mapping(uint => bytes32) private ownedCourseHash;

  // number of all courses + id of the course
  uint private totalOwnedCourses;

  address payable private owner;

  constructor() {
    setContractOwner(msg.sender);
  }

  // with 3 slashes we can specify an error message
  /// Course has already an Owner!
  error CourseHasHowner();

  /// Only owner has access
  error OnlyOwner();

  modifier onlyOwner() {
    if (msg.sender != getContractOwner()) {
      revert OnlyOwner();
    }
    _;
  }

  function purchaseCourse(bytes16 courseId, bytes32 proof) external payable {
    bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));

    if (hasCourseOwnership(courseHash)) {
      revert CourseHasHowner();
    }

    uint id = totalOwnedCourses++;

    ownedCourseHash[id] = courseHash;
    ownedCourses[courseHash] = Course({
      id: id,
      price: msg.value,
      proof: proof,
      owner: msg.sender,
      state: State.Purchased
    });
  }

  function transferOwnership(address newOwner) external onlyOwner {
    setContractOwner(newOwner);
  }

  function getCourseCount() external view returns (uint) {
    return totalOwnedCourses;
  }

  function getCourseHashAtIndex(uint index) external view returns(bytes32) {
    return ownedCourseHash[index];
  }

  function getCourseByHash(bytes32 courseHash) external view returns(Course memory) {
    return ownedCourses[courseHash];
  }

  function getContractOwner() public view returns(address) {
    return owner;
  }

  function setContractOwner(address newOwner) private {
    owner = payable(newOwner);
  }

  function hasCourseOwnership(bytes32 courseHash) private view returns(bool) {
    return ownedCourses[courseHash].owner == msg.sender;
  }
}
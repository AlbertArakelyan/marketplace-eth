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

  bool public isStopped = false;

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

  /// Course has invalid state
  error InvalidState();

  /// Course is not created
  error CourseIsNotCreated();

  /// Sender is not course owner!
  error SenderIsNotCourseOwner();

  modifier onlyOwner() {
    if (msg.sender != getContractOwner()) {
      revert OnlyOwner();
    }
    _;
  }

  modifier onlyWhenNotStopped {
    require(!isStopped, "Contract is stopped");
    _;
  }

  modifier onlyWhenStopped {
    require(isStopped, "Contract is not stopped");
    _;
  }

  receive() external payable {}

  function withdraw(uint amount) external onlyOwner {
    (bool success, ) = owner.call{value: amount}("");
    require(success, "Transfering failed.");
  }

  function emergencyWithdraw() external onlyWhenStopped onlyOwner {
    (bool success, ) = owner.call{value: address(this).balance}("");
    require(success, "Transfering failed.");
  }

  function selfDestruct() external onlyWhenStopped onlyOwner {
    // selfdestruct(owner);
    /**
     * selfdestruct is deprecated, I found the solution here
     * https://ethereum.stackexchange.com/questions/144210/selfdestruct-deprecated-in-solidity-0-8-18
     */
    (bool success,) = payable(owner).call{value: address(this).balance}("");
    if (!success) {
      revert("call{value} failed");
    }
  }

  function stopContract() external onlyOwner {
    isStopped = true;
  }

  function resumeContract() external onlyOwner {
    isStopped = false;
  }

  function purchaseCourse(bytes16 courseId, bytes32 proof) external payable onlyWhenNotStopped {
    // courseId 0x00000000000000000000000000003130
    // proof 0x0000000000000000000000000000313000000000000000000000000000003130
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

  function repurchaseCourse(bytes32 courseHash) external payable onlyWhenNotStopped {
    if (!isCourseCreated(courseHash)) {
      revert CourseIsNotCreated();
    }

    if (!hasCourseOwnership(courseHash)) {
      revert SenderIsNotCourseOwner();
    }

    Course storage course = ownedCourses[courseHash];

    if (course.state != State.Deactivated) {
      revert InvalidState();
    }

    course.state = State.Purchased;
    course.price = msg.value;
  }

  function activateCourse(bytes32 courseHash) external onlyWhenNotStopped onlyOwner {
    if (!isCourseCreated(courseHash)) {
      revert CourseIsNotCreated();
    }

    Course storage course = ownedCourses[courseHash];

    if (course.state != State.Purchased) {
      revert InvalidState();
    }

    course.state = State.Activated;
  }

  function deactivateCourse(bytes32 courseHash) external onlyWhenNotStopped onlyOwner {
    if (!isCourseCreated(courseHash)) {
      revert CourseIsNotCreated();
    }

    Course storage course = ownedCourses[courseHash];

    if (course.state != State.Purchased) {
      revert InvalidState();
    }

    // Sending back payed amount to the buyer before deactivation
    (bool success, ) = course.owner.call{value: course.price}("");
    require(success, "Transfering money back faile.");

    course.state = State.Deactivated;
    course.price = 0;
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

  function isCourseCreated(bytes32 courseHash) public view returns(bool) {
    return ownedCourses[courseHash].owner != 0x0000000000000000000000000000000000000000;
  }

  function hasCourseOwnership(bytes32 courseHash) private view returns(bool) {
    return ownedCourses[courseHash].owner == msg.sender;
  }
}
import { useEffect, useState } from "react";

import { Modal, Button } from "@/components/ui/common";

import { useEthPrice } from "@/components/hooks/useEthPrice";

const defaultOrder = {
  price: "",
  email: "",
  confirmationEmail: "",
};

const _createFormState = (isDisabled = false, message = "") => {
  return {
    isDisabled,
    message,
  };
};

const createFormState = ({ price, email, confirmationEmail }, hasAgreedTOS, isNewPurchase) => {
  if (!price || Number(price) <= 0) {
    return _createFormState(true, "Price is not valid.");
  }

  if (isNewPurchase) {
    if (email.length === 0 || confirmationEmail.length === 0) {
      return _createFormState(true);
    }
  
    if (email !== confirmationEmail) {
      return _createFormState(true, "Emails do not match.");
    }
  }

  if (!hasAgreedTOS) {
    return _createFormState(true, "You must agree to the terms of service.");
  }

  return _createFormState();
};

const OrderModal = ({ course, onClose, onSubmit, isNewPurchase }) => {
  const { eth } = useEthPrice();

  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(defaultOrder);
  const [enablePrice, setEnablePrice] = useState(false);
  const [hasAgreedTOS, setHasAgreedTOS] = useState(false);

  const formState = createFormState(order, hasAgreedTOS, isNewPurchase);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price" && isNaN(value)) {
      return;
    }

    setOrder({
      ...order,
      [name]: value.trim(),
    });
  };

  const handleCheck = (e) => {
    const { checked } = e.target;

    setOrder({
      ...order,
      price: checked ? order.price : eth.perItem,
    });
    setEnablePrice(checked);
  };

  const handleCheckTOS = (e) => {
    const { checked } = e.target;
    setHasAgreedTOS(checked);
  };

  const handleSubmit = () => {
    onSubmit(order);
  };

  useEffect(() => {
    if (!!course) {
      setIsOpen(true);
      setOrder({
        ...defaultOrder,
        price: eth.perItem,
      });
    } else {
      setIsOpen(false);
      setOrder(defaultOrder);
      setEnablePrice(false);
      setHasAgreedTOS(false);
    }
  }, [course, eth.perItem]);

  return (
    <Modal isOpen={isOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="mb-7 text-lg font-bold leading-6 text-gray-900"
                id="modal-title"
              >
                {course.title}
              </h3>
              <div className="mt-1 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Price(eth)</label>
                  <div className="text-xs text-gray-700 flex">
                    <label className="flex items-center mr-2">
                      <input
                        className="form-checkbox"
                        type="checkbox"
                        checked={enablePrice}
                        onChange={handleCheck}
                      />
                    </label>
                    <span>
                      Adjust Price - only when the price is not correct
                    </span>
                  </div>
                </div>
                <input
                  className="disabled:opacity-50 w-80 mb-1 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                  id="price"
                  type="text"
                  name="price"
                  value={order.price}
                  disabled={!enablePrice}
                  onChange={handleChange}
                />
                <p className="text-xs text-gray-700">
                  Price will be verified at the time of the order. If the price
                  will be lower, order can be declined (+- 2% slipage is
                  allowed)
                </p>
              </div>
              {isNewPurchase && (
                <>
                  <div className="mt-2 relative rounded-md">
                    <div className="mb-1">
                      <label className="mb-2 font-bold">Email</label>
                    </div>
                    <input
                      className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                      id="email"
                      type="email"
                      name="email"
                      placeholder="x@y.com"
                      value={order.email}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-gray-700 mt-1">
                      It&apos;s important to fill a correct email, otherwise the
                      order cannot be verified. We are not storing your email
                      anywhere
                    </p>
                  </div>
                  <div className="my-2 relative rounded-md">
                    <div className="mb-1">
                      <label className="mb-2 font-bold">Repeat Email</label>
                    </div>
                    <input
                      className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                      id="confirmationEmail"
                      type="email"
                      name="confirmationEmail"
                      placeholder="x@y.com"
                      value={order.confirmationEmail}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              <div className="text-xs text-gray-700 flex">
                <label className="flex items-center mr-2">
                  <input
                    className="form-checkbox"
                    type="checkbox"
                    checked={hasAgreedTOS}
                    onChange={handleCheckTOS}
                  />
                </label>
                <span>
                  I accept Eincode &apos;terms of service&apos; and I agree that
                  my order can be rejected in the case data provided above are
                  not correct
                </span>
              </div>
              {formState.message && (
                <div className="my-3 p-4 text-red-700 bg-red-200 rounded-lg text-sm">
                  <p>{formState.message}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <Button disabled={formState.isDisabled} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="red" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderModal;

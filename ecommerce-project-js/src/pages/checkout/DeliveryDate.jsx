import dayjs from "dayjs";

const DeliveryDate = ({ deliveryOptions, cartItem }) => {
  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cartItem.deliveryOptionId;
  });
  return (
    <>
      Delivery date:{" "}
      {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
        "dddd, MMMM D"
      )}
    </>
  );
};

export default DeliveryDate;

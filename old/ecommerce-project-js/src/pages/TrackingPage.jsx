import { Header } from "../components/Header";
import { Link, useParams } from "react-router";
import "./TrackingPage.css";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export function TrackingPage({ cart }) {
  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingPageData = async () => {
      const response = await axios.get(
        `/api/orders/${orderId}?expand=products`
      );
      setOrder(response.data);
    };

    fetchTrackingPageData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const orderProduct = order.products.find((product) => {
    return product.productId === productId;
  });

  const totalDeliveryTimeMs =
    orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let deliveryProgressPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

  if (deliveryProgressPercent > 100) {
    deliveryProgressPercent = 100;
  }

  const isPreparing = deliveryProgressPercent < 33;

  const isShipped =
    deliveryProgressPercent >= 33 && deliveryProgressPercent < 100;

  const isDelivered = deliveryProgressPercent === 100;

  return (
    <>
      <title>Tracking</title>
      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />
      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryProgressPercent >= 100 ? "Delivered On" : "Arriving On"}{" "}
            {dayjs(orderProduct.estimatedDeliveryTimeMs).format("dddd, MMMM D")}
          </div>

          <div className="product-info">{orderProduct.product.name}</div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div
              className={`progress-label ${isPreparing && `current-status`}`}
            >
              Preparing
            </div>
            <div className={`progress-label ${isShipped && `current-status`}`}>
              Shipped
            </div>
            <div
              className={`progress-label ${isDelivered && `current-status`}`}
            >
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${deliveryProgressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}

import { QRCode } from "react-qr-code";
import { useState, useEffect } from "react";
import { Typography, Container } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import PropTypes from "prop-types";

const OrderSummary = ({ cart }) => {
  const [isBooking, setIsBooking] = useState(false);
  const [orderMessage, setOrderMessage] = useState(
    "Please select items to book"
  );
  useEffect(() => {
    if (cart.length === 0) {
      setOrderMessage("Please select items to book");
      return;
    }
    setIsBooking(true);
  }, [cart]);

  return (
    <Container
      maxWidth="xl"
      className="flex items-center justify-center flex-wrap py-10 bg-gray-100 gap-8"
    >
      <Grid2 className="mb-4">
        <Typography variant="h4" sx={{ mb: 4, mt: 2 }}>
          Order Summary
        </Typography>
        <Typography
          className="text-sm text-gray-500"
          variant="h6"
          sx={{ mb: 4, mt: 2 }}
        >
          {cart.map((item) => (
            <div key={item.name}>{item.name}</div>
          ))}
        </Typography>
        <button
          disabled={isBooking}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Book Meal
        </button>
      </Grid2>

      <Grid2>
        {cart && cart.length > 0 && isBooking ? (
          <QRCode
            title="Booking Code"
            value={cart.map((item) => item.name).join(", ")}
            bgColor="white"
            fgColor="black"
            size={200}
          />
        ) : (
          orderMessage
        )}
      </Grid2>
    </Container>
  );
};

OrderSummary.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default OrderSummary;

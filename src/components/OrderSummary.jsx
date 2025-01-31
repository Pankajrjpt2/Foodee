import { QRCode } from "react-qr-code";
import { useState, useCallback } from "react";
import { Typography, Container } from "@mui/material";
import Grid2 from "@mui/material/Grid2";

const OrderSummary = ({ cart }) => {
  const [isBooking, setIsBooking] = useState(false);

  const handleBooking = useCallback(() => {
    setIsBooking(true);
  }, []);

  return (
    <Container
      maxWidth="xl"
      className="flex items-center justify-center flex-wrap py-10 bg-gray-100 gap-8"
    >
      <Grid2 className="mb-4">
        <Typography variant="h4" sx={{ mb: 4, mt: 2 }}>
          Order Summary
          <Typography
            className="text-sm text-gray-500"
            variant="h6"
            sx={{ mb: 4, mt: 2 }}
          >
            {cart.map((item) => (
              <div key={item.name}>{item.name}</div>
            ))}
          </Typography>
        </Typography>
        <button
          onClick={handleBooking}
          disabled={isBooking}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Book Meal
        </button>
      </Grid2>

      <Grid2>
        {cart && cart.length > 0 && isBooking && (
          <QRCode
            title="Booking Code"
            value={cart.map((item) => item.name).join(", ")}
            bgColor="white"
            fgColor="black"
            size={200}
          />
        )}
      </Grid2>
    </Container>
  );
};

export default OrderSummary;

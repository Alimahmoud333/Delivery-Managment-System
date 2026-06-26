// // import React, { useEffect, useState } from "react";
// // import {
// //   Container,
// //   Paper,
// //   Typography,
// //   Button,
// //   CircularProgress,
// //   Box,
// //   Alert,
// // } from "@mui/material";

// // import { loadStripe } from "@stripe/stripe-js";
// // import {
// //   Elements,
// //   CardElement,
// //   useStripe,
// //   useElements,
// // } from "@stripe/react-stripe-js";

// // import API from "../../api/axios";
// // import SectionTitle from "../../components/common/SectionTitle";

// // /*
// // |--------------------------------------------------------------------------
// // | STRIPE INIT
// // |--------------------------------------------------------------------------
// // */

// // const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// // const cardStyle = {
// //   style: {
// //     base: {
// //       fontSize: "16px",
// //       color: "#424770",
// //       "::placeholder": { color: "#aab7c4" },
// //     },
// //     invalid: {
// //       color: "#9e2146",
// //     },
// //   },
// // };

// // /*
// // |--------------------------------------------------------------------------
// // | PAYMENT FORM COMPONENT
// // |--------------------------------------------------------------------------
// // */

// // function CheckoutForm({ orderId }) {
// //   const stripe = useStripe();
// //   const elements = useElements();

// //   const [loading, setLoading] = useState(false);
// //   const [success, setSuccess] = useState(false);
// //   const [error, setError] = useState("");

// //   const handlePay = async () => {
// //     setLoading(true);
// //     setError("");

// //     try {
// //       /*
// //       ----------------------------------
// //       1️⃣ CREATE PAYMENT INTENT (Laravel)
// //       ----------------------------------
// //       */
// //       const res = await API.post("/customer/payment/intent", {
// //         order_id: orderId,
// //       });

// //       const clientSecret = res.data.client_secret;

// //       /*
// //       ----------------------------------
// //       2️⃣ CONFIRM CARD PAYMENT
// //       ----------------------------------
// //       */
// //       const result = await stripe.confirmCardPayment(clientSecret, {
// //         payment_method: {
// //           card: elements.getElement(CardElement),
// //         },
// //       });

// //       if (result.error) {
// //         setError(result.error.message);
// //       } else if (result.paymentIntent.status === "succeeded") {
// //         setSuccess(true);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setError("Payment failed.");
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <Paper
// //       elevation={4}
// //       sx={{
// //         p: 4,
// //         mt: 3,
// //         borderRadius: 3,
// //       }}>
// //       <Typography variant="h6" mb={2}>
// //         Enter Card Details
// //       </Typography>

// //       <Box
// //         sx={{
// //           border: "1px solid #ddd",
// //           borderRadius: 2,
// //           p: 2,
// //           mb: 3,
// //         }}>
// //         <CardElement options={cardStyle} />
// //       </Box>

// //       {error && <Alert severity="error">{error}</Alert>}
// //       {success && (
// //         <Alert severity="success">✅ Payment Successful! Order paid.</Alert>
// //       )}

// //       <Button
// //         fullWidth
// //         variant="contained"
// //         size="large"
// //         disabled={!stripe || loading}
// //         onClick={handlePay}
// //         sx={{
// //           mt: 2,
// //           py: 1.5,
// //           fontWeight: "bold",
// //         }}>
// //         {loading ? <CircularProgress size={24} color="inherit" /> : "Pay Now"}
// //       </Button>
// //     </Paper>
// //   );
// // }

// // /*
// // |--------------------------------------------------------------------------
// // | MAIN PAGE
// // |--------------------------------------------------------------------------
// // */

// // export default function CustomerPayment() {
// //   const [orderId, setOrderId] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   /*
// //   ------------------------------------------------
// //   Example: get latest unpaid order
// //   (adjust if needed)
// //   ------------------------------------------------
// //   */
// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       try {
// //         const res = await API.get("/customer/orders");

// //         const unpaid = res.data.find((o) => o.status !== "paid");

// //         if (unpaid) {
// //           setOrderId(unpaid.id);
// //         }
// //       } catch (err) {
// //         console.error(err);
// //       }

// //       setLoading(false);
// //     };

// //     fetchOrders();
// //   }, []);

// //   if (loading)
// //     return (
// //       <Container sx={{ textAlign: "center", mt: 10 }}>
// //         <CircularProgress />
// //       </Container>
// //     );

// //   if (!orderId)
// //     return (
// //       <Container sx={{ mt: 6 }}>
// //         <Alert severity="info">No unpaid orders found.</Alert>
// //       </Container>
// //     );

// //   return (
// //     <Container maxWidth="sm">
// //       <SectionTitle title="Order Payment" />

// //       <Elements stripe={stripePromise}>
// //         <CheckoutForm orderId={orderId} />
// //       </Elements>
// //     </Container>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Paper,
//   Typography,
//   Button,
//   CircularProgress,
//   Box,
//   Alert,
// } from "@mui/material";

// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// import API from "../../api/axios";
// import SectionTitle from "../../components/common/SectionTitle";
// import { useCustomerDispatch } from "../../context/customerContext";

// // ✅ STRIPE
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// const cardStyle = {
//   style: {
//     base: {
//       fontSize: "16px",
//       color: "#424770",
//     },
//   },
// };

// // ==========================
// // CHECKOUT FORM
// // ==========================
// function CheckoutForm({ orderId }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const dispatch = useCustomerDispatch();

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");

//   const handlePay = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       // 1️⃣ create payment intent
//       const res = await API.post("/customer/payment/intent", {
//         order_id: orderId,
//       });

//       const clientSecret = res.data.client_secret;

//       //  confirm payment
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (result.error) {
//         setError(result.error.message);
//       } else if (result.paymentIntent.status === "succeeded") {
//         setSuccess(true);

//         // ✅ UPDATE UI IMMEDIATELY
//         dispatch({
//           type: "update_order_status",
//           payload: { id: orderId, status: "paid" },
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Payment failed.");
//     }

//     setLoading(false);
//   };

//   return (
//     <Paper sx={{ p: 4, mt: 3, borderRadius: 3 }}>
//       <Typography variant="h6" mb={2}>
//         Enter Card Details
//       </Typography>

//       <Box sx={{ border: "1px solid #ddd", p: 2, mb: 3 }}>
//         <CardElement options={cardStyle} />
//       </Box>

//       {error && <Alert severity="error">{error}</Alert>}
//       {success && <Alert severity="success">Payment Successful ✅</Alert>}

//       <Button
//         fullWidth
//         variant="contained"
//         color="success"
//         disabled={!stripe || loading}
//         onClick={handlePay}>
//         {loading ? <CircularProgress size={24} /> : "Pay Now"}
//       </Button>
//     </Paper>
//   );
// }

// // ==========================
// // MAIN PAGE
// // ==========================
// export default function CustomerPayment() {
//   const [orderId, setOrderId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const res = await API.get("/customer/orders");

//         const unpaid = res.data.find((o) => o.status !== "paid");

//         if (unpaid) setOrderId(unpaid.id);
//       } catch (err) {
//         console.error(err);
//       }

//       setLoading(false);
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return (
//       <Container sx={{ textAlign: "center", mt: 10 }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   if (!orderId) {
//     return (
//       <Container sx={{ mt: 6 }}>
//         <Alert severity="info">No unpaid orders</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="sm">
//       <SectionTitle
//         title="Order Payment"
//         sx={{
//           color: "#fff",

//           "& .MuiTypography-root": {
//             color: "#fff",
//             fontWeight: 800,
//           },
//         }}
//       />

//       <Elements stripe={stripePromise}>
//         <CheckoutForm orderId={orderId} />
//       </Elements>
//     </Container>
//   );
// }



import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { useParams, useNavigate } from "react-router-dom";

import API from "../../api/axios";
import SectionTitle from "../../components/common/SectionTitle";

// ==========================
// STRIPE
// ==========================

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY
);

const cardStyle = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
    },
  },
};

// ==========================
// CHECKOUT FORM
// ==========================

function CheckoutForm({ order }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await API.post("/customer/payment/intent", {
        order_id: order.id,
      });

      const clientSecret = res.data.client_secret;

      const result = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (result.error) {
        setError(result.error.message);
      } else if (
        result.paymentIntent.status === "succeeded"
      ) {
        setSuccess(true);

        setTimeout(() => {
          navigate("/customer/orders");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Payment failed."
      );
    }

    setLoading(false);
  };

  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h6"
        mb={2}
        fontWeight={700}
      >
        Card Details
      </Typography>

      <Box
        sx={{
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 2,
          mb: 3,
        }}
      >
        <CardElement options={cardStyle} />
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Payment Successful ✅
        </Alert>
      )}

      <Button
        fullWidth
        variant="contained"
        color="success"
        disabled={!stripe || loading}
        onClick={handlePay}
        sx={{
          py: 1.5,
          fontWeight: 700,
        }}
      >
        {loading ? (
          <CircularProgress
            size={24}
            color="inherit"
          />
        ) : (
          `Pay $${order.price}`
        )}
      </Button>
    </Paper>
  );
}

// ==========================
// PAGE
// ==========================

export default function CustomerPayment() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(
          "/customer/orders"
        );

        const currentOrder = res.data.find(
          (o) => o.id === Number(orderId)
        );

        setOrder(currentOrder);
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <Container
        sx={{
          textAlign: "center",
          mt: 10,
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!order) {
    return (
      <Container sx={{ mt: 6 }}>
        <Alert severity="error">
          Order not found
        </Alert>
      </Container>
    );
  }

  if (order.payment?.status === "paid") {
    return (
      <Container
        maxWidth="sm"
        sx={{ mt: 6 }}
      >
        <Alert severity="success">
          This order is already paid ✅
        </Alert>

        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={() =>
            navigate("/customer/orders")
          }
        >
          Back To Orders
        </Button>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="sm"
      sx={{ py: 5 }}
    >
      <SectionTitle
        title="Order Payment"
        sx={{
          color: "#fff",
          "& .MuiTypography-root": {
            color: "#fff",
            fontWeight: 800,
          },
        }}
      />

      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          Order #{order.id}
        </Typography>

        <Typography mt={1}>
          Amount: ${order.price}
        </Typography>

        <Typography
          color="text.secondary"
          mt={1}
        >
          Status: {order.status}
        </Typography>
      </Paper>

      <Elements stripe={stripePromise}>
        <CheckoutForm order={order} />
      </Elements>
    </Container>
  );
}

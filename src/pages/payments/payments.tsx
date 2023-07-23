
import Dashboard from "../../components/DashBoard/Dash";
import StripeIntegration from "../../components/payments/paymentForm";

const AllPayments = () => {
  return (
    <Dashboard>
      <StripeIntegration />
    </Dashboard>
  );
};

export default AllPayments;

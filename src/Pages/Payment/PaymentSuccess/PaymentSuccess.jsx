import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import success from '../../../assets/icons/Success.gif';

const PaymentSuccess = () => {
  const { tran: transactionId } = useParams();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if(transactionId) {
      fetch(`https://subidha-home-services-server3792.glitch.me/payment/${transactionId}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        // const {bookingDetails} = data;
        setPayment(data);
      });
    }
  }, [transactionId]);

   useEffect(() => {
    if(payment?.bookingDetails && payment?.bookingDetails?.userEmail) {
      const {date} = payment;
      const {userEmail, totalAmount, serviceQuantity, userName, unitCost, service} = payment.bookingDetails;
      console.log(userEmail);
      fetch("https://subidha-home-services-server3792.glitch.me/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        subject: `Subidha Invoice - Confirmation for Service Order ${transactionId}`,
        message: "",
        userName,
        invoiceNo: transactionId,
        invoiceDate: date,
        totalAmount,
        serviceQuantity,
        unitCost,
        service
        
      }),
    })
    .then(res =>res.json())
    .then(data => console.log(data))
    }
   }, [payment]);

  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <img className="w-56" src={success} alt="" />
      <h1 className="text-2xl font-semibold">Your payment is sucessfull</h1>
      <p className="mt-2 mb-5">
        Thank you for your payment An automated payment receipt will be sent to
        your registered email
      </p>
      <Link className="text-red-500 underline" to="/">
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;

import { Link } from "react-router-dom";

const PaymentSuccess = () => {

    return (
        <div className="h-screen flex justify-center items-center flex-col">
            <img className="w-56" src="https://i.ibb.co/qF8Q9Vq/Success.gif" alt="" />
            <h1 className="text-2xl font-semibold">Your payment is sucessfull</h1>
            <p className="mt-2 mb-5">Thank you for your payment An automated payment receipt will be sent to your registered email</p>
            <Link className="text-red-500 underline" to="/">Back to Home</Link>
        </div>
    );
};

export default PaymentSuccess;
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { toast } from "react-toastify";

const ProviderPayments = () => {
  const { user } = useContext(AuthContext);
  const {
    data: payments = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["provider-payments"],
    queryFn: () =>
      fetch(`
https://subidha-home-services-server3792.glitch.me/payments/${user.uid}`).then((res) =>
        res.json()
      ),
  });

  if (isError) {
    toast.error(error.message, {
      hideProgressBar: true,
      // theme: "colored",
    });
  }

  useEffect(() => {
    return () => {
        // Scroll to top smoothly when the component unmounts
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
}, []); // Empty dependency array ensures this effect runs only on unmount

  if (isLoading) {
    return (
      <div className="absolute w-full top-0 left-0 h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#FF6600]"></span>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-8 text-center">
        Payment History
      </h2>
      <div className="overflow-x-auto py-10">
        <table className="table">
          <thead>
            <tr className="text-base">
              <th>User</th>
              <th>Service</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr key={idx}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={payment.userPhotoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{payment.userName}</div>
                      <div className="text-sm opacity-50">
                        #{payment.userUID}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={payment.servicePhotoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{payment.service}</div>
                    </div>
                  </div>
                </td>
                
                <td>{payment.invoiceDate}</td>
                <td className="font-semibold">{payment.totalAmount} TK</td>
                <td className="font-semibold text-green-600 p-2">Payment Completed</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProviderPayments;

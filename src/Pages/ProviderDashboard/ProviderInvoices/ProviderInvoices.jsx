import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import noDataFound from "../../../assets/images/no-data-found.png";
import { Link } from "react-router-dom";

const ProviderInvoices = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    return () => {
      // Scroll to top smoothly when the component unmounts
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }, []); // Empty dependency array ensures this effect runs only on unmount

  const {
    data: invoices = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["provider-invoices"],
    queryFn: () =>
      fetch(`
https://subidha-home-services-server3792.glitch.me/payments/${user.uid}`).then(
        (res) => res.json()
      ),
  });

  if (isError) {
    toast.error(error.message, {
      hideProgressBar: true,
      // theme: "colored",
    });
  }

  console.log(invoices);

  if (isLoading) {
    return (
      <div className="absolute w-full top-0 left-0 h-full flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-[#FF6600]"></span>
      </div>
    );
  }

  const handleDownloadInvoice = (booking) => {
    window.location.replace(
      `https://anyapi.io/api/v1/invoice/generate?apiKey=9cmbqv1tfaou1l8c2eepi8fi39f3s1sbfja2jo3gvg86j424q9l71g&number=${booking.invoiceNumber}&logo=https://i.postimg.cc/CKDMny4Y/subidha-logo.png&amount_paid=${booking.totalAmount}&items[0][quantity]=${booking.serviceQuantity}&items[0][unit_cost]=${booking.unitCost}&currency=BDT&items[0][name]=${booking.service}&date=${booking.invoiceDate}`
    );
  };

  return (
    <div>
      <div className="flex justify-end">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link to="/provider-dashboard/dashboard">Provider Dashboard</Link>
            </li>
            <li>
              <Link to="/provider-dashboard/provider-invoices">Invoices</Link>
            </li>
          </ul>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-8 text-center">Invoices</h2>
      {invoices.length > 0 ? (
        <div>
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
                {invoices.map((invoice, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={invoice.userPhotoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{invoice.userName}</div>
                          <div className="text-sm opacity-50">
                            #{invoice.userUID}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={invoice.servicePhotoURL}
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{invoice.service}</div>
                        </div>
                      </div>
                    </td>

                    <td>{invoice.invoiceDate}</td>
                    <td className="font-semibold">{invoice.totalAmount} TK</td>
                    <td className="font-semibold text-green-600 p-2">
                      Payment Completed
                    </td>
                    <button
                      onClick={() => handleDownloadInvoice(invoice)}
                      className="btn btn-neutral"
                    >
                      Export
                    </button>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <img src={noDataFound} alt="" />
        </div>
      )}
    </div>
  );
};

export default ProviderInvoices;

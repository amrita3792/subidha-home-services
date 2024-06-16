import { useState } from "react";
import "daisyui/dist/full.css";
import { toast } from "react-toastify";

const RolesPermissionsForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    roleName: "",
    permissions: [],
  });

  const permissionsList = [
    "Dashboard",
    "Categories",
    "Sub Categories",
    "Add new Service",
    "Offers",
    "Coupons",
    "Staffs",
    "Admin",
    "Users",
    "Service Providers",
    "Roles & Permissions",
    "Booking List",
    "Subscription",
    "Payments",
    "Revenue",
    "Deposit",
    "Chat",
    "Manage Profile",
    "Contact Details",
    "Rating Type",
    "Ratings",
  ];

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFormData((prevData) => {
      const updatedPermissions = checked
        ? [...prevData.permissions, name]
        : prevData.permissions.filter((permission) => permission !== name);
      return { ...prevData, permissions: updatedPermissions };
    });
  };

  const handleSelectAll = () => {
    setFormData({
      ...formData,
      permissions: permissionsList.slice(), // Select all permissions
    });
  };

  const handleDeselectAll = () => {
    setFormData({
      ...formData,
      permissions: [], // Deselect all permissions
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log(formData);
    fetch("http://localhost:5000/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Roles and permissions added successfully!", {
          theme: "colored",
        });
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-7">Add Roles & Permissions</h2>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold">Role Name</span>
        </label>
        <input
          type="text"
          value={formData.roleName}
          onChange={(e) =>
            setFormData({ ...formData, roleName: e.target.value })
          }
          className="input input-bordered"
          placeholder="Enter role name"
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">
          <span className="label-text font-semibold">Permissions</span>
        </label>
        <div className="mb-4">
          <button
            type="button"
            onClick={handleSelectAll}
            className="btn btn-xs btn-primary mr-2"
          >
            Select All
          </button>
          <button
            type="button"
            onClick={handleDeselectAll}
            className="btn btn-xs btn-secondary"
          >
            Deselect All
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {permissionsList.map((permission) => (
            <label
              key={permission}
              className="cursor-pointer flex items-center space-x-2"
            >
              <input
                type="checkbox"
                name={permission}
                checked={formData.permissions.includes(permission)}
                onChange={handleCheckboxChange}
                className="checkbox checkbox-primary"
              />
              <span className="label-text font-semibold">{permission}</span>
            </label>
          ))}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        {loading && <span className="loading loading-spinner loading-md"></span>} Submit
      </button>
    </form>
  );
};

export default RolesPermissionsForm;

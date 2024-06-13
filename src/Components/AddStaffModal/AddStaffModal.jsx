const AddStaffModal = ({ handleChangeModalState }) => {
  return (
    <div>
      <dialog id="add-staff" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Basic Information</h3>
          <button
            onClick={handleChangeModalState}
            className="btn btn-circle absolute right-4 top-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <form className="mt-8">
            <div>
              <p className="mb-2 font-semibold">
                Name <span className="text-red-500">*</span>
              </p>
              <input
                required
                defaultValue=""
                name="name"
                type="text"
                placeholder="Enter your name..."
                className="input input-bordered input-error w-full"
              />
            </div>
            <div className="mt-6">
              <p className="mb-2 font-semibold">
                Phone <span className="text-red-500">*</span>
              </p>
              <input
                required
                defaultValue=""
                name="phone"
                type="text"
                placeholder="Enter your phone..."
                className="input input-bordered input-error w-full"
              />
            </div>
            <div className="mt-6">
              <p className="mb-2 font-semibold">
                Email <span className="text-red-500">*</span>
              </p>
              <input
                required
                defaultValue=""
                name="email"
                type="email"
                placeholder="Enter your email..."
                className="input input-bordered input-error w-full"
              />
            </div>
            <div className="mt-6">
              <p className="mb-2 font-semibold">
                Photo <span className="text-red-500">*</span>
              </p>
              <input type="file" className="file-input file-input-bordered w-full" />
            </div>
            <div className="mt-6">
              <p className="mb-2 font-semibold">
                Date of Birth<span className="text-red-500">*</span>
              </p>
              <input
                required
                defaultValue=""
                name="dateOfBirth"
                type="date"
                placeholder="Enter your date of birth..."
                className="input input-bordered input-error w-full"
              />
            </div>
            <div className="form-control mt-6 w-fit">
              <p className="mb-2 font-semibold">
                Gender <span className="text-red-500">*</span>
              </p>
              <label className="label cursor-pointer justify-start gap-4 w-fit">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-red-500"
                  checked
                />
                <span className="label-text">Male</span>
              </label>
            </div>
            
            <div className="form-control w-fit">
              <label className="label cursor-pointer justify-start gap-4 w-fit">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-500"
                  checked
                />
                <span className="label-text">Female</span>
              </label>
            </div>
            <div className="flex justify-end gap-3">
            <button className="btn btn-neutral rounded-none bg-red-500 border-none">Cancel</button>
            <button className="btn btn-neutral rounded-none">Submit</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AddStaffModal;

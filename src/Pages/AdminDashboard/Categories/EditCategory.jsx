const EditCategory = () => {
  return (
    <div>
      <form className="max-w-screen-md mx-auto">
        <h2 className="text-2xl font-semibold mt-8 mb-5">Edit Category</h2>
        <div className="form-control">
          <p className="font-semibold mb-2 text-sm">
            Category Name <span className="text-red-500">*</span>
          </p>
          <input
            type="text"
            placeholder="Category name..."
            className="input input-bordered input-info w-full"
          />
        </div>
        <div className="form-control mt-7">
          <p className="font-semibold mb-2 text-sm">
            Category Image <span className="text-red-500">*</span>
          </p>
          <input
            type="file"
            className="file-input file-input-bordered file-input-info w-full "
          />
        </div>
        <div className="form-control mt-6 w-fit">
          <p className="mb-2 font-semibold">
            Is Featured? <span className="text-red-500">*</span>
          </p>
          <label className="label cursor-pointer justify-start gap-4 w-fit">
            <input
              defaultValue="yes"
              type="radio"
              name="gender"
              className="radio checked:bg-blue-500"
            />
            <span className="label-text">Yes</span>
          </label>
        </div>
        <div className="form-control w-fit">
          <label className="label cursor-pointer justify-start gap-4 w-fit">
            <input
              defaultValue="no"
              type="radio"
              name="gender"
              className="radio checked:bg-blue-500"
            />
            <span className="label-text">No</span>
          </label>
        </div>
        <div className="form-control flex flex-row justify-end gap-3">
          <button className="btn btn-error text-white">Cancel</button>
          <button className="btn btn-info text-white">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;

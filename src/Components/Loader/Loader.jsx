import loader from '../../assets/images/Square Loading.gif';

const Loader = ({ progress }) => {
    
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <img className="w-32" src={loader} alt="" />
    </div>
  );
};

export default Loader;

const Address = ({ title, address, number, email }) => {
  return (
    <>
      <h2>{title}</h2>
      <p>{address}</p>
      <p>{number}</p>
      <h3>{email}</h3>
    </>
  );
};

export default Address;

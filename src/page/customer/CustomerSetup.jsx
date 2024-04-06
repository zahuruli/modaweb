import React, { useEffect, useState } from "react";
import "./customer_setup.css";
// import Add from "../authentication/user.png";
import Edit from "../authentication/edit.png";
import Delete from "../authentication/delete.png";
// import { FaUserEdit } from "react-icons/fa";
// import { FaUserMinus } from "react-icons/fa6";
import axios from "axios";
const CustomerSetup = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  const [customerData, setCustomerData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(true);
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/customer/getAll");
      setCustomerData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    setVisible(true);
    setActiveRowIndex(null);
    setId(null);
    setName("");
    setPhone("");
    setEmail("");
    setAddress("");
  };
  const handleRowClick = (row, index) => {
    if (activeRowIndex === index) {
      handleReset();
      return;
    }
    setVisible(false);
    setId(row.id);
    setActiveRowIndex(index);
    setName(row.Name);
    setPhone(row.Phone_no);
    setEmail(row.Email);
    setAddress(row.Address);
  };

  //edit
  const handleEdit = async (event) => {
    if (event.detail > 1) {
      return;
    }
    if (name === "" && phone === "" && address === "" && email === "") {
      alert("Please select a row");
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/customer/updateCustomerTableByID?Name=${name}&Phone_no=${phone}}&Email=${email}&Address=${address}&id=${id}`
      );

      if (response.status === 200) {
        fetchData();
        handleReset();
        alert("Data Edited Successfuly!");
      } else {
        alert("Failed to Edit Data");
      }
    } catch (error) {
      console.error("Error Edit data:", error);
    }
  };

  //delete
  const handleDelete = async (event) => {
    if (event.detail > 1) {
      return;
    }
    if (id === null) {
      alert("Please select a row");

      return;
    }

    try {
      const response = await axiosInstance.delete(
        `/customer/deleteCustomerByID?id=${id}`
      );
      if (response.status === 200) {
        fetchData();
        handleReset();
        alert("Data Deleted Successfuly!");
      } else {
        alert("Failed to Delete Data");
      }
    } catch (error) {
      console.error("Error deleted data:", error);
    }
  };
  return (
    <div className="container_all_customer_modaweb">
      <span className="text_primary">All Customer</span>
      <div className="container_first_row_div_all_customer">
        <div className="input_field_all_customer">
          <label htmlFor="">Name</label>
          <input
            type="text"
            value={name}
            disabled={visible}
            onChange={(e) => setName(e.target.value)}
            placeholder="Customer Name"
          />
        </div>

        <div className="input_field_all_customer">
          <label htmlFor="">Phone</label>
          <input
            type="number"
            value={phone}
            disabled={visible}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Customer Phone"
          />
        </div>

        <div className="input_field_all_customer">
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            disabled={visible}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Customer Email Address"
          />
        </div>
        <div className="input_field_all_customer">
          <label htmlFor="">Address</label>
          <input
            type="text"
            value={address}
            disabled={visible}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Customer Address"
          />
        </div>
      </div>
      <div className="container_second_row_div_all_customer">
        <div className="conatainer_button_all_customer">
          <button onClick={handleEdit}>
            {/* <FaUserEdit /> */}
            <img src={Edit} alt="" />
          </button>
          <span>Edit </span>
        </div>
        <div className="conatainer_button_all_customer">
          <button onClick={handleDelete}>
            {/* <FaUserMinus /> */}
            <img src={Delete} alt="" />
          </button>
          <span>Delete </span>
        </div>
      </div>
      <div className="container_third_row_div_all_customer">
        <div className="container_table_data_all_customer">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {customerData &&
                customerData.map((data, index) => (
                  <tr
                    key={index}
                    className={activeRowIndex === index ? "active-row" : ""}
                    onClick={() => handleRowClick(data, index)}
                  >
                    <td>{data.id}</td>
                    <td>{data.Name}</td>
                    <td>{data.Phone_no}</td>
                    <td>{data.Email}</td>
                    <td>{data.Address}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerSetup;

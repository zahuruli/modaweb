import React from "react";
import logo from "./modalogo.jpg";
import "./QuotationPDF.css";

const QuotationPDF = React.forwardRef((props, ref) => {
  const {
    windowData,
    vat,
    installation,
    customerName,
    quotationNo,
    totalPrice,
    customerData,
  } = props;

  // const today = new Date();
  // const formattedDate = today.toISOString().split("T")[0];
  const today = new Date();
  const fifteenDaysLater = new Date();
  fifteenDaysLater.setDate(today.getDate() + 15);

  const formattedToday = today.toISOString().split("T")[0];
  const formattedFifteenDaysLater = fifteenDaysLater
    .toISOString()
    .split("T")[0];

  const totalAmount =
    parseFloat(totalPrice) + parseFloat(installation) + parseFloat(vat);

  const customer =
    customerData &&
    customerData.find((data) => data?.id === parseInt(customerName));
  console.log(customer);
  return (
    <div ref={ref} className="container_div_quotationpfd">
      <div className="container_row_quotationpdf_header">
        <div className="container_row_div_pdf1">
          <h3>Moda Home Solutions Co. Ltd</h3>
          <p>82/7 M001 NONGPURE</p>
          <p>BABGLAMUNG CHONBURI</p>
          <p>20150 PATTAYA THAILAND</p>
          <p>TEL: 061 5300696</p>
          <p>info@modahome.asia</p>
          <p>Tax id: 0205558015088</p>
        </div>
        <div className="container_row_div_pdf2">
          <p>Customer Name : {customer?.Name}</p>
          <p>Customer Phone : {customer?.Phone_no}</p>
          <p>Customer Email :{customer?.Email}</p>
          <p>Customer Address: {customer?.Address}</p>
        </div>
        <div className="container_row_div_pdf3">
          <img src={logo} alt="" />
        </div>
      </div>
      <div className="container_second_row_div_pdf">
        <div className="container_table1_row_div_pdf">
          <table>
            <thead>
              <tr>
                <th>Customer No.</th>
                <th>Quotation No.</th>
                <th>Page</th>
                <th>Date</th>
                <th>Expire On</th>
                <th>Moda Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{customerName}</td>
                <td>{quotationNo}</td>
                <td>1</td>
                <td>{formattedToday}</td>
                <td>{formattedFifteenDaysLater}</td>
                <td>Contact</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="container_second_row_div_pdf">
        <div className="container_table2_row_div_pdf">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Width</th>
                <th>Height</th>
                <th>Unit Price</th>

                <th>Price after Discount</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {windowData &&
                windowData.map((data) => (
                  <tr>
                    <td>
                      {data.Material} With MosquitoNet Design:
                      {data.MosquitoNet_Design} With MosquitoNet Color:
                      {data.Mosquito_Net_Color} With Glass Color:
                      {data.Glass_Color} With Glass Thickness:
                      {data.Glass_Thickness} Total Height: {data.Height} Total
                      Width: {data.Width}`
                    </td>
                    <td>{data.Height}</td>
                    <td>{data.Width}</td>
                    <td>{data.Total_price}</td>
                    <td>{data.Price_After_discount}</td>
                    <td>1</td>
                    <td>{data.Price_After_discount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="remark">
        <span>Remarks</span>
      </div>
      <div className="container_third_row_div_pdf">
        <div className="container_div_text_list_pdf">
          <p>1 - UPVC profile warranty for 10 years.</p>
          <p>2 - Hardware warranty for 2 years.</p>
          <p>3 - Quotation as a purchase order and part of the contract</p>
          <p>
            4 - Once signed order, Production will start when received first
            deposit.
          </p>
          <p>5 - After receiving the deposit, Installation about 15-30 days.</p>
          <p>
            6 - A proprietary product of the company until payment is completed.
          </p>
          <p>7 - Cement work not include on quotation.</p>
          <p>
            8 - Finished products must have a wide range and height + -0.1-0.5
            cm.
          </p>
          <p>
            9 - Less than one square meter, the company accounted for one sq.m /
            price does not include demolition. / price does not include
            demolition.
          </p>
        </div>
        <div className="container_amount_pdf">
          <div>Total : {totalPrice}</div>
          <div className="border_button"></div>
          <div>Installation : {installation.toFixed(2)}</div>
          <div className="border_button"></div>
          <div>Vat : {vat}</div>
          <div className="border_button"></div>
          <div>Total Price :{totalAmount.toFixed(2)}</div>
          <div className="border_button"></div>
        </div>
      </div>
      <div className="remark">
        <span className="remark">Condition for Payments.</span>
      </div>
      <div className="container_forth_row_div_pdf">
        <div className="conatiner_text_condtion">
          <p>
            1 - 50% advance deposit at the time of confirmation of proforma
            invoice.
          </p>
          <p>2 - 40% goods delivery at project.</p>
          <p>3 - 10% when finished installation.</p>
          <span>Approved by Customer</span>
        </div>
        <div className="conatiner_text_condtion_price">
          <p>{(totalAmount * (50 / 100)).toFixed(2)}</p>
          <p>{(totalAmount * (40 / 100)).toFixed(2)}</p>
          <p>{(totalAmount * (10 / 100)).toFixed(2)}</p>
          <span>Moda Home Solutions</span>
        </div>
      </div>
      <div className="container_fifth_row_div_pdf">
        <div className="margin_left">
          <p>Authorised Signatory </p>
        </div>
        <div className="flex_end">Authorised Signatory</div>
      </div>
      <div className="container_sixth_row_div_pdf">
        <span>** This Quotation is valid for 15 days **</span>
      </div>
    </div>
  );
});

export default QuotationPDF;

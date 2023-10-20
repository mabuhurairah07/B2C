import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const RefundPloicy = () => {
  return (
    <>
      <Meta title={"Refund Policy"} />
      <BreadCrumb title="Refund Policy" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
          <h1>Refund Policy</h1>
<p>
This refund policy ("policy") will help you understand how Easybay
("us", "we", "our") handles refunds for our products and services.
</p>
<p>
We reserve the right to change this policy at any given time, of which
you will be promptly updated. If you want to make sure that you are up
to date with the latest changes, we advise you to frequently visit this
page.
</p>
<h2>Refund Eligibility</h2>
<p>
To be eligible for a refund, the product or service must meet the
following conditions:
<ul>
<li>The product or service must have been purchased from Easybay</li>
<li>The product or service must be unused and in its original packaging</li>
<li>The request for a refund must be made within 30 days of the purchase date</li>
</ul>
</p>
<h2>Refund Process</h2>
<p>
To request a refund, please contact our customer support team at <b>
support@easybay.com</b> with your order details and reason for the refund
request. Once we receive your request, we will review it and notify you
of the status of your refund request.
</p>
<p>
If your refund is approved, we will initiate a refund to your original
method of payment. The refund process may take up to 10 business days
depending on your payment method and financial institution.
</p>
            <div className="policy"></div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default RefundPloicy;

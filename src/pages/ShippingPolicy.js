import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";

const ShippingPolicy = () => {
  return (
    <>
      <Meta title={"Shippingg Pplicy"} />
      <BreadCrumb title="Shippingg Pplicy" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
          <h1>Shipping Policy</h1>
<p>
This shipping policy ("policy") will help you understand how Easybay
("us", "we", "our") handles shipping for our products and services.
</p>
<p>
We reserve the right to change this policy at any given time, of which
you will be promptly updated. If you want to make sure that you are up
to date with the latest changes, we advise you to frequently visit this
page.
</p>
<h2>Shipping Destinations</h2>
<p>
We ship our products to most countries around the world. However, if you
are unsure whether we ship to your location, please contact our customer
support team at <b>support@easybay.com </b>before placing your order.
</p>
<h2>Shipping Rates</h2>
<p>
Shipping rates vary depending on the weight and dimensions of the
product, the destination, and the shipping method you choose. You can
see the shipping rates for your order during the checkout process.
</p>
<h2>Shipping Times</h2>
<p>
We aim to ship your order as soon as possible after we receive your
payment. The shipping time will depend on the destination and the
shipping method you choose. You can see the estimated shipping time for
your order during the checkout process.
</p>
            <div className="policy"></div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ShippingPolicy;

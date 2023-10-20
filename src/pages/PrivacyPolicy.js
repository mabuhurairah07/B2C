import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const PrivacyPolicy = () => {
  return (
    <>
      <Meta title={"Privacy Policy"} />
      <BreadCrumb title="Privacy Policy" />
      <Container class1="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
          
          <h1>Privacy Policy</h1>
<p>
This privacy policy ("policy") will help you understand how Easybay
("us", "we", "our") uses and protects the data you provide to us when
you visit and use our website.
</p>
<p>
We reserve the right to change this policy at any given time, of which
you will be promptly updated. If you want to make sure that you are up
to date with the latest changes, we advise you to frequently visit this
page.
</p>
<h2>What User Data We Collect</h2>
<p>
When you visit the website, we may collect the following data:
<ul>
<li>Your IP address</li>
<li>Your contact information and email address</li>
<li>Other information such as interests and preferences</li>
<li>
Data profile regarding your online behavior on our website
</li>
</ul>
</p>
<h2>Why We Collect Your Data</h2>
<p>
We are collecting your data for several reasons:
<ul>
<li>To better understand your needs</li>
<li>To improve our services and products</li>
<li>
To send you promotional emails containing the information we think
you will find interesting
</li>
<li>
To contact you to fill out surveys and participate in other types of
market research
</li>
</ul>
</p>
<h2>Safeguarding and Securing the Data</h2>
<p>
Easybay is committed to securing your data and keeping it confidential.
We have done all in our power to prevent data theft, unauthorized
access, and disclosure by implementing the latest technologies and
software, which help us safeguard all the information we collect online.
</p>
            <div className="policy"></div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PrivacyPolicy;

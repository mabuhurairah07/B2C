import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";

const TermAndContions = () => {
  return (
    <>
      <Meta title={"Term And Conditions"} />
      <BreadCrumb title="Term And Conditions" />
      <Container className="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
          <h2>Accounts and Membership</h2>
<p>
If you create an account on the website, you are responsible for
maintaining the security of your account and password, and you are fully
responsible for all activities that occur under the account and any
other actions taken in connection with the account. You must immediately notify Easybay
of any unauthorized uses of your account or any other breaches of
security. Easybay will not be liable for any acts or omissions by you,
including any damages of any kind incurred as a result of such acts or
omissions.
</p>
<h2>Intellectual Property</h2>
<p>
The website and all of its original content are the sole property of
Easybay and are, as such, fully protected by the appropriate
international copyright and other intellectual property rights laws.
</p>
<h2>Termination</h2>
<p>
Easybay reserves the right to terminate your access to the website and
its services at any time, without notice, for any reason whatsoever. If
you wish to terminate this agreement or your Easybay account (if you
have one), you may simply discontinue using the website.
</p>

<h2>Limitation of Liability</h2>
<p>
To the fullest extent permitted by applicable law, in no event will
Easybay be liable to you or any third-party for any indirect,
consequential, incidental, special, or punitive damages, including lost
profit damages arising from or relating to the use of the Website or
Services, even if Easybay has been advised of the possibility of such
damages.
</p>
            <div className="policy"></div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default TermAndContions;

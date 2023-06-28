import { useState } from "react";
import axios from "axios";
export default function PayUMoneyForm() {
  const [firstname, setFirstName] = useState("Vinit");
  const [lastname,setLastName]=useState("Tiwari");
  const [email, setEmail] = useState("vinit@gmail.com");
  const [phone, setPhone] = useState("9876543210");
  const [productName, setProductName] = useState("iPhone");
  const [amount, setAmount] = useState("1");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/payumoney", {
        firstname,
        email,
        phone,
        amount,
      });

      console.log(response.data.hash)

      document.querySelector('#firstname').value=firstname
      document.querySelector('#lastname').value=lastname
      document.querySelector('#key').value=process.env.MERCHANT_ID 
      document.querySelector('#txnid').value=response.data.txnid
      document.querySelector('#productinfo').value="iPhone"
      document.querySelector('#amount').value=amount
      document.querySelector('#email').value=email
      document.querySelector('#phone').value=phone
      document.querySelector('#furl').value="http://localhost:3000/failure"
      document.querySelector('#surl').value="http://localhost:3000/success"
      document.querySelector('#hash').value=response.data.hash
      document.querySelector('#submit').click()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <span className="flex items-center justify-center h-[100vh]">
        <form action='https://secure.payu.in/_payment' method='post'>
          <input type="hidden" id="key" name="key"  />
          <input type="hidden" id="txnid" name="txnid" />
          <input type="hidden" id="productinfo" name="productinfo" />
          <input type="hidden" id="amount" name="amount"  />
          <input type="hidden" id="email" name="email" />
          <input type="hidden" id="firstname" name="firstname" />
          <input type="hidden" id="lastname" name="lastname"  />
          <input type="hidden" id="surl" name="surl" />
          <input type="hidden" id="furl" name="furl"  />
          <input type="hidden" id="phone" name="phone" />
          <input type="hidden" id="hash" name="hash" />
          <input type="submit" className="hidden" id="submit" value="submit"/>
          <button onClick={handleSubmit}>Pay</button> 
          </form>
      </span>
    </>
  );
}
